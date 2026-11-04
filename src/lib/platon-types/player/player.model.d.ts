/* eslint-disable @typescript-eslint/no-explicit-any */


export enum PlayerActions {
  NEXT_HINT = 'NEXT_HINT',
  CHECK_ANSWER = 'CHECK_ANSWER',
  SHOW_SOLUTION = 'SHOW_SOLUTION',
  REROLL_EXERCISE = 'REROLL_EXERCISE',
  SAVE_ANSWER = 'SAVE_ANSWER',
}

export enum LogType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warn',
  DEBUG = 'debug',
}

export interface PlatonLog {
  type: LogType
  message: string
}

export interface PlayerExercise {
  id: string
  sessionId: string
  state: AnswerStates
  title: string
  peerComparison?: boolean
  grade?: number
}

export interface PlayerNavigation {
  started: boolean
  terminated: boolean
  /** Extra time (in seconds) granted by a teacher to this session. */
  extraTime?: number
  current?: PlayerExercise
  exercises: PlayerExercise[]

  nextExercisesHistory: string[]
  nextExercisesHistoryPosition: number
}

/**
 * Representation of the `/player/preview` endpoint body.
 */
export interface PreviewInput {
  /** Version of the resource to preview (default: latest) */
  version?: string
  /** Id of the resource to preview. */
  resource: string
  /** Optional variable overrides */
  overrides?: Variables
}

/**
 * Representation of the `/player/play/answers` endpoint body.
 */
export interface PlayAnswersInput {
  /** Session id of the exercise.  */
  sessionId: string
}

/**
 * Representation of the `/player/play/exercises` endpoint body.
 */
export interface PlayExerciseInput {
  /** Session id of the activity containing the exercises to be played.  */
  activitySessionId: string
  /** A list of exercise sessions to start/resume. */
  exerciseSessionIds: string[]
}

/**
 * Representation of the `/player/play/activity` endpoint body.
 */
export interface PlayActivityInput {
  /** Identifier of the course activity to start/resume. */
  activityId: string
}

/**
 * Representation of the `/player/evaluate` endpoint body.
 */
export interface EvalExerciseInput {
  /** Action to do. */
  action: PlayerActions
  /** An exercise session. */
  sessionId: string
  /** Current answers of the user inside of the exercise. */
  answers?: Record<string, any>
}

export interface PreviewOuput {
  exercise?: ExercisePlayer
  activity?: ActivityPlayer
}

export interface PlayAnswersOutput {
  exercises: ExercisePlayer[]
}

export interface PlayExerciseOuput {
  exercises: ExercisePlayer[]
  navigation?: PlayerNavigation
}

export interface PlayActivityOuput {
  activity: ActivityPlayer
}

export interface NextOutput {
  nextExerciseId: string
  navigation: PlayerNavigation
  logs?: PlatonLog[]
}

export interface EvalExerciseOutput {
  exercise: ExercisePlayer
  navigation?: PlayerNavigation
}

export interface ExercisePlayer {
  type: 'exercise'
  answerId?: string | null
  sessionId: string
  startedAt?: Date | null
  lastGradedAt?: Date | null
  form: string
  title: string
  statement: string
  hints?: string[] | null
  author?: string | null
  correction?: {
    grade: number
    authorId?: string
    createdAt: Date
    updatedAt: Date
  } | null
  remainingAttempts?: number | null
  solution?: string | null
  settings?: ActivitySettings | null
  feedbacks?: ExerciseFeedback[] | null
  platon_logs?: PlatonLog[] | null
  theories?:
    | {
        url: string
        title: string
      }[]
    | null
  reviewMode?: boolean | null
}

export interface ActivityPlayer {
  type: 'activity'
  sessionId: string
  activityId?: string | null
  title: string
  author?: string | null
  introduction: string
  conclusion: string
  state: ActivityOpenStates
  serverTime: Date
  openAt?: Date | null
  closeAt?: Date | null
  startedAt?: Date | null
  lastGradedAt?: Date | null
  navigation: PlayerNavigation
  settings?: ActivitySettings | null
}

/** Representation of an exercise/activity player. */
export declare type Player = ExercisePlayer | ActivityPlayer

export interface PlayerActivityVariables extends ActivityVariables {
  navigation: PlayerNavigation
}
