export const state = () => ({});

export const getters = {
	access(state, getters, rootState) {
		const user = rootState.auth.user;
		if (!user?.role?.role_access) return {};
		return user.role.role_access.reduce((acc, item) => {
			Object.defineProperty(acc, item.descriptor_id, {
				get: () => {
					if (getters.isSuperuser) return true;
					return Boolean(item.access)
				}
			})
			return acc;
		}, {});
	},
	isSuperuser(state, getters, rootState) {
		// TODO добавить добавить суперпользователя
		const user = rootState.auth.user;
		return Boolean(user);
	},
};

export const mutations = {};

export const actions = {};

