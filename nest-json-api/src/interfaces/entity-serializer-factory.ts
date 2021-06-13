import {EntityClass} from './entity-class';
import {EntitySerializer} from './entity-serializer';
import {ModuleRef} from '@nestjs/core';

export type EntitySerializerFactory = (moduleRef: ModuleRef, resource: EntityClass) => EntitySerializer<any>;
