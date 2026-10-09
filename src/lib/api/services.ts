export type ServiceApprovalStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'retired';

export interface ServiceRecord {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  targetAudienceEn: string | null;
  targetAudienceAr: string | null;
  topicsEn: string[];
  topicsAr: string[];
  locationEn: string | null;
  locationAr: string | null;
  workingHoursEn: string | null;
  workingHoursAr: string | null;
  contactEn: string | null;
  contactAr: string | null;
  bookingUrl: string | null;
  bookingInstructionsEn: string | null;
  bookingInstructionsAr: string | null;
  approvalStatus: ServiceApprovalStatus;
  version: string;
}
