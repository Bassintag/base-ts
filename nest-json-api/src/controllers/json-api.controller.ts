import {EntityController, EntitySerializer, EntityService} from '../interfaces';
import {TopLevel} from '@base-ts/json-api/lib';
import {Get, NotFoundException, Param, Query} from '@nestjs/common';

export interface JsonApiControllerOptions<T> {

	service: EntityService<T>;

	serializer: EntitySerializer<T>;
}

export class JsonApiController<T> implements EntityController {

	private readonly service: EntityService<T>;
	private readonly serializer: EntitySerializer<T>;

	constructor(
		options: JsonApiControllerOptions<T>,
	) {
		this.service = options.service;
		this.serializer = options.serializer;
	}

	@Get(':id')
	async get(
		@Param('id') id: string,
		@Query() query: any,
	): Promise<TopLevel> {
		console.log(query);
		const entity = await this.service.get(id, {
			include: query.include?.map((i) => ({
				name: i,
			}))
		});
		console.log(query);
		if (entity == null) {
			throw new NotFoundException();
		}
		const [
			resource,
			includedResources
		] = this.serializer.serializeEntity(entity);
		return {
			data: resource,
			included: includedResources,
		};
	}
}
