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

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Fetch all available services from the API
 */
export async function fetchServices(): Promise<ServiceRecord[]> {
  const response = await fetch('/api/services');
  if (!response.ok) {
    throw new ApiError('Failed to fetch services', response.status);
  }
  return response.json();
}

/**
 * Fetch a single service by slug
 */
export async function fetchServiceDetail(slug: string): Promise<ServiceRecord> {
  const response = await fetch(`/api/services/${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Service not found' : 'Failed to fetch service detail',
      response.status,
    );
  }
  return response.json();
}
