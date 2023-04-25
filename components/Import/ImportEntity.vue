<template>
	<DBEntity
		:isDrawer="isDrawer"
		:link="`/imports/${ entity.id }`"
		:caption="`Импорт #${ entity.id }`"
		:title="entity.type.title"
        :status="entity.state"
	>
        <DBSection title="Информация">
            <DCells gap="xl">
                <DCell span="12" v-if="entity.type_id">
                    <DBDataItem title="Тип задания" :content="entity.type.title"/>
                </DCell>
                <DCell span="6" v-if="entity.ident_id">
                    <DBDataItem title="Идентификатор матрицы" :content="entity.ident.title"/>
                </DCell>
                <DCell span="6" v-if="entity.number">
                    <DBDataItem title="Номер части файла" :content="entity.number"/>
                </DCell>
                <DCell span="6" v-if="entity.target_ident_first_id">
                    <DBDataItem title="Первая генерируемая матрица" :content="entity.target_ident_first.title"/>
                </DCell>
                <DCell span="6" v-if="entity.target_ident_second_id">
                    <DBDataItem title="Вторая генерируемая матрица" :content="entity.target_ident_second.title"/>
                </DCell>
                <DCell span="6" v-if="entity.quantity">
                    <DBDataItem title="Количество строк" :content="entity.quantity"/>
                </DCell>
                <DCell span="6" v-if="entity.processed">
                    <DBDataItem title="Количество обработанных строк" :content="entity.processed"/>
                </DCell>
                <DCell span="12" v-if="entity.total">
                    <DBDataItem title="Всего строк в файле" :content="entity.total"/>
                </DCell>
                 <DCell span="12" v-if="entity.state_id">
                    <DBDataItem title="Состояние загрузки" :content="entity.state.title"/>
                </DCell>
            </DCells>
        </DBSection>
	</DBEntity>
</template>

<script>
import BaseEntity from '@/components/Base/BaseEntity';

export default {
	name: 'ImportEntity',
	extends: BaseEntity,
	props: {},
	components: {},
	data() {
		return {
			entityResource: this.$api.import,
		};
	},
	computed: {},
	methods: {},
	mounted() {},
};
</script>