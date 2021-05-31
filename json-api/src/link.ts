import {Meta} from './meta';

export type Link = string | {
	href: string;
	meta?: Meta;
}
