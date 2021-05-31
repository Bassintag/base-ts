import {Resource} from './resource';
import {ResourceIdentifier} from './resource-identifier';

export type PrimaryData = Resource | ResourceIdentifier | null | Resource[] | ResourceIdentifier[] | [];
