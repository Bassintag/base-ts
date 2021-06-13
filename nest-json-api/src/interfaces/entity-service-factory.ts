import {EntityClass} from './entity-class';
import {EntityService} from './entity-service';
import {ModuleRef} from '@nestjs/core';

export type EntityServiceFactory = (moduleRef: ModuleRef, resource: EntityClass) => EntityService<any>;
