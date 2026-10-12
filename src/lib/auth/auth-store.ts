"use client";

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Profile, RegisterPatientInput } from "@/types/auth";

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isGuest: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (input: RegisterPatientInput) => Promise<{ success: boolean; error?: string }>;
  signInAsGuest: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  isGuest: false,
  error: null,

  clearError: () => set({ error: null }),

  initialize: async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ user: null, profile: null, isGuest: false, isLoading: false });
        return;
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const isGuest = user.is_anonymous || Boolean(profile?.is_guest);

      // If anonymous user has no profile row yet, create it
      if (user.is_anonymous && !profile) {
        const guestProfile: Partial<Profile> = {
          id: user.id,
          full_name: "Guest User",
          is_guest: true,
        };
        await supabase.from("profiles").upsert(guestProfile);
        set({
          user,
          profile: guestProfile as Profile,
          isGuest: true,
          isLoading: false,
        });
        return;
      }

      set({
        user,
        profile: profile as Profile | null,
        isGuest,
        isLoading: false,
      });

      // Listen for subsequent auth state changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        const currentUser = session?.user ?? null;
        if (!currentUser) {
          set({ user: null, profile: null, isGuest: false, isLoading: false });
          return;
        }

        const { data: updatedProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

        set({
          user: currentUser,
          profile: (updatedProfile as Profile) ?? null,
          isGuest: currentUser.is_anonymous || Boolean(updatedProfile?.is_guest),
          isLoading: false,
        });
      });
    } catch (err: any) {
      console.error("Auth initialization error:", err);
      set({ isLoading: false });
    }
  },

  signInWithEmail: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        set({ isLoading: false, error: error.message });
        return { success: false, error: error.message };
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      set({
        user: data.user,
        profile: profile as Profile | null,
        isGuest: false,
        isLoading: false,
      });

      return { success: true };
    } catch (err: any) {
      const msg = err.message || "Failed to sign in";
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signUp: async (input: RegisterPatientInput) => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClient();
      const currentUser = get().user;

      // If user is currently an Anonymous Guest, upgrade account in place!
      if (currentUser?.is_anonymous) {
        const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
          email: input.email.trim(),
          password: input.password,
        });

        if (updateError) {
          set({ isLoading: false, error: updateError.message });
          return { success: false, error: updateError.message };
        }

        // Upsert full patient profile
        const newProfile: Partial<Profile> = {
          id: updatedUser.user.id,
          full_name: input.fullName.trim(),
          email: input.email.trim(),
          phone: input.mobileNumber.trim(),
          gender: input.gender,
          dob: input.dob ?? null,
          diabetes_type: input.diabetesType,
          is_guest: false,
        };

        await supabase.from("profiles").upsert(newProfile);

        set({
          user: updatedUser.user,
          profile: newProfile as Profile,
          isGuest: false,
          isLoading: false,
        });

        return { success: true };
      }

      // Standard New User Registration
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: input.email.trim(),
        password: input.password,
        options: {
          data: {
            full_name: input.fullName.trim(),
            phone: input.mobileNumber.trim(),
          },
        },
      });

      if (signUpError) {
        set({ isLoading: false, error: signUpError.message });
        return { success: false, error: signUpError.message };
      }

      if (!data.user) {
        set({ isLoading: false, error: "Registration failed" });
        return { success: false, error: "Registration failed" };
      }

      // Create profile row
      const newProfile: Partial<Profile> = {
        id: data.user.id,
        full_name: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.mobileNumber.trim(),
        gender: input.gender,
        dob: input.dob ?? null,
        diabetes_type: input.diabetesType,
        is_guest: false,
      };

      await supabase.from("profiles").upsert(newProfile);

      set({
        user: data.user,
        profile: newProfile as Profile,
        isGuest: false,
        isLoading: false,
      });

      return { success: true };
    } catch (err: any) {
      const msg = err.message || "Failed to register";
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signInAsGuest: async () => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error || !data.user) {
        const errorMsg = error?.message || "Failed to create anonymous user";
        set({ isLoading: false, error: errorMsg });
        return { success: false, error: errorMsg };
      }

      const guestProfile: Partial<Profile> = {
        id: data.user.id,
        full_name: "Guest User",
        is_guest: true,
      };

      await supabase.from("profiles").upsert(guestProfile);

      set({
        user: data.user,
        profile: guestProfile as Profile,
        isGuest: true,
        isLoading: false,
      });

      return { success: true };
    } catch (err: any) {
      const msg = err.message || "Failed to sign in as guest";
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signOut: async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      set({
        user: null,
        profile: null,
        isGuest: false,
        isLoading: false,
        error: null,
      });
    }
  },
}));
