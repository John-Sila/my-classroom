# Security Specification - Teacher Sila's Classroom

## Data Invariants
1. A **User** profile can only be read by the owner or a teacher. Sensitive fields (PII) like email should be protected.
2. A **Test** can only be created, updated, or deleted by a user with rank 'teacher'.
3. A **Question** belongs to a Test. Only teachers can manage questions.
4. A **TestAttempt** can be created by any authenticated learner.
5. A learner can only read or update their own **TestAttempt**.
6. A **TestAttempt** cannot be updated once `isSubmitted` is true (except by an admin/teacher if corrective logic is added, but default is terminal).
7. Learners cannot modify `score` or `percentage` in their attempts directly; these are calculated by the system (though rules will enforce they must be valid numbers if the client sends them, but typically we want to lock them). Actually, the prompt says "save score" on submission. We should ideally calculate this server-side, but with Firestore only, the client calculates and saves. Rules must at least ensure only the owner can write.
8. Learners can only see tests for their `className`.

## The Dirty Dozen (Vulnerabilities to block)
1. **Identity Spoofing**: User A trying to update User B's profile.
2. **Role Escalation**: Learner trying to set their rank to 'teacher'.
3. **Ghost Test Creation**: Learner trying to create a test document.
4. **Answer Peeking**: Learner trying to read the `correctAnswerIndex` from the `questions` subcollection before submission. (Note: This is a classic Firestore challenge. We might need to separate the correct answers into a private subcollection or just accept it if we don't have a middle tier for "question serving"). 
    - *Fix*: The prompt says "questions subcollection contains correctAnswerIndex". To be secure, learners should NOT be able to read this field. I'll use `get()` in the submit rule or just rely on the fact that if they have read access to the question, they see the answer.
    - *Better*: I'll restrict read access to `correctAnswerIndex` if possible, but Firestore doesn't support field-level security.
    - *Solution*: Separate `correctAnswers` into `tests/{testId}/markingScheme` or similar, which is teacher-only. The prompt says `markingScheme` is in the `Test` document. I'll make the `Test` document fields restricted.
5. **Score Injection**: Learner setting their score to 100% without taking the test.
6. **Time Warp**: Learner updating `updatedAt` to a past or future time not matching `request.time`.
7. **Terminal State Break**: Learner trying to change answers after `isSubmitted` is true.
8. **Test Hijacking**: User A updating User B's `testAttempt`.
9. **Question Injection**: Learner adding a fake question to a test.
10. **Class Boundary Breach**: Learner from Class 4A trying to read tests for Class 5D.
11. **Orphaned Attempt**: Creating a `TestAttempt` for a `testId` that doesn't exist.
12. **Denial of Wallet**: Sending 1MB strings in the `userName` field.

## Validation Blueprints
I'll define `isValidUser`, `isValidTest`, `isValidQuestion`, and `isValidAttempt`.
