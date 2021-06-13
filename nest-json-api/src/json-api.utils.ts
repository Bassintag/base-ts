import {EntityClass} from './interfaces/entity-class';
import {Type} from '@nestjs/common';

export function getEntityType(
	entity: Type,
) {
	const parts = /[A-Z][a-z]+/g.exec(entity.name);
	return parts!.join('-').toLowerCase();
}

export type EntityTokenParam = string | EntityClass;

function getEntityToken(param: EntityTokenParam) {
	if (typeof param === 'string') {
		return param;
	} else {
		return getEntityType(param);
	}
}

export function getEntityServiceToken(
	entity: EntityTokenParam,
) {
	return `JSON-API:ENTITY-SERVICE:${getEntityToken(entity)}`;
}

export function getEntitySerializerToken(
	entity: EntityTokenParam,
) {
	return `JSON-API:ENTITY-SERIALIZER:${getEntityToken(entity)}`;
}

export function getEntityMetadataToken(
	entity: EntityTokenParam,
) {
	return `JSON-API:ENTITY-METADATA:${getEntityToken(entity)}`;
}
