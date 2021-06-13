import {Entity, EntityClass, EntityMetadata, EntitySerializer} from '../interfaces';
import {Attributes, Relationships, Resource, ResourceIdentifier, ResourceLinkage} from '@base-ts/json-api/lib';
import {ModuleRef} from '@nestjs/core';
import {CacheGetter} from '../utils';
import {getEntityMetadataToken, getEntitySerializerToken} from '../json-api.utils';

export class JsonApiEntitySerializerProvider<T extends Entity> implements EntitySerializer<T> {

	private serializerCache: { [key: string]: JsonApiEntitySerializerProvider<any> };

	@CacheGetter()
	get entityMetadata(): EntityMetadata<T> {
		return this.moduleRef.get(getEntityMetadataToken(this.entity));
	}

	constructor(
		private moduleRef: ModuleRef,
		private entity: EntityClass,
	) {
	}

	private getSerializer(type: string): JsonApiEntitySerializerProvider<Entity> {
		if (this.serializerCache == null) {
			this.serializerCache = {};
		}
		const existing = this.serializerCache[type];
		if (existing) {
			return existing;
		} else {
			const resolved = this.moduleRef.get(getEntitySerializerToken(type));
			this.serializerCache[type] = resolved;
			return resolved;
		}
	}

	serializeEntityAsIdentifier(entity: T): ResourceIdentifier {
		return {
			id: entity.id,
			type: this.entityMetadata.type,
		};
	}

	serializeEntitiesAsIdentifiers(entities: T[]): ResourceIdentifier[] {
		return entities.map((entity) => this.serializeEntityAsIdentifier(entity));
	}

	serializeEntity(entity: T): [Resource, Resource[]] {
		const metadata = this.entityMetadata;
		const attributes: Attributes = {};
		const relationships: Relationships = {};
		const included: Resource[] = [];
		for (const attribute of metadata.attributes) {
			attributes[attribute] = entity[attribute];
		}
		for (const relationship of metadata.relationships) {
			const serializer = this.getSerializer(relationship.type);
			const value = relationship.valueKey != null && entity[relationship.valueKey];
			let data: ResourceLinkage;
			if (relationship.many) {
				if (value) {
					const related = value as unknown as Entity[];
					serializer.serializeEntitiesAsIdentifiers(related);
					const [relatedSerialized, relatedIncluded] = serializer.serializeEntities(related);
					included.push(...relatedSerialized, ...relatedIncluded);
				} else {
					data = undefined;
				}
			} else {
				if (value) {
					const related = value as unknown as Entity;
					serializer.serializeEntityAsIdentifier(related);
					const [relatedSerialized, relatedIncluded] = serializer.serializeEntity(related);
					included.push(relatedSerialized, ...relatedIncluded);
				} else {
					data = {
						type: relationship.type,
						id: entity[relationship.foreignKey] as unknown as string,
					};
				}
			}
			relationships[relationship.name] = {
				data,
			};
		}
		return [{
			id: entity.id,
			type: metadata.type,
			attributes,
			relationships,
		}, included];
	}

	serializeEntities(entities: T[]): [Resource[], Resource[]] {
		const resources: Resource[] = [];
		const includedResources: Resource[] = [];
		const serialized = entities.map((entity) => this.serializeEntity(entity));
		for (const [resource, included] of serialized) {
			resources.push(resource);
			for (const includedResource of included) {
				if (includedResources.find((r) => r.id === includedResource.id) == null) {
					includedResources.push(includedResource);
				}
			}
		}
		return [resources, includedResources]
	}
}
