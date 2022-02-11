export const normalizeClass = (
	classesObject: Record<string, string>
): string => {
	if (!classesObject) {
		return '';
	}

	const classes = Object.values(classesObject);
	const validClassName = classes.every(
		(value) => typeof value === 'string' && value.match(/[a-z]+/g)?.length
	);

	if (!validClassName) {
		throw new TypeError('The string contains invalid class names.');
	}
	const className = classes.join(' ');
	return className;
};
