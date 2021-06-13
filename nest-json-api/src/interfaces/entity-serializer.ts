import {Resource, ResourceIdentifier} from '@base-ts/json-api/lib';

export interface EntitySerializer<T> {

	serializeEntityAsIdentifier(entity: T): ResourceIdentifier;

	serializeEntitiesAsIdentifiers(entities: T[]): ResourceIdentifier[];

	serializeEntity(entity: T): [Resource, Resource[]];

	serializeEntities(entities: T[]): [Resource[], Resource[]];
}
