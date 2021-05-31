import {Meta} from './meta';
import {Links} from './links';
import {ResourceLinkage} from './resource-linkage';

export interface Relationship {

	data?: ResourceLinkage;

	links?: Links;

	meta?: Meta;
}
