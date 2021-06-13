export interface Include extends GetOptions {

	name: string;
}

export interface GetOptions {

	include?: Include[];
}

export interface EntityService<T> {

	get(id: string, options?: GetOptions): Promise<T | null>;
}
