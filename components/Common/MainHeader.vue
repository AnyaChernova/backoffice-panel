<template>
	<DBHeader class="_MainHeader" dark>

		<template #left>
			<BrandLogo link/>
		</template>

		<template #center>
			<DBHeaderButton exact to="/">Сводка</DBHeaderButton>
			<DBMenuDropdown tag="DBHeaderButton" content="Проекты">
				<DBMenuItem to="/projects">Все проекты</DBMenuItem>
				<DBMenuItem to="/moderation">Модерация</DBMenuItem>
			</DBMenuDropdown>
			<DBMenuDropdown tag="DBHeaderButton" content="Пользователи">
				<DBMenuItem to="/users">Каталог пользователей</DBMenuItem>
				<DBMenuItem to="/complaints">Жалобы</DBMenuItem>
				<DBMenuItem to="/feedback">Обратная связь</DBMenuItem>
			</DBMenuDropdown>
			<DBHeaderButton to="/matrix">Матрица</DBHeaderButton>
		</template>

		<template #right>

			<DBMenuDropdown tag="DBHeaderButton" to="/settings" icon="settings" stop>
				<DBMenuItem to="/settings/managers" icon="user">Сотрудники</DBMenuItem>
				<DBMenuItem to="/settings/languages" icon="globe">Языки</DBMenuItem>
				<DBMenuItem to="/settings/subjects" icon="feather">Тематики</DBMenuItem>
			</DBMenuDropdown>

			<DBMenuDropdown tag="DBHeaderButton">
				<template #content>
					<AdminDemo :admin="$auth.user"/>
				</template>

				<DBMenuItem icon="log-out" @click="onClickLogout">Выйти</DBMenuItem>
			</DBMenuDropdown>
		</template>
	</DBHeader>
</template>

<script>
import BrandLogo from '@/components/Common/BrandLogo';
import AdminDemo from '~/components/Admin/AdminDemo';
import {mapGetters} from 'vuex';

export default {
	name: 'MainHeader',
	props: {},
	components: {
		AdminDemo,
		BrandLogo,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('permission', {
			access: 'access',
		})
	},
	methods: {
		onClickLogout() {
			this.$auth.logout();
		},
	},
	mounted() {},
};
</script>
