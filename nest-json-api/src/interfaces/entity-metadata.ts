export interface EntityRelationshipMetadata<T> {

	readonly name: string;

	readonly type: string;

	readonly many: boolean;

	readonly foreignKey?: keyof T & string;

	readonly valueKey?: keyof T & string;
}

export interface EntityMetadata<T> {

	readonly type: string;

	readonly attributes: readonly (keyof T & string)[];

	readonly relationships: readonly EntityRelationshipMetadata<T>[];
}
