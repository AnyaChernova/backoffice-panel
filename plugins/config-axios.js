function logger(response) {
	let log = {
		status: response.status,
		config: {
			url: response.config.url,
			method: response.config.method,
			params: response.config.params,
			headers: response.config.headers,
		},
		data: {
			message: response.data.message,
			error: response.data.error,
			errors: response.data.errors,
		},
	};
	console.log(`${new Date()}: `, JSON.stringify(log, null, 2));
}

export default function ({app, $axios, redirect, $config}) {
	$axios.defaults.baseURL = $config.app_env.BASE_API_URL;

	$axios.onError(({response}) => {
		if (process.server) {
			logger(response);
		} else {
			console.log(response);
		}
	})

	//перехватчик для принудительного логаута заблокированного менджера/администратора
	$axios.interceptors.response.use(null, (error) => {
		const code = error.response && error.response.status;
		//(2)если менеджер/администратор уже заблокирован, разлогинен, его юзер не существует, но логаут еще не завершен
		if (+code === 401 && app.$auth['401']) {
			//отправляем вместо ошибки пустой объект
			return Promise.resolve({});
		}
		//(1)если менеджер/администратор уже заблокирован, но залогинен и его юзер существует
		else if (+code === 401 && app.$auth.loggedIn && !!app.$auth.user) {
			//добавляем флаг, закрываем блок
			app.$auth['401'] = true;
			//запускаем логаут менеджера/админстратора
			app.$auth.logout().finally(() => {
				//снимаем флаг, когда логаут завершен
				app.$auth['401'] = false
			});
			//отправляем вместо ошибки пустой объект
			return Promise.resolve({});
		}
		//(3)если менеджер/администратор уже заблокирован, разлогинен, его юзер не существует, логаут уже завершен
		else if (+code === 401 && !app.$auth['401']) {
			//отправляем вместо ошибки пустой объект
			return Promise.resolve({});
		} else {
			//отправляем ошибку
			return Promise.reject(error);
		}
	})
}
