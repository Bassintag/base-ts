import {EntitySerializerFactory} from '../interfaces/entity-serializer-factory';
import {JsonApiEntitySerializerProvider} from '../providers/json-api.entity-serializer.provider';

export const jsonApiEntitySerializerFactory: EntitySerializerFactory = (
	moduleRef,
	entity
) => new JsonApiEntitySerializerProvider(moduleRef, entity);
