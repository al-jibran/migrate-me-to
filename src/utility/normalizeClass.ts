export const normalizeClass = (
	classesObject: Record<string, string>
): string => {
	if (!classesObject) {
		return '';
	}

	const classes = Object.values(classesObject);

	const className = classes.join(' ');
	console.log(className);
	return className;
};
