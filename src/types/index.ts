export type UserRank = 'teacher' | 'learner';

export interface UserProfile {
  uid: string;
  email: string;
  userName: string;
  fullName: string;
  rank: UserRank;
  className: string;
  createdAt: any;
  updatedAt: any;
  lastLogin: any;
  photoURL?: string;
  isActive: boolean;
  scores?: Record<string, number>;
}

export interface Question {
  questionId: string;
  questionText: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Test {
  id: string;
  testName: string;
  className: string;
  durationMinutes: number;
  createdBy: string;
  createdAt: any;
  startTime: any;
  endTime: any;
  isActive: boolean;
  markingScheme: Record<string, number>;
}

export interface TestAttempt {
  id: string;
  uid: string;
  testId: string;
  testName: string;
  className: string;
  startedAt: any;
  updatedAt: any;
  submittedAt?: any;
  isSubmitted: boolean;
  score: number;
  percentage: number;
  answers: Record<string, {
    selectedAnswer: number;
    isCorrect: boolean;
    updatedAt: any;
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
  }
}
