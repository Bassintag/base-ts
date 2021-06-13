export function flatten<T>(arr: T[][]): T[] {
	return arr.reduce((prev, val) => prev.concat(val), []);
}

export const CacheGetter = () => (
	target: Object,
	propertyKey: string,
	descriptor: PropertyDescriptor
) => {
	return {
		...descriptor,
		get: function (this) {
			const cached = descriptor.get.apply(this);
			Object.defineProperty(this, propertyKey, {
				...descriptor,
				get: () => cached,
			});
			return cached;
		}
	};
};
