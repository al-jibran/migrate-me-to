const DEFAULT_SIZE = 'mobile';

export const normalizeClass = (
	classesObject: Record<string, string>
): string => {
	if (!classesObject) {
		return '';
	}

	const classes = Object.keys(classesObject).map((screen) => {
		const currentClass = classesObject[screen];
		// TS will throw an error without this,
		// since it cannot confirm whether the value will result in a string to match with regex

		// While we're at it, also check whether the user gave a valid string with words
		if (
			typeof currentClass !== 'string' ||
			!currentClass.match(/[a-z]+/)?.length
		) {
			throw new TypeError(`Invalid value for screen ${screen}`);
		}

		if (screen === DEFAULT_SIZE) {
			return classesObject[screen];
		}

		const validClassPattern = /(-?[a-z]+-?[0-9a-z\/#'[]+-?([a-z0-9'\]]+)?)/g;

		const classString: string = currentClass.replace(
			validClassPattern,
			`${screen}:$1`
		);

		return classString;
	});

	const className = classes.join(' ');
	return className;
};
