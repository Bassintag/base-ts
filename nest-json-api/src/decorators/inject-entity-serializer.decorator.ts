import {EntityClass} from '../interfaces';
import {Inject} from '@nestjs/common';
import {getEntitySerializerToken} from '../json-api.utils';

export const InjectEntitySerializer = (entity: EntityClass) => Inject(getEntitySerializerToken(entity));
