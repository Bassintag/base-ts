import {JsonApiSpecification} from './json-api-specification';
import {PrimaryData} from './primary-data';
import {Meta} from './meta';
import {Links} from './links';
import {Resource} from './resource';

export interface TopLevel {

	data?: PrimaryData;

	meta?: Meta;

	links?: Links;

	included?: Resource[];

	jsonApi?: JsonApiSpecification;
}
