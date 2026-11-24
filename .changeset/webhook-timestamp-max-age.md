---
'@godaddy/app-connect': minor
---

`verifyWebhookSubscription` now refuses a `webhook-timestamp` more than 300 seconds (5 minutes) from now by default, the default `verifyAction` has for `maxTimestampAgeSeconds`, so a captured signed delivery can only be replayed within that window (dedupe on `webhook-id` for the rest). Pass a wider `toleranceSeconds` to allow more, or `Infinity` to turn the check off, for example to verify stored deliveries later. A refusal is logged at warn at most once every ten minutes (or again at once if the clock moved back), with the measured clock skew (or `malformedTimestamp` when the signed timestamp isn't a whole number of Unix seconds within the safe-integer range).

Behaviour change: a delivery verified more than five minutes after it was signed, which used to pass, is now refused with `WEBHOOK_TIMESTAMP_OUT_OF_TOLERANCE` (401). It ships as a minor while app-connect is still pre-stable, like the strict raw-body default.
