<template>
	<DBBrowser
		api-url="/complaints/browse"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Жалобы</div>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh class="w-1px"></DBBrowserTh>
			<DBBrowserTh>Пользователь</DBBrowserTh>
			<DBBrowserTh>Тип жалобы</DBBrowserTh>
			<DBBrowserTh>Контент</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap" sort="created_at">Создана</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
			<td>
				<DBStatusLabel :status="item.status"/>
			</td>
			<td>
				<UserDemo :user="item.base.user" v-if="item.base"/>
			</td>
			<td>
				<DLabel>{{ item.type.title }}</DLabel>
			</td>
			<td>
				<template v-if="item.base">
					{{ item.base.subject || item.base.message }}
				</template>
			</td>
			<td class="text-right">
				{{ $formatDate(item.created_at) }}
			</td>
		</template>

	</DBBrowser>
</template>

<script>

import BasePageBrowser from '@/components/Base/BasePageBrowser';
import ComplaintEntity from '@/components/Complaint/ComplaintEntity';
import UserDemo from "../../components/User/UserDemo";

export default {
	name: 'PageComplaintBrowser',
	extends: BasePageBrowser,
	entityComponent: ComplaintEntity,
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
