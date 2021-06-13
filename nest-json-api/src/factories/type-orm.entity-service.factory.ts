import {EntityServiceFactory} from '../interfaces/entity-service-factory';
import {TypeOrmEntityServiceProvider} from '../providers/type-orm.entity-service.provider';

export const typeOrmEntityServiceFactory: EntityServiceFactory = (
	moduleRef,
	entity,
) => new TypeOrmEntityServiceProvider(moduleRef, entity);
