<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
    pageTag: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    buttons: {
        type: Array as () => Array<{ text: string; link: string; variant: string }>,
        required: false,
        default: () => [],
    },
    image: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        required: false,
    }
});
</script>

<template>
    <div class="w-full hero-gradient">
        <CustomSection>
            <div class="flex flex-col lg:flex-row items-center gap-6">
                <div
                    class="w-full  flex-1 lg:w-1/2 mx-auto flex flex-col  items-center lg:items-start text-center lg:text-left space-y-5">
                    <div
                        class="w-fit flex items-center justify-center rounded-3xl bg-white/20 hover:bg-white/30 py-1 px-4">
                        <h2 class="text-sm font-semibold text-white text-center capitalize">{{ pageTag }}</h2>
                    </div>
                    <h1 class="text-3xl lg:text-5xl font-bold text-white">
                        {{ title }}
                    </h1>
                    <p class="text-white text-base md:text-xl">
                        {{ description }}
                    </p>
                    <!-- Button -->
                    <div v-if="buttons.length" class="flex flex-col sm:flex-row justify-center gap-4">
                        <CustomButton v-for="(button, index) in buttons" :key="index" :variant="button.variant"
                            size="medium" :buttonText="button.text" :buttonLink="button.link" />
                    </div>
                </div>
                <div class="w-full lg:w-1/2 h-full">
                    <CustomImage :image=image :altText=altText cssClass="rounded-lg" />
                </div>
            </div>
        </CustomSection>
    </div>
</template>