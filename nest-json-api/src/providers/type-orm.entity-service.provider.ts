import {ModuleRef} from '@nestjs/core';
import {EntityService, GetOptions} from '../interfaces';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Type} from '@nestjs/common';
import {CacheGetter} from '../utils';

export class TypeOrmEntityServiceProvider<T> implements EntityService<T> {

	@CacheGetter()
	private get repository(): Repository<T> {
		return this.moduleRef.get(getRepositoryToken(this.entity), {strict: false});
	}

	constructor(
		private moduleRef: ModuleRef,
		private entity: Type<T>,
	) {
	}

	async get(id: string, options: GetOptions = {}): Promise<T | null> {
		const repository = this.repository;
		const name = this.repository.metadata.name.toLowerCase();
		const resource = await repository.findOne({
			where: {
				id,
			},
			join: {
				alias: name,
				leftJoinAndSelect: options.include?.reduce((p, v) => ({
					...p,
					[`${name}__${v.name}`]: `${name}.${v.name}`
				}), {}),
			}
		});
		return resource ?? null;
	}
}
