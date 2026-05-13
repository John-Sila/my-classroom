# Security Specification for Teacher Sila's Classroom

## Data Invariants
1. A learner cannot edit or delete tests.
2. A learner can only create one attempt per test.
3. A learner can only read tests for their own class.
4. A learner cannot modify their own score in a test attempt.
5. A user's profile can only be modified by themselves or a teacher (for creation).
6. Teachers have full access to tests and attempts for analytical purposes.

## The Dirty Dozen Payloads (Rejection Targets)

1. **Identity Spoofing**: Attempt to create a user profile with a different `uid` than the authenticated user.
2. **Role Escalation**: A learner attempting to update their rank to `teacher`.
3. **Score Tampering**: A learner attempting to update `score` or `percentage` in `testAttempts`.
4. **Foreign Class Access**: A learner in "5D" attempting to read a test for "4A".
5. **Ghost Test Creation**: A learner attempting to create a new test.
6. **Immutable Field Change**: Attempting to change `startedAt` in `testAttempts` after creation.
7. **Pillaging Results**: A learner attempting to read another learner's `testAttempts` list.
8. **Double Submission**: A learner attempting to write to `testAttempts` after `isSubmitted` is already true.
9. **Question Poisoning**: A learner attempting to update `tests/{id}/questions` data.
10. **System Field Injection**: Attempting to add an `isAdmin: true` field to a user profile.
11. **Spoofed LastLogin**: Attempting to set a `lastLogin` timestamp into the future.
12. **Orphaned Attempt**: Attempting to create a `testAttempt` for a `testId` that does not exist.

## Test Runner (Logic Check)
The rules must handle these cases via `isValid[Entity]` helpers and `affectedKeys().hasOnly()`.
