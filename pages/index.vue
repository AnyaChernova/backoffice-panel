<template>
	<DBContent layout-present>

		<template #header>
			<div class="d-row text-center" v-focus>
				<BrandLogo large dark/>
			</div>
		</template>
		<div class="mt-xl"></div>
		<DCells justify-center gap="xl">
			<DCell span="10">
				<DCells justify-center gap="xl">
					<DCell span="4" v-for="(title, key) in dashboardTitle" :key="key">
						<DBStatCard
							class="w-full"
							:to="`/` + dashboardKeys[key]"
							:title="title"
							:main="dashboard[key].total"
							:second="`за день: ${dashboard[key].today}`"
							border
						/>
					</DCell>
				</DCells>
			</DCell>
		</DCells>

	</DBContent>
</template>

<script>
import BrandLogo from '@/components/Common/BrandLogo';

export default {
	name: 'PageSummary',
	scrollToTop: true,
	data() {
		return {
			dashboardTitle: {
				projects: 'Проекты',
				projects_on_moderation: 'Модерация',
				users: 'Пользователи',
				complaints: 'Жалобы',
			},
			dashboardKeys: {
				projects: 'projects',
				projects_on_moderation: 'moderation',
				users: 'users',
				complaints: 'complaints',
			},
		}
	},
	components: {BrandLogo},
	async asyncData({$api, error}) {
		try {
			return {
				dashboard: await $api.common.dashboard(),
			}
		} catch(e) {
			error({
				message: 'Упс',
			})
		}
	},

	methods: {},
	mounted() {}
};
</script>
