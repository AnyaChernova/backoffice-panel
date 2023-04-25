const toFormData = function(formData, data = {}, parentKey) {
	Object.entries(data).forEach(([key, value]) => {
		const isArray = Array.isArray(value);
		const isObject = value instanceof Object;
		const isDate = value instanceof Date;
		const isFile = value instanceof File || value instanceof Blob;

		if ((isArray || isObject) && !isFile && !isDate) {
			toFormData(formData, value, parentKey ? `${parentKey}[${key}]` : key);
		} else {
			const currentValue = value === null ? '' : value;
			const currentKey = parentKey ? `${parentKey}[${key}]` : key;
			formData.append(currentKey, currentValue);
		}
	});
	return formData;
}

const clearData = function(data, fileFields) {
	Object.entries(data).forEach(([key, value]) => {
		const isFile = value instanceof File;
		const isArray = Array.isArray(value);
		const isFileField = fileFields.includes(key);
		const isUndefined = value === undefined;
		const isNull = value === null;
		if (isArray && isFileField) {
			data[key] = data[key].filter((_v) => _v instanceof File )
		} else if (isUndefined || (isFileField && !isFile && !isNull)) {
			delete data[key];
		}
	});
	return data;
}

const checkIsHaveFile = function(data) {
	return Object.values(data).some(value => {
		if (Array.isArray(value)) {
			return value.some(_v => _v instanceof File);
		} else {
			return value instanceof File;
		}
	});
}


export {
	toFormData,
	clearData,
	checkIsHaveFile,
}
