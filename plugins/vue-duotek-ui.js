import Vue from "vue";
import DuotekUi from "@duotek/ui";
import DuotekBackofficeUi from "@duotek/backoffice-ui";
import 'dayjs/locale/en';
import 'dayjs/locale/ru';

export default ({$config, app}, inject) => {
	Vue.use(DuotekUi, {
		DScrollBar: {
			bodyScrollBar: true,
		},
	});
	Vue.use(DuotekBackofficeUi, {
		DBStatusLabel: {
			variants: {
				PENDING: 'accent',
				ALLOWED: 'success',

				ACTIVE: 'success',
				COMPLETED: 'success',
				ERROR: 'danger',
				DECLINED: 'danger',
				DISABLED: 'danger',
				CANCELED: 'danger',
				REJECTED: 'danger',

				TRIAL: 'info',
				PAID_MONTH: 'accent',
				PAID_YEAR: 'accent',
				PAID_FOREVER: 'danger',

				SHARED: 'info',
				PUBLIC: 'accent',
				PRIVATE: 'success',
			}
		}
	});
	Vue.prototype.$dayjs.locale('ru');
	inject('dayjs', Vue.prototype.$dayjs);
}
