import Vue from 'vue';
import IMask from 'imask';

export const $declOfNum = (n, titles) => {
	return titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
				? 1
				: 2
		];
};

export const $deleteEmptyFields = (object) => {
	const resultObject = {};
	Object.entries(object).forEach(([key, val]) => {
		if (val) {
			resultObject[key] = val;
		}
	});
	return resultObject;
};

// разбор ошибок из апи
export const $setFormErrors = ({response, formError}) => {
	const globalErrorStatusList = [409, 401, 403, 500];
	const globalMessage = response && response.data && (response.data.error || response.data.message);

	if (globalErrorStatusList.includes(response.status) && globalMessage) { // если статус 409, то там нет ошибок валидании, это общая ошибка формы
		formError.global = globalMessage;
	} else if (response.status === 422 && response.data && response.data.errors) { // если статус 422, то это ошибки валидации
		// Проход по всем полям с ошибками и добавление их в объект formError
		Object.keys(response.data.errors).forEach((key) => {
			const resFiled = response.data.errors[key];
			// текст ошибки должен быть в массиве
			if (Array.isArray(resFiled)) {
				// Имя ключа ошибки может относиться к вложенным данным, например 'field1.field2.field3' = ['текст ошибки']
				// разбиваем имя на массив по точке
				const keyArray = key.split('.');
				if (keyArray.length > 1) { // если ошибка со вложенными полями
					// проходимся по ключам имени
					keyArray.reduce((accumulator, currentValue, index, array) => {
						if (array.length === index + 1) {
							// на последнем уровне вложенности добавляем значение
							Vue.set(accumulator, currentValue, resFiled);
						} else if(!accumulator[currentValue] || Array.isArray(accumulator[currentValue]) || typeof accumulator[currentValue] !== 'object') {
							//иначе если ключа нет или он не объект то добавляем пустой объект
							Vue.set(accumulator, currentValue, {});
						}
						return accumulator[currentValue];
					}, formError.fields);
				} else { // если ошибка к одиночному полю
					Vue.set(formError.fields, key, resFiled);
				}
			} else {
				Vue.set(formError.fields, key, []);
			}
		})
	}
	return formError;
};

const resetField = (obj, field) => {
	if (!Array.isArray(obj[field]) && typeof obj[field] === 'object') {
		Object.keys(obj[field]).forEach((key) => {
			resetField(obj[field], key);
		});
	} else {
		Vue.set(obj, field, []);
	}
};

export const $resetFormErrors = ({formError}) => {
	formError.global = '';
	resetField(formError, 'fields');
	return formError;
};

export const $formatDate = (ctx) => (date, formatFrom = void (0), formatTo = 'DD.MM.YYYY') => {
	if (!date) return '-';
	const isTimestamp = typeof date === 'number';
	const dayjs = isTimestamp ? ctx.$dayjs.unix(date) : ctx.$dayjs(date, formatFrom);
	return dayjs.isValid() ? dayjs.format(formatTo) : '-';
};

export const $formatDateTime = (ctx) => (date, formatFrom = void (0), formatTo = 'DD.MM.YYYY') => {
	return $formatDate(ctx)(date, formatFrom, 'DD.MM.YYYY, HH:mm');
};

const maskPhone = (mask) => IMask.createMask({
	mask,
	unmask: true,
});

export const $formatPhone = (number = '', mask) => {
	const stringValue = String(number)
	const masked = maskPhone(mask).resolve(stringValue);
	return masked || stringValue;
};

const copy1 = (text) => {
	return navigator.clipboard.writeText(text);
}

// Fallback to old browser
const copy2 = (text) => {
	const input = document.createElement('input');
	input.value = text;
	input.setAttribute('style', 'position: fixed; top: 0; left: 0; opacity: 0;');
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	input.remove();
}

export const $copyToClipboard = async (text) => {
	try {
		navigator.clipboard && await copy1(text) || copy2(text);
	} catch (error) {
		console.error(error);
		throw Error('Ошибка копирования');
	}
}

export default (ctx, inject) => {
	inject('declOfNum', $declOfNum);
	inject('setFormErrors', $setFormErrors);
	inject('resetFormErrors', $resetFormErrors);
	inject('deleteEmptyFields', $deleteEmptyFields);
	inject('formatDate', $formatDate(ctx));
	inject('formatDateTime', $formatDateTime(ctx));
	inject('formatPhone', $formatPhone);
	inject('copyToClipboard', $copyToClipboard);
};
