import {EntityMetadataFactory} from '../interfaces';
import {TypeOrmEntityMetadataProvider} from '../providers';

export const typeOrmEntityMetadataFactory: EntityMetadataFactory = (
	moduleRef,
	entity,
) => new TypeOrmEntityMetadataProvider(moduleRef, entity);
