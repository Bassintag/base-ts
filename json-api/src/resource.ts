import {Attributes} from './attributes';
import {Meta} from './meta';
import {Relationships} from './relationships';
import {Links} from './links';

export interface Resource {
	id: string;

	type: string;

	attributes?: Attributes;

	relationships?: Relationships;

	links?: Links;

	meta?: Meta;
}
