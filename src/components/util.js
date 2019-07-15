export const camelCase = (string) => {
	return string
		.split(' ')
		.map((val) => `${val.substring(0, 1).toUpperCase()}${val.substring(1)}`)
		.join(' ');
};

export const removeSpaces = (string) => string.replace(/\s/g, '');
