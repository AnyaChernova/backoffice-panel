<template>
	<DBContent>
		<template #asideContent>
			<d-list gap-y="xl">
				<d-list-item>
					<d-list gap="xl">
						<d-list-item hold class="d-text-title-xxs">Справочники</d-list-item>
						<d-list-item>
							<nuxt-link to="/settings/languages" active-class="d-text-c-primary" class="d-link d-text-c-main">Языки</nuxt-link>
						</d-list-item>
						<d-list-item>
							<nuxt-link to="/settings/subjects" active-class="d-text-c-primary" class="d-link d-text-c-main">Тематики</nuxt-link>
						</d-list-item>
					</d-list>
				</d-list-item>
			</d-list>
		</template>
		<div class="p-xl">
			<LanguageBrowserSmall/>
		</div>
	</DBContent>
</template>

<script>

import LanguageBrowserSmall from "@/components/Language/LanguageBrowserSmall";
export default {
	name: 'PageLanguageBrowser',
	props: {},
	components: {LanguageBrowserSmall},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>
