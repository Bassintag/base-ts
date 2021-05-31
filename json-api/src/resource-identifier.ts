import {Meta} from './meta';

export interface ResourceIdentifier {
	id: string;

	type: string;

	meta?: Meta;
}
