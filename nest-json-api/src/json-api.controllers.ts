import {EntityClass, EntitySerializer, EntityService} from './interfaces';
import {JsonApiController} from './controllers';
import {Controller, Type} from '@nestjs/common';
import {getEntityType} from './json-api.utils';
import {InjectEntityService} from './decorators/inject-entity-service.decorator';
import {InjectEntitySerializer} from './decorators/inject-entity-serializer.decorator';

export const createJsonApiControllers = (
	entities: EntityClass[],
): Type[] => {
	return entities.map((entity) => {
		const path = getEntityType(entity);

		@Controller(path)
		class DynamicController extends JsonApiController<any> {
			constructor(
				@InjectEntityService(entity)
					service: EntityService<any>,
				@InjectEntitySerializer(entity)
					serializer: EntitySerializer<any>,
			) {
				super({
					service,
					serializer,
				});
			}
		}

		Object.defineProperty(DynamicController, 'name', {
			value: `${entity.name}Controller`,
			writable: false,
		});

		return DynamicController;
	});
}
