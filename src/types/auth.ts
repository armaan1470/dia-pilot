export type Gender = "male" | "female" | "other";
export type DiabetesType = "type1" | "type2" | "gestational" | "pre" | "other";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  gender: Gender | null;
  dob: string | null;
  diabetes_type: DiabetesType | null;
  is_guest: boolean;
  national_id: string | null; // Reserved for Phase 2 NAFATH
  created_at: string;
  updated_at: string;
}

export interface RegisterPatientInput {
  fullName: string;
  dob?: string;
  gender: Gender;
  diabetesType: DiabetesType;
  mobileNumber: string;
  email: string;
  password: string;
}
