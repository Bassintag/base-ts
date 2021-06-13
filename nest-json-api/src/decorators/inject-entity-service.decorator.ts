import {EntityClass} from '../interfaces';
import {Inject} from '@nestjs/common';
import {getEntityServiceToken} from '../json-api.utils';

export const InjectEntityService = (entity: EntityClass) => Inject(getEntityServiceToken(entity));
