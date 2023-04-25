module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: 'BACKOFFICE:STAGE',
			script: 'npm',
			args: 'start',
			watch: false,
			ignore_watch: ["./assets"],
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
			error_file: './logs/error.log',
			out_file: './logs/out.log',
			max_memory_restart: "750M",
		},
		{
			name: 'BACKOFFICE:PROD',
			script: 'npm',
			args: 'start',
			watch: false,
			ignore_watch: ["./assets"],
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
			error_file: './logs/error.log',
			out_file: './logs/out.log',
			max_memory_restart: "750M",
		}
	]
};
