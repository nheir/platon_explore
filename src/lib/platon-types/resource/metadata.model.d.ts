type ActivitySettings = any;
type PleConfigJSON = any;

import type { FileVersion } from './file.model'

export interface CircleResourceMeta {
  versions: FileVersion[]
}

export interface ActivityResourceMeta {
  settings: ActivitySettings
  versions: FileVersion[]
}

export interface ExerciseResourceMeta {
  configurable: boolean
  certifiedTemplate: boolean
  config?: PleConfigJSON
  versions: FileVersion[]
}

export type ResourceMeta = CircleResourceMeta | ActivityResourceMeta | ExerciseResourceMeta
