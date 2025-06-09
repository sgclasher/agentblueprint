import { Profile } from './types';

export const demoDataService = {
  getDemoProfiles(): Partial<Profile>[] {
    // Returning an empty array as the original file was missing
    // and this is a placeholder to resolve the import error.
    return [];
  }
}; 