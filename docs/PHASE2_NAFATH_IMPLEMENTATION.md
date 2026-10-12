# DiaPilot — Phase 2: NAFATH Authentication Implementation Guide

> **Document Status**: Production Blueprint & Technical Specification  
> **Target Audience**: Future Developers, Tech Leads & DevOps working on Phase 2  
> **Related Documents**: `docs/DIAPILOT_CONTEXT_PHASE1.md`, `docs/DESIGN_SYSTEM.md`  

---

## 1. Executive Summary

This document serves as the **step-by-step implementation guide** for adding **NAFATH (نفاذ — Saudi National Single Sign-On)** to DiaPilot in Phase 2.

In Phase 1, the authentication architecture was purposely engineered to be **provider-agnostic** using **Supabase Auth**, **Zustand**, and **Next.js App Router Middleware**. All foundations (including database schema reservations, guest upgrading, and route guarding) are already in place and ready for NAFATH.

---

## 2. Understanding NAFATH (How It Works in Saudi Arabia)

Unlike standard Google/Apple OAuth redirects, NAFATH is a **two-step biometric push-authorization protocol** managed by the **National Information Center (NIC) / SDAIA**:

```
[User enters 10-digit Saudi National ID / Iqama]
                        │
                        ▼
       [DiaPilot Server calls NAFATH Gateway]
                        │
                        ▼
   [NAFATH generates a 2-Digit Verification Code (e.g. "48")]
                        │
                        ▼
  [DiaPilot UI displays: "Open Nafath App and approve #48"]
                        │
                        ▼
    [Citizen approves biometric in Nafath mobile app]
                        │
                        ▼
   [DiaPilot Server polls or receives callback from NAFATH]
                        │
                        ▼
  [Verified Citizen Data Returned: Name (AR/EN), DOB, Gender, ID]
                        │
                        ▼
 [Supabase Session Issued -> User logged in without password]
```

---

## 3. Current Phase 1 Foundation (Already Done)

When you start Phase 2, you do **not** need to reinvent the wheel. These assets are already built:

1. **Database Schema (`public.profiles`)**:
   * The `national_id` column already exists with a `UNIQUE` constraint:
     ```sql
     national_id text unique, -- Ready for NAFATH
     ```
2. **Guest Account Upgrading**:
   * Anonymous users (`is_guest: true`) can be upgraded in place. When a guest logs in with NAFATH, their guest ID and local chat history seamlessly merge into the verified citizen record.
3. **Route Guarding**:
   * [src/lib/supabase/middleware.ts](file:///c:/Users/Cmss/Desktop/Armaan/Practise/dart-prac/dia-pilot/src/lib/supabase/middleware.ts) already protects `/chat`, `/profile`, `/appointments`, and `/services`. Once NAFATH issues a Supabase session, the route guards will automatically admit the user.

---

## 4. Phase 2 Implementation Steps

### Step 4.1: Add Server Environment Variables

Add your NAFATH and Supabase Service Role keys to `.env.local` (server-side only, never expose to client):

```env
# NAFATH API Credentials (provided by NIC / SDAIA)
NAFATH_APP_ID=your_nafath_app_id
NAFATH_APP_KEY=your_nafath_app_key
NAFATH_BASE_URL=https://nafath.api.elm.sa/stg # Staging or Production URL

# Supabase Server Admin Key (for minting session tokens without passwords)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

### Step 4.2: Build the Server Route Handlers

Create two Next.js Route Handlers inside `src/app/api/auth/nafath/`:

#### 1. `src/app/api/auth/nafath/request/route.ts` (Initiate Push)
* Validates that the input is a valid 10-digit Saudi ID (starts with `1` for citizens, `2` for residents).
* Sends request to NAFATH API:
  ```ts
  POST `${NAFATH_BASE_URL}/api/v1/mfa/request`
  Headers: { 'APP-ID': NAFATH_APP_ID, 'APP-KEY': NAFATH_APP_KEY }
  Body: {
    nationalId: "1098765432",
    service: "Login"
  }
  ```
* NAFATH returns:
  ```json
  {
    "transId": "e3b0c442-98fc-11ed...",
    "random": "48" // The 2-digit number to display to the user
  }
  ```
* DiaPilot returns `{ transId, random }` to the frontend modal.

#### 2. `src/app/api/auth/nafath/verify/route.ts` (Check Status & Issue Session)
* Frontend polls this endpoint every 2 seconds with `transId`.
* Server checks NAFATH status:
  ```ts
  POST `${NAFATH_BASE_URL}/api/v1/mfa/status`
  Body: { nationalId, transId, random }
  ```
* When NAFATH returns `status: "COMPLETED"`:
  * NAFATH payload returns verified citizen data:
    * `nationalId`
    * `fullNameAr`, `fullNameEn`
    * `dateOfBirthG`
    * `gender` ('M' | 'F')
* **Session Resolution with Supabase Admin**:
  ```ts
  import { createClient } from "@supabase/supabase-js";

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if profile exists with this national_id
  const { data: existingProfile } = await adminClient
    .from("profiles")
    .select("id")
    .eq("national_id", nationalId)
    .maybeSingle();

  let userId = existingProfile?.id;

  if (!userId) {
    // Auto-create user in Supabase
    const { data: newUser } = await adminClient.auth.admin.createUser({
      email: `${nationalId}@nafath.diapilot.local`,
      email_confirm: true,
      user_metadata: { full_name: fullNameAr || fullNameEn },
    });
    userId = newUser.user.id;

    // Insert pre-filled verified profile
    await adminClient.from("profiles").upsert({
      id: userId,
      national_id: nationalId,
      full_name: fullNameAr || fullNameEn,
      gender: gender === "M" ? "male" : "female",
      dob: dateOfBirthG,
      is_guest: false,
    });
  }

  // Issue session token and set HTTP-only cookie
  const { data: linkData } = await adminClient.auth.admin.generateLink({
    type: "magiclink",
    email: `${nationalId}@nafath.diapilot.local`,
  });

  return NextResponse.json({ success: true, redirectUrl: "/chat" });
  ```

---

### Step 4.3: Frontend UI Components

#### 1. Add NAFATH Button to [login/page.tsx](file:///c:/Users/Cmss/Desktop/Armaan/Practise/dart-prac/dia-pilot/src/app/[locale]/login/page.tsx)
Place a prominent button above the credentials form:

```tsx
<button
  type="button"
  onClick={() => setIsNafathModalOpen(true)}
  className="w-full h-12 rounded-xl bg-[#00875A] hover:bg-[#00734D] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#00875A]/25 transition-all cursor-pointer active:scale-[0.98]"
>
  <Image src="/icons/nafath-logo.svg" alt="Nafath" width={22} height={22} />
  <span>{isRtl ? "الدخول عبر النفاذ الوطني الموحد" : "Sign in with NAFATH"}</span>
</button>
```

#### 2. Create `src/components/auth/nafath-modal.tsx`
Create a mobile drawer or modal with 2 states:
* **State 1 (Input)**: Input for 10-digit National ID / Iqama + validation check.
* **State 2 (Push Verification)**:
  * Shows a large, pulsing circular badge containing the **2-digit verification number** (e.g., **48**).
  * Text instruction:
    * Arabic: *"يرجى فتح تطبيق نفاذ وتأكيد الطلب باختيار الرقم 48"*
    * English: *"Please open the Nafath app and approve request number 48"*
  * Polling indicator and a 90-second countdown timer.
  * Once approved, auto-redirects to `/${locale}/chat`.

---

## 5. Saudi PDPL & Compliance Checklist (Mandatory)

1. **National ID Privacy**:
   * Never log raw National IDs in plain-text application logs.
   * Never store National IDs in client-side `localStorage`.
2. **Data Residency**:
   * In Phase 2/3, if government procurement rules require full data residency within the Kingdom of Saudi Arabia, Supabase can be deployed self-hosted on **STC Cloud** or **Oracle Cloud Riyadh** using Docker containers.
3. **Medical Identity Binding**:
   * Once a patient binds their NAFATH ID, hospital and lab records (`/health-records` and `/appointments`) can be securely linked using their verified National ID.

---

## 6. Quick Checklist for Phase 2 Launch

- [ ] Obtain NAFATH Sandbox credentials (`APP-ID` and `APP-KEY`) from NIC/SDAIA.
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
- [ ] Implement `src/app/api/auth/nafath/request/route.ts`.
- [ ] Implement `src/app/api/auth/nafath/verify/route.ts`.
- [ ] Implement `src/components/auth/nafath-modal.tsx`.
- [ ] Add the green NAFATH button to [src/app/[locale]/login/page.tsx](file:///c:/Users/Cmss/Desktop/Armaan/Practise/dart-prac/dia-pilot/src/app/[locale]/login/page.tsx).
- [ ] Add "Link NAFATH Account" option inside [src/app/[locale]/profile/page.tsx](file:///c:/Users/Cmss/Desktop/Armaan/Practise/dart-prac/dia-pilot/src/app/[locale]/profile/page.tsx).
- [ ] Test Guest $\rightarrow$ NAFATH account upgrade flow.
- [ ] Perform security review against Saudi Personal Data Protection Law (PDPL).
