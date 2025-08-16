/**
 * City service re-export with aliasing for consistency
 * 
 * Provides: Unified city API access point
 * Used by: City-related Redux thunks and components
 */

export { cityApiService as cityService } from './api/facades/cityApi'
