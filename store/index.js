export const state = () => ({
	matrixIdent: ''
});
export const getters = {};
export const mutations = {
	SET_MATRIX_IDENT(state, value) {
		state.matrixIdent = value
	},
};
export const actions = {
	async fetchAuthDictionaries({dispatch}) {
		return await Promise.all([
			// dispatch('definitions/updateDefinitions'),
		])
	},
	async nuxtServerInit({dispatch}) {
		if (Boolean(this.$auth.user)) {
			await dispatch('fetchAuthDictionaries');
		}
	},
};
