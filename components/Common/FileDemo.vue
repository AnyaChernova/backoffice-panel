<template>
	<div class="_FileDemo" v-if="fileData">
		<div class="d-inline-block text-center w-full" v-if="vertical">
			<div class="d-row-xxs">
				<div class="d-inline-block d-addon-wrap">
					<d-addon class="d-text-c-secondary uppercase mt-s" center>{{ fileData.type }}</d-addon>
					<d-icon name="file" size="60" weight="0.5"/>
				</div>
			</div>
			<div class="d-row-xxs">
				<div class="text-ellipsis">{{ fileData.name }}</div>
				<div class="d-text-c-secondary mt-xxs">{{ fileData.size }}</div>
			</div>
		</div>
		<d-media aside-align="center" v-else>
			<template #aside>
				<div class="d-inline-block d-addon-wrap">
					<d-addon class="d-text-c-secondary uppercase mt-s" center>{{ fileData.type }}</d-addon>
					<d-icon name="file" size="60" weight="0.5"/>
				</div>
			</template>
			<div class="pl-xs word-break">
				<a :href="fileData.link" class="d-link d-block text-ellipsis" download target="_blank">{{ fileData.name }}</a>
			</div>
		</d-media>
	</div>
</template>

<script>
export default {
	name: 'FileDemo',
	props: {
		file: {
			default: null,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
	},
	components: {},
	data() {
		return {
			isReady: false,
		};
	},
	computed: {
		dataFromBlob() {
			return {
				name: this.file.name,
				type: this.$dUtils.fileExtension(this.file?.name),
			}
		},
		dataFromObj() {
			return {
				name: this.file?.name,
				type: this.$dUtils.fileExtension(this.file?.file?.original || this.file?.file || ''),
				link: this.file.file?.original || this.file?.file || '',
			}
		},
		fileData() {
			if (!this.file) return null;
			if (this.isReady) {
				const isFile = this.file instanceof File;
				return isFile ? this.dataFromBlob : this.dataFromObj;
			}
		},
	},
	methods: {},
	mounted() {
		if (process.browser) {
			this.isReady = true;
		}
	},
};
</script>
