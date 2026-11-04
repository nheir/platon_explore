import type { ExpandableModel } from '../core/expandable.model'
import type { Level } from '../core/level.model'
import type { OrderingDirections } from '../core/ordering.model'
import type { Topic } from '../core/topic.model'
import type { FileCreate } from './file.model'
import type { ResourceMeta } from './metadata.model'
import type { ResourcePermissions, emptyResourcePermissions } from './permissions.model'
import type { ResourceStatistic } from './statistic.model'

type ActivityNavigationModes = any;
interface ResourceStatus {};
interface ResourceTypes {};

/**
 * List of fields that can be expanded on a {@link Resource} object.
 */
export type ResourceExpandableFields =
  | 'metadata'
  | 'template'
  | 'parent'
  | 'template.metadata'
  | 'statistic'
  | 'permissions'

/**
 * Enum representing the possible orderings criteria for resources.
 */
export enum ResourceOrderings {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  RELEVANCE = 'RELEVANCE',
}

/**
 * A container for any educational content.
 */
export interface Resource {
  /**
   * Unique identifier of the resource.
   */
  readonly id: string

  /**
   * Date on which the resource has been created.
   */
  readonly createdAt: string

  /**
   * Last date on which the resource has been updated.
   * @remarks
   * - External events may trigger this field update like update of resource files.
   */
  readonly updatedAt: string

  /**
   * Display name of the resource.
   */
  readonly name: string

  /**
   * Unique string representing an alias for accessing this resource files.
   */
  readonly code?: string

  /**
   * Human readable
   */
  readonly desc?: string

  /**
   * Types of the resource.
   */
  readonly type: ResourceTypes

  /**
   * Value indicating whether this resource is inside of personal circle (for non circle resources) or is a personal cirlcle.
   */
  readonly personal: boolean

  /**
   * Current usability status of the resource used
   */
  readonly status: ResourceStatus

  /**
   * List of levels metadata associated to the resource.
   */
  readonly levels: Level[]

  /**
   * List of topics metadata associated to the resource.
   */
  readonly topics: Topic[]

  /**
   * Identifier of the resource's creator.
   */
  readonly ownerId: string

  /**
   * Identifier of the circle the resource belongs to if any.
   */
  readonly parentId?: string

  /**
   * Identifier of the exercise from which this resource (assuming that it's an exercise type) is from.
   */
  readonly templateId?: string

  /**
   * Version of the exercise from which this resource (assuming that it's an exercise type) is from.
   */
  readonly templateVersion?: string

  /**
   * Value indicating whether this resource is publicly previewable.
   */
  readonly publicPreview?: boolean

  // Expandable fields

  /**
   * List of permissions the user requesting the resource has on it.
   * @remarks
   * - `Expandable` (default in POST, PATCH AND SINGLE GET queries)
   */
  readonly permissions?: ResourcePermissions

  /**
   * The circle the resource belongs to if any.
   * @remarks
   * - `Expandable`
   */
  readonly parent?: Resource

  /**
   * Some useful metadata informations about the resource.
   * @remarks
   * - `Expandable`
   */
  readonly metadata?: ResourceMeta

  /**
   * The template from which the resource is from if any.
   * @remarks
   * - `Expandable`
   */
  readonly template?: Resource

  /**
   * Some statistics about the resource.
   * @remarks
   * - `Expandable`
   */
  readonly statistic?: ResourceStatistic
}

/**
 * Represents a branch in a hierarchical structure of circles.
 */
export interface CircleTree {
  /**
   * Unique identifier of the circle.
   */
  readonly id: string

  /**
   * Display name of the circle.
   */
  readonly name: string

  /**
   * Unique string representing an alias for accessing this circle files.
   */
  readonly code?: string

  /**
   * List of versions of the circle.
   */
  readonly versions?: string[]

  /**
   * List of children branches.
   */
  readonly children?: CircleTree[]

  /**
   * Permissions of the user requesting the circles.
   */
  readonly permissions?: ResourcePermissions
}

/**
 * Represents a payload for creating a resource.
 */
export interface CreateResource extends ExpandableModel<ResourceExpandableFields> {
  /**
   * Display name of the resource.
   */
  readonly name: string

  /**
   * Unique identifier of the circle the resource belongs to.
   */
  readonly parentId: string

  /**
   * Unique identifier of the exercise from which this resource (assuming that it's an exercise type) is from.
   */
  readonly templateId?: string

  /**
   * Version of the exercise from which this resource (assuming that it's an exercise type) is from.
   */
  readonly templateVersion?: string

  /**
   * Unique string representing an alias for accessing this resource files.
   */
  readonly code?: string

  /**
   * Resource's description.
   */
  readonly desc?: string

  /**
   * Resource's type.
   */
  readonly type: ResourceTypes

  /**
   * Resource's status (default is `ResourceStatus.READY`).
   */
  readonly status?: ResourceStatus

  /**
   * List of levels (identifiers) associated to the resource.
   */
  readonly levels?: string[]

  /**
   * List of topics (identifiers) associated to the resource.
   */
  readonly topics?: string[]

  /**
   * Optional list of files to create with the resource.
   */
  readonly files?: FileCreate[]
}

/**
 * Payload for dynamically creating a preview resource.
 */
export interface CreatePreviewResource extends ExpandableModel<ResourceExpandableFields> {
  /**
   * Content of files to create/update with the resource.
   * @remarks main.ple file is mandatory.
   */
  readonly files: FileCreate[]

  /**
   * Optional resource identifier retrieved from previous call to preview endpoint.
   */
  readonly resourceId?: string
}

/**
 * Represents a payload for updating a resource.
 */
export interface UpdateResource extends ExpandableModel<ResourceExpandableFields> {
  /**
   * Replace the resource's name.
   */
  readonly name?: string

  /**
   * Replace the resource's description.
   */
  readonly desc?: string

  /**
   * Mark the resource as publicly previewable or not.
   */
  readonly publicPreview?: boolean

  /**
   * Replace the status of the resource with the one specified.
   */
  readonly status?: ResourceStatus

  /**
   * Replace the levels associated to the resource with the ones specified in the array thanks to their identifiers.
   * @remarks
   * - If not specified, the levels associated to the resource will not be modified.
   * - If an empty array is specified, the levels associated to the resource will be removed.
   */
  readonly levels?: string[]

  /**
   * Replace the topics associated to the resource with the ones specified in the array thanks to their identifiers.
   * @remarks
   * - If not specified, the topics associated to the resource will not be modified.
   * - If an empty array is specified, the topics associated to the resource will be removed.
   */
  readonly topics?: string[]
}

/**
 * Represents a set of parameters for querying a specific resource.
 */
export interface FindResource extends ExpandableModel<ResourceExpandableFields> {
  id: string
  markAsViewed?: boolean
}

/**
 * Represents a set of filters for querying resources.
 */
export interface ResourceFilters extends ExpandableModel<ResourceExpandableFields> {
  /**
   * Filter resources by their types.
   */
  readonly types?: (keyof ResourceTypes)[]

  /**
   * Filter resources by their status.
   */
  readonly status?: (keyof ResourceStatus)[]

  /**
   * Free text search on resource, topics, and levels names.
   */
  readonly search?: string

  /**
   * Filter resources which have been updated in the last period of time.
   */
  readonly period?: number

  /**
   * Filter resources by their members.
   */
  readonly members?: string[]

  /**
   * Filter resources by their watchers.
   */
  readonly watchers?: string[]

  /**
   * Filter resources by their owners.
   */
  readonly owners?: string[]

  /**
   * Filter resources by whether they have been recently viewed by the current user.
   */
  readonly views?: boolean

  /**
   * Filter resources by whether they are personal or not.
   */
  readonly personal?: boolean

  /**
   * Filter resources by whether they are publicly previewable.
   */
  readonly publicPreview?: boolean

  /**
   * Filter exercises by whether they are configurable or not.
   */
  readonly configurable?: boolean

  /**
   * Filter resources by whether they are certified templates or not.
   */
  readonly certifiedTemplate?: boolean

  /**
   * Filter activities by their navigation settings.
   */
  readonly navigation?: ActivityNavigationModes

  /**
   * Search for specific topics on the resources.
   */
  readonly topics?: string[]

  /**
   * Search for resources that do not have the specified topics.
   */
  readonly antiTopics?: string[]

  /**
   * Search for specific levels on the resources.
   */
  readonly levels?: string[]

  /**
   * Search for resources used by the ones specified in the array.
   */
  readonly usedBy?: string[]

  /**
   * Search for resources that use the ones specified in the array.
   */
  readonly dependOn?: string[]

  /**
   * Pagination offset.
   */
  readonly offset?: number

  /**
   * Pagination limit.
   */
  readonly limit?: number

  /**
   * Search for resources that are children (direct) of the ones specified in the array.
   */
  readonly parents?: string[]

  /**
   * Ordering criteria.
   */
  readonly order?: ResourceOrderings

  /**
   * Ordering direction.
   */
  readonly direction?: OrderingDirections

  /**
   * Search for resources that use a template.
   */
  readonly useTemplate?: boolean
}

/**
 * Defines the default ordering directions for resource orderings criteria.
 */
export const RESOURCE_ORDERING_DIRECTIONS: Readonly<Record<ResourceOrderings, keyof typeof OrderingDirections>> = {
  NAME: 'ASC',
  CREATED_AT: 'DESC',
  UPDATED_AT: 'DESC',
  RELEVANCE: 'DESC',
}
