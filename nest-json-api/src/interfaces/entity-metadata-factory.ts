import {EntityClass} from './entity-class';
import {ModuleRef} from '@nestjs/core';
import {EntityMetadata} from './entity-metadata';

export type EntityMetadataFactory = (moduleRef: ModuleRef, resource: EntityClass) => EntityMetadata<any>;
