import {TopLevel} from '@base-ts/json-api/lib';

export interface EntityController {

	get(id: string, query: object): Promise<TopLevel>
}
