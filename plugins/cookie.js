import CookieParser from "cookie";
import ClientCookie from "js-cookie";
// Плагин universal-cookie фризит ssr при cookie.set()

const setServerCookie = ({name, value, config, res}) => {
	let headers = res.getHeader('Set-Cookie') || []
	let expires = void(0);

	if (typeof headers === 'string') {
		headers = [headers]
	}

	if (config.expires && typeof config.expires !== 'object') {
		const date = new Date()
		expires = new Date(date.setDate(date.getDate() + config.expires));
	} else if (config.expires && typeof config.expires === 'object') {
		expires = config.expires;
	}

	const redirectCookie = CookieParser.serialize(name, value, {
		path: '/',
		...config,
		expires,
	});
	headers.push(redirectCookie);
	res.setHeader('Set-Cookie', headers);
};

const getServerCookie = ({req, name}) => {
	const cookies = req.headers && req.headers.cookie ? CookieParser.parse(req.headers.cookie) : {}
	return cookies[name]
};


const removeServerCookie = ({name, config, res}) => {
	const deleteConfig = {
		res,
		name,
		value: '_deleted_',
		config: {
			...config,
			expires: new Date(0),
		}
	};
	setServerCookie(deleteConfig);
};


export const $cookie = ({req, res, ctx}) => {
	return {
		get(name, config = {}) {
			if (process.client) {
				return ClientCookie.get(name, config)
			} else {
				return getServerCookie({req, name, config})
			}
		},
		set(name, value, config = {}) {
			if (process.client) {
				return ClientCookie.set(name, value, config)
			} else {
				return setServerCookie({name, value, config, ctx, res})
			}
		},
		remove(name, config = {}) {
			if (process.client) {
				return ClientCookie.remove(name, config)
			} else {
				removeServerCookie({name, config, res});
			}
		},
	}
}


export default function ({app, req, res}, inject) {
	inject('cookie', $cookie({req, res, ctx: app}));
}
