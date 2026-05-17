import { Timestamp } from 'firebase/firestore';

export type UserRank = 'teacher' | 'learner';

export interface UserProfile {
  uid: string;
  email: string;
  userName: string;
  fullName: string;
  rank: UserRank;
  className: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin: Timestamp;
  photoURL: string;
  isActive: boolean;
  scores: Record<string, number>;
  lastNotificationRead: Timestamp | null;
}

export interface Test {
  testId: string;
  testName: string;
  className: string;
  durationMinutes: number;
  createdBy: string;
  createdAt: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;
  isActive: boolean;
  timestamp: Timestamp;
  markingScheme: Record<string, number>;
}

export interface Question {
  questionId: string;
  questionText: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
  answeredUsers: string[];
}

export interface TestAttempt {
  attemptId: string;
  uid: string;
  testId: string;
  testName: string;
  className: string;
  startedAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp;
  isSubmitted: boolean;
  score: number;
  percentage: number;
  answers: Record<string, {
    selectedAnswer: number;
    isCorrect: boolean;
    updatedAt: Timestamp;
  }>;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}
