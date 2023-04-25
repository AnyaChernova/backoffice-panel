export default async function({app, store, redirect}) {

	let onLogin = async function() {
		console.log('onLogin');
		store.dispatch('fetchAuthDictionaries');
	};

	let onLogout = async function() {
		console.log('onLogout');
	};

	store.watch(state => state.auth.loggedIn, async (newValue) => {
		newValue ? await onLogin() : await onLogout();
	});

	if (Boolean(app.$auth.loggedIn)) {
		await onLogin();
	}
}
