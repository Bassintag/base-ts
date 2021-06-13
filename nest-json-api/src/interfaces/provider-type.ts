import {ModuleRef} from '@nestjs/core';
import {Type} from '@nestjs/common';

export type ProviderType<T> = { new(moduleRef: ModuleRef, entityType: Type): T };
