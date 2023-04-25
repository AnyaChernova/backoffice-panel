const pkg = require('./package');
const bodyParser = require('body-parser');
const DScrollBar = require('@duotek/ui/directives/DScrollBar/DScrollBar_ssr.js').default;
const isAnalyze = Boolean(process.env.NUXT_ANALYZE);
const isProd = process.env.NODE_ENV === 'production';

export default {
	ssr: !isAnalyze,
	modern: isProd,
	telemetry: false,
	components: false,
	features: {
		store: true,
		layouts: true,
		meta: true,
		middleware: true,
		asyncData: true,
		fetch: true,
		transitions: false,
		deprecations: false,
		validate: false,
		clientOnline: false,
		clientPrefetch: false,
		componentAliases: false,
		componentClientOnly: true,
	},
	render: {
		resourceHints: isProd,
		bundleRenderer: {
			directives: {
				...DScrollBar,
			},
		},
	},
	server: {
		host: process.env.NUXT_SERVER_HOST, // default: localhost,
		port: process.env.NUXT_SERVER_PORT, // default: 3000
	},
	env: {},
	publicRuntimeConfig: {
		isProd,
		app_env: {
			version: pkg.version,
			BASE_DOMAIN: process.env.BASE_DOMAIN,
			BASE_API_URL: process.env.BASE_API_URL,
			PUBLIC_API_URL: process.env.PUBLIC_API_URL,
		},
	},
	head: {
		meta: [],
		link: [],
		htmlAttrs: {
			class: '__bodyScrollBarEnable _DScrollBar-source init',
		},
	},
	css: [
		'@duotek/ui/assets/scss/style.scss',
		'@duotek/backoffice-ui/assets/scss/style.scss',
		'@/assets/scss/style.scss',
		'@/assets/scss/generated.scss',
	],
	serverMiddleware: [
		{path: '/api', handler: bodyParser.json()},
		{path: '/api', handler: bodyParser.urlencoded({extended: false})},
		{path: '/api', handler: '~/serverMiddleware/api-server.js'},
	],
	router: {
		linkActiveClass: 'active',
		linkExactActiveClass: 'activeExact',
	},
	plugins: [
		{src: '~/plugins/config-axios.js'},
		{src: '~/plugins/vue-duotek-ui.js'},
		{src: '~/services/index.js'},
		{src: '~/plugins/cookie.js'},
		{src: '~/plugins/utils.js'},
	],
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/proxy',
	],
	buildModules: [
		'@nuxtjs/pwa',
		'nuxt-purgecss',
	],
	purgeCSS: {
		content: [
			'components/**/*.vue',
			'pages/**/*.vue',
			'layouts/**/*.vue',
			'modals/**/*.vue',
			'drawers/**/*.vue',
			'node_modules/@duotek/backoffice-ui/**/*.js',
			'node_modules/@duotek/backoffice-ui/**/*.vue',
			'node_modules/@duotek/ui/**/*.js',
			'node_modules/@duotek/ui/**/*.vue'
		],
		whitelistPatternsChildren: [/_d/, /--/, /Vue-Toastification/],
	},
	pwa: {
		meta: {
			title: 'Backoffice panel',
			lang: 'ru',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			theme_color: '#2F80ED',
		},
		manifest: {
			name: 'Backoffice panel',
			lang: 'ru',
			useWebmanifestExtension: true,
		},
	},
	proxy: {
		'/storage': process.env.BASE_API_URL,
	},
	axios: {
		proxyHeaders: false,
		retry: false,
	},
	auth: {
		localStorage: false,
		plugins: [
			{src: '~/plugins/auth-callback.js', mode: 'client'},
		],
		cookie: {
			prefix: 'backoffice.dtk.',
			options: {
				expires: 300,
			},
		},
		redirect: {
			login: '/login',
			logout: '/login',
			home: false,
		},
		resetOnError: true,
		rewriteRedirects: true,
		fullPathRedirect: true,
		strategies: {
			localAuth: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: 'managers/self/login', method: 'post', propertyName: 'api_token'},
					logout: {url: 'managers/self/logout', method: 'post'},
					user: {url: 'managers/self/detail', method: 'get', propertyName: 'data'},
				},
			},
			recoverAuth: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: 'managers/self/recovery-update', method: 'post', propertyName: 'token'},
					logout: {url: 'managers/self/logout', method: 'post'},
					user: {url: 'managers/self/summary', method: 'get', propertyName: 'data'},
				},
			},
		},
	},
	build: {
		extractCSS: isProd,
		transpile: ['@duotek/backoffice-ui', '@duotek/ui', '@popperjs/core', 'autosize'],
		extend(config, ctx) {
		},
	},
};
