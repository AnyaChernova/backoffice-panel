<template>
	<DBBrowser
		api-url="/feedback/browse"
		@clickRow="onClickRow"
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-s">Обратная связь</div>
		</template>

		<template #dataHead>
			<DBBrowserTh class="w-1px">ID</DBBrowserTh>
			<DBBrowserTh>Пользователь</DBBrowserTh>
			<DBBrowserTh>Тип обращения</DBBrowserTh>
			<DBBrowserTh>Откуда отправлена</DBBrowserTh>
			<DBBrowserTh class="w-1px ws-no-wrap" sort="created_at">Создана</DBBrowserTh>
		</template>

		<template #dataRow="{item}">
			<td>{{ item.id }}</td>
            <td>
				<UserDemo :user="item.user" v-if="item.user"/>
			</td>
            <td>
                <DLabel>{{ item.feedback_type.title }}</DLabel>
            </td>
            <td>
                <template v-if="item.url">
                    <a :href="item.url" target="_blank" class="link" @click.stop>
                        {{ item.url }}
                    </a>
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
import FeedbackEntity from '@/components/Feedback/FeedbackEntity';
import UserDemo from "../../components/User/UserDemo";

export default {
	name: 'PageFeedbackBrowser',
	extends: BasePageBrowser,
	entityComponent: FeedbackEntity,
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
