import {DynamicModule, Module} from '@nestjs/common';
import {EntityClass} from './interfaces/entity-class';
import {EntityMetadataFactory} from './interfaces/entity-metadata-factory';
import {EntityServiceFactory} from './interfaces/entity-service-factory';
import {EntitySerializerFactory} from './interfaces/entity-serializer-factory';
import {typeOrmEntityMetadataFactory} from './factories/type-orm.entity-metadata.factory';
import {jsonApiEntitySerializerFactory} from './factories/json-api.entity-serializer.factory';
import {typeOrmEntityServiceFactory} from './factories/type-orm.entity-service.factory';
import {createJsonApiProviders} from './json-api.providers';
import {createJsonApiControllers} from './json-api.controllers';

export interface JsonApiModuleForFeatureOptions {
	entityMetadataFactory?: EntityMetadataFactory;

	entityServiceFactory?: EntityServiceFactory;

	entitySerializerFactory?: EntitySerializerFactory;
}

@Module({})
export class JsonApiModule {

	static forRoot(): DynamicModule {
		return {
			module: JsonApiModule,
		};
	}

	static forFeature(
		entities: EntityClass[],
		{
			entityServiceFactory = typeOrmEntityServiceFactory,
			entityMetadataFactory = typeOrmEntityMetadataFactory,
			entitySerializerFactory = jsonApiEntitySerializerFactory,
		}: JsonApiModuleForFeatureOptions = {},
	): DynamicModule {
		const providers = createJsonApiProviders(entities, {
			entityMetadataFactory,
			entitySerializerFactory,
			entityServiceFactory,
		});
		const controllers = createJsonApiControllers(entities);
		return {
			module: JsonApiModule,
			providers,
			controllers,
			exports: providers,
		};
	}
}
