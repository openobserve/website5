<template>
    <CustomSection>
        <div class="w-full">
            <HeadingSection :title="title" :description="description" align="center" />
            <CareerBenefits :benefits="items" />
        </div>
    </CustomSection>
</template>
<script setup lang="ts">
import CustomSection from '../core/CustomSection.vue';
import HeadingSection from '../core/HeadingSection.vue';
import CareerBenefits from './CareerBenefits.vue';
const props = defineProps({
    title: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    items: {
        type: Array,
        required: true,
    }
})
</script>
<style scoped></style>