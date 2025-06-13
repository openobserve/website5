<script setup>
import PastWebinarCard from "@/components/core/PastWebinarCard.vue";

const props = defineProps({
  pastWebinars: {
    type: Array,
    required: true
  },
  heading: {
    type: Object,
    default: "Past Webinars"
  },
  sourceKey: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section class="py-16 lg:py-20 bg-gray-50">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-11 mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ props?.heading?.title }} </h2>
        <p class="text-gray-600 text-lg">
          {{ props?.heading?.description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PastWebinarCard v-for="webinar in pastWebinars" :key="webinar.id" :webinar="webinar"
          :sourceKey="props.sourceKey" />
      </div>
    </div>
  </section>
</template>