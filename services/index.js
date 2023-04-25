import createApi from './api';

export const $api = ($axios) => createApi($axios);

export default function(ctx, inject) {
	inject('api', $api(ctx))
}
