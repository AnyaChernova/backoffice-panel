<template>
	<DBBrowserSmall
		api-url="/projects/events/browse"
		:api-params="apiParams"
		local-mode
		disable-filters
		ref="browser"
	>
		<template #headerLeft>
			<div class="d-text-title-xs">Журнал событий проекта</div>
		</template>

		<template #dataRow="{item}">
			<td>
				<div class="mb-s">
					{{ item.type.title }}
					<span v-if="getEventName(item)">"{{ getEventName(item) }}"</span>
				</div>
				<UserDemo :user="item.user"/>
			</td>
			<td class="text-right ws-no-wrap">
				{{ $formatDate(item.created_at, item.created_at, 'DD MMMM YYYY') }}
			</td>
		</template>

	</DBBrowserSmall>
</template>

<script>
import BaseBrowserSmall from "@/components/Base/BaseBrowserSmall.vue";
import UserDemo from "@/components/User/UserDemo.vue";

export default {
	name: "ProjectEventBrowserSmall",
	extends: BaseBrowserSmall,
	props: {
		project: {
			type: Object,
			default: null,
		}
	},
	components: {UserDemo},
	data() {
		return {
			filters: {
				project_id: this.project?.id,
			},
		};
	},
	computed: {},
	methods: {
		getEventName(event) {
			if (event.link) return event.link.name;
			if (event.text) return event.text.name;
			if (event.media) return event.media.name;
			if (event.file) return event.file.name;
			if (event.discussion) return event.discussion.subject;
			if (event.test) return event.test.name;
			if (event.summary) return event.summary.name;
		},
	},
	created() {
	},
	mounted() {
	},
}
</script>
