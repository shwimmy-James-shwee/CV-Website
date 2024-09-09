import { TokenClaims } from '@azure/msal-common';

/**
 * Compare the token issuing policy with a specific policy name
 * @param {object} idTokenClaims - Object containing the claims from the parsed token
 * @param {string} policyToCompare - ID/Name of the policy as expressed in the Azure portal
 * @returns {boolean}
 */

interface CompareTokenClaims extends TokenClaims {
  tfp?: string;
  acr?: string;
}

export function compareIssuingPolicy(
  idTokenClaims: CompareTokenClaims | undefined,
  policyToCompare: string | undefined,
) {
  const tfpMatches =
    // eslint-disable-next-line no-prototype-builtins
    idTokenClaims?.hasOwnProperty('tfp') && idTokenClaims['tfp']?.toLowerCase() === policyToCompare?.toLowerCase();
  const acrMatches =
    // eslint-disable-next-line no-prototype-builtins
    idTokenClaims?.hasOwnProperty('acr') && idTokenClaims['acr']?.toLowerCase() === policyToCompare?.toLowerCase();

  if (!tfpMatches && !acrMatches) return false;
  return tfpMatches || acrMatches;
}
