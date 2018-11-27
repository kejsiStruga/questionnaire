// Ref: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript

export const Decamelize = (str, separator) => {
	separator = typeof separator === 'undefined' ? '_' : separator;

	return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + ' $2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + ' $2');
        // .toLowerCase();
}

export const Capitalize = (str) => {
    return str.slice(0, 1).toUpperCase()
            + str.slice(1, str.length);
}
