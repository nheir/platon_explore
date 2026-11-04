/* eslint-disable @typescript-eslint/no-explicit-any */

type ActivityVariables = any
type ExerciseVariables = any;
type Buffer = any;

export interface SandboxInput {
  envid?: string | null
  files?:
    | {
        path: string
        content: string
        hash: string
      }[]
    | null
  submissionFiles?:
    | {
        path: string
        content: Buffer
      }[]
    | null
  variables: ExerciseVariables | ActivityVariables
}

export interface SandboxOutput {
  envid?: string
  variables: ExerciseVariables | ActivityVariables
}

export interface SandboxEnvironment {
  envid: string // Environment ID
  content: string // Content of the environment (gzip tarball)
}

export interface Sandbox {
  downloadEnvironment(envid: string): Promise<SandboxEnvironment>
  supports(input: SandboxInput): boolean
  run(input: SandboxInput, script: string, timeout: number): Promise<SandboxOutput>
  runNext(input: SandboxInput, timeout: number): Promise<SandboxOutput>
}
