import type { OrderingDirections } from '../core/ordering.model'
import type { UserGroupOrderings } from '../core/user.model'

export interface ResourceWatcherFilters {
  readonly search?: string
  readonly offset?: number
  readonly limit?: number
  readonly order?: UserGroupOrderings
  readonly direction?: OrderingDirections
}
