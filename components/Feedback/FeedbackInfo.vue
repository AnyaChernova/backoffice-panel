<template>
	<DBSection title="Информация">

		<DCells gap="xl">
			<DCell span="12" v-if="feedback.user">
				<DBDataItem title="Пользователь">
					<UserDemo :user="feedback.user"/>
				</DBDataItem>
			</DCell>
            <DCell span="4">
				<DBDataItem title="Тип обратной связи">
					<DLabel>{{ feedback.feedback_type.title }}</DLabel>
				</DBDataItem>
			</DCell>
            <DCell span="8" v-if="feedback.message">
				<DBDataItem title="Сообщение" :content="feedback.message"/>
			</DCell>
            <DCell span="12" v-if="feedback.files.length">
				<DBDataItem title="Файлы">
                    <DCells>
                        <DCell
                            span="6"
                            v-for="file in feedback.files"
                            :key="file.id">
                            <FileDemo :file="file"/>
                        </DCell>
                    </DCells>
                    
                </DBDataItem>
			</DCell>
            <DCell span="6" v-if="feedback.url">
				<DBDataItem title="Откуда отправлена">
                     <a :href="feedback.url" target="_blank" class="link">
                        {{ feedback.url }}
                    </a>
                </DBDataItem>
			</DCell>
            <DCell span="6">
				<DBDataItem title="Дата создания" :content="$formatDate(feedback.created_at)"/>
			</DCell>
		</DCells>

	</DBSection>
</template>

<script>
import UserDemo from "../User/UserDemo";
import FileDemo from "../Common/FileDemo";

export default {
	name: 'FeedbackInfo',
	props: {
		feedback: {
			type: Object,
			default: () => ({}),
		},
	},
	components: {UserDemo, FileDemo},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>