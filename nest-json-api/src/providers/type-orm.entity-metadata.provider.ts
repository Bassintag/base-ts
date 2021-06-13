import {EntityMetadata, EntityRelationshipMetadata} from '../interfaces/entity-metadata';
import {ModuleRef} from '@nestjs/core';
import {Type} from '@nestjs/common';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {getEntityType} from '../json-api.utils';
import {CacheGetter} from '../utils';

export class TypeOrmEntityMetadataProvider<T> implements EntityMetadata<T> {

	@CacheGetter()
	private get repository(): Repository<T> {
		return this.moduleRef.get<Repository<T>>(getRepositoryToken(this.entity), {strict: false})
	}

	@CacheGetter()
	get type(): string {
		return getEntityType(this.entity)
	}

	@CacheGetter()
	get attributes(): (keyof T & string)[] {
		return this.repository.metadata.columns.map((column) => column.propertyName as keyof T & string)
			.filter((attribute) => attribute !== 'id');
	}

	@CacheGetter()
	get relationships(): EntityRelationshipMetadata<T>[] {
		return this.repository.metadata.relations.map((relation) => {
			const many = relation.isManyToMany || relation.isOneToMany;
			return {
				name: relation.propertyName,
				type: getEntityType(relation.type as Type),
				many,
				foreignKey: relation.joinColumns[0]?.propertyName as keyof T & string,
			}
		});
	}

	constructor(
		private moduleRef: ModuleRef,
		private entity: Type<T>,
	) {
	}
}
