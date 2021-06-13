import {Provider} from '@nestjs/common';
import {EntityClass} from './interfaces/entity-class';
import {EntityServiceFactory} from './interfaces/entity-service-factory';
import {getEntityMetadataToken, getEntitySerializerToken, getEntityServiceToken} from './json-api.utils';
import {EntitySerializerFactory} from './interfaces/entity-serializer-factory';
import {flatten} from './utils';
import {ModuleRef} from '@nestjs/core';
import {EntityMetadataFactory} from './interfaces/entity-metadata-factory';

export function createJsonApiProviders(
	resources: EntityClass[],
	options: {
		entityMetadataFactory: EntityMetadataFactory,
		entityServiceFactory: EntityServiceFactory,
		entitySerializerFactory: EntitySerializerFactory,
	}
): Provider[] {
	return flatten(resources.map((resource) => [{
		provide: getEntityMetadataToken(resource),
		useFactory: (moduleRef) => options.entityMetadataFactory(moduleRef, resource),
		inject: [ModuleRef],
	}, {
		provide: getEntityServiceToken(resource),
		useFactory: (moduleRef) => options.entityServiceFactory(moduleRef, resource),
		inject: [ModuleRef],
	}, {
		provide: getEntitySerializerToken(resource),
		useFactory: (moduleRef) => options.entitySerializerFactory(moduleRef, resource),
		inject: [ModuleRef],
	}]));
}
