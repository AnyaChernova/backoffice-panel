<template>
	<DBBrowser
		api-url="/users/browse"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Пользователи</div>
		</template>

		<template #headerRight>
			<UiButtonPlus small @click="onClickCreate">Добавить</UiButtonPlus>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh>Клиент</DBBrowserTh>
			<DBBrowserTh class="w-1px">Проекты</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap text-right" sort="last_used_at">Последний вход</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap text-right" sort="last_active_at">Последняя активность</DBBrowserTh>
			<DBBrowserTh class="w-1px">Доступ</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap text-right" sort="created_at">Дата регистрации</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<UserDemo :user="item"/>
			</td>
			<td>{{ item.project_counter }}</td>
			<td class="text-right">
				{{ $formatDate(item.last_used_at) }}
			</td>
			<td class="text-right">
				{{ $formatDate(item.last_active_at) }}
			</td>
			<td>
				<DIcon class="d-text-c-danger" name="x-circle" v-if="item.is_disabled"/>
				<DIcon class="d-text-c-success" name="check-circle" v-else/>
			</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
		</template>

	</DBBrowser>
</template>

<script>
import BasePageBrowser from '@/components/Base/BasePageBrowser';
import UserDemo from '@/components/User/UserDemo';
import UserEntity from '@/components/User/UserEntity';

export default {
	name: 'PageUserBrowser',
	extends: BasePageBrowser,
	entityComponent: UserEntity,
	props: {},
	components: {UserDemo},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>
