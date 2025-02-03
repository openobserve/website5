<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTabs from "../core/CustomTabs.vue";
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    heading: {
        type: Object,
        required: true,
    },
   
});

</script>
<template>
    <div class="container mx-auto relative flex justify-center w-full">
        <!-- Background image with lower z-index -->
        <div class="absolute w-full">
            <img 
                alt="Bottom decoration" 
                class="w-full h-full object-cover" 
                src="/img/bg/platform/glass-bg.svg" 
            />
        </div>
        
        <!-- Content with higher z-index -->
        <div class="relative">
            <div class="pt-6">
                <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
            </div>
            <CustomTabs class="py-10" :items="items" client:load />
        </div>
    </div>
</template>
