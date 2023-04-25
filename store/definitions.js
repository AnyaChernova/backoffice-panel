const arr2Obj = (array = []) => {
	return array.reduce((res, item) => {
		res[item.id] = item;
		return res;
	}, {})
}

export const state = () => ({});

export const getters = {};

export const mutations = {
	SET_DEFINITIONS(state, payload) {
		for (const stateItem in state) {
			if (state.hasOwnProperty(stateItem) && payload[stateItem]) {
				if ((typeof state[stateItem] === typeof payload[stateItem]) && (Array.isArray(state[stateItem]) === Array.isArray(payload[stateItem]))) {
					state[stateItem] = payload[stateItem];
				} else {
					if (Array.isArray(state[stateItem]) !== Array.isArray(payload[stateItem])) {
						console.error(`typeof state.${stateItem}(isArray: ${Array.isArray(state[stateItem])}) != typeof payload.${stateItem}(isArray: ${Array.isArray(payload[stateItem])})`)
					} else if (typeof state[stateItem] !== typeof payload[stateItem]) {
						console.error(`typeof state.${stateItem}(${typeof state[stateItem]}) != typeof payload.${stateItem}(${typeof payload[stateItem]})`)
					}
				}
			}
		}
	},
};

export const actions = {
	async updateDefinitions({commit}) {
		return this.$api.common.definitions().then((data) => {
			commit('SET_DEFINITIONS', data)
		}).catch(() => false);
	},
};
