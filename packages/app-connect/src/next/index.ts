import type { VerifiableRequest } from '../types/verifiable-request';
import type {
  VerificationOptions,
  WebhookVerificationOptions,
} from '../utils/config';
import { verifyAction as coreVerifyAction } from '../utils/verification';
import { verifyWebhookSubscription as coreVerifyWebhookSubscription } from '../utils/webhook';

// Re-export the VerifiableRequest type for Next.js users
export type { VerifiableRequest } from '../types/verifiable-request';
// The status and body the other adapters answer a failed webhook with
export { webhookFailureBody, webhookFailureStatus } from '../utils/config';

/**
 * Verifies a signed action request in a Next.js environment
 */
export function verifyAction(
  req: VerifiableRequest,
  options?: VerificationOptions,
) {
  return coreVerifyAction(req, options);
}

/**
 * Verifies a webhook subscription request in a Next.js environment
 *
 * A signed `webhook-timestamp` more than 5 minutes from now is refused with
 * `WEBHOOK_TIMESTAMP_OUT_OF_TOLERANCE`; set `toleranceSeconds` to widen that, or
 * to `Infinity` to turn it off (for example to verify stored deliveries later).
 */
export function verifyWebhookSubscription(
  req: VerifiableRequest,
  options?: WebhookVerificationOptions,
) {
  return coreVerifyWebhookSubscription(req, options);
}
