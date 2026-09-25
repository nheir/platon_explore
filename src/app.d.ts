// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Platon {

		export enum ResourceStatus {
			READY = 'READY',
			DEPRECATED = 'DEPRECATED',
			BUGGED = 'BUGGED',
			NOT_TESTED = 'NOT_TESTED',
			DRAFT = 'DRAFT',
		}
		export enum ResourceTypes {
			CIRCLE = 'CIRCLE',
			EXERCISE = 'EXERCISE',
			ACTIVITY = 'ACTIVITY',
		}
		/**
		 * Represents the permissions for a member on a resource.
		 */
		export interface MemberPermissions {
			/**
			 * Indicates if the user can read the resource.
			 */
			readonly read: boolean

			/**
			 * Indicates if the user can write the resource.
			 */
			readonly write: boolean
		}

		/**
		 * Represents specific user permissions on a resource.
		 */
		export interface ResourcePermissions extends MemberPermissions {
			/**
			 * Indicates if the user is a member of the resource.
			 */
			readonly member: boolean

			/**
			 * Indicates if the user is a watcher of the resource.
			 */
			readonly watcher: boolean

			/**
			 * Indicates if the user is waiting for being accepted as a member of the resource.
			 */
			readonly waiting: boolean
		}

		export enum FileMoveActions {
			move = 'move',
			copy = 'copy',
		}

		export enum FileTypes {
			file = 'file',
			folder = 'folder',
		}

		export interface ResourceFile {
			oid: string
			path: string
			type: FileTypes
			version: string
			resourceId: string
			resourceCode?: string

			url: string
			bundleUrl: string
			downloadUrl: string
			describeUrl: string

			isInherited?: boolean

			readOnly?: boolean
			children?: ResourceFile[]
		}
		export interface FileVersion {
			tag: string
			tagger: {
				name: string
				email: string
			}
			message: string
			createdAt: string
		}
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

		export interface Result {
			success: boolean,
		}
	}
}

export { };
