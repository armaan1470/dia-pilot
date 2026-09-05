export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  diabetesType: string;
  diagnosisYear: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export const mockProfile: UserProfile = {
  id: "user-101",
  fullName: "Mohammed Al-Otaibi",
  email: "mohammed@example.com",
  phone: "+966 50 123 4567",
  diabetesType: "Type 1 Diabetes",
  diagnosisYear: 2018,
  emergencyContact: {
    name: "Sarah Al-Otaibi",
    phone: "+966 55 987 6543",
    relationship: "Sister",
  },
};
