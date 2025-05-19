<template>
  <div
    :key="item.slug"
    class="flex flex-col overflow-hidden rounded-lg shadow-md"
  >
    <div class="relative h-48 overflow-hidden">
      <CustomBlurImage :image="getImageUrl(item)" :altText="item.title" />
      <div class="absolute top-3 right-3">
        <div
          class="bg-primary-purple text-white border-none rounded-full px-3 py-1 text-xs"
        >
          Openobserve
        </div>
      </div>
    </div>
    <!-- Content section -->

    <div class="bg-white p-6 flex-1 flex flex-col">
      <!-- <h3 class="text-lg font-semibold flex-grow mb-2">
        {{ item?.title }}
      </h3> -->
      <p class="text-primary-gray mb-3 text-base line-clamp-3">
        {{ item?.description }}
      </p>

      <div class="flex items-center mt-auto mb-6 gap-2" v-for="it in item.authors">
        <div
          class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold"
        >
          <img
            v-if="it?.image?.url"
            :src="it.image.url"
            :alt="it.name"
            class="h-full w-full object-cover"
          />
          <span v-else>{{ getInitials(it.name) }}</span>
        </div>
        <div>
          <p class="font-medium text-sm">{{ it.name }}</p>
          <p class="text-muted-foreground text-xs">{{ item.publishDate }}</p>
        </div>
      </div>
      <a
        :href="`/customer-stories/${item.slug}`"
        class="text-sm font-medium w-full text-center py-2 px-4 border border-gray-200 hover:bg-gray-50 rounded-md transition-colors duration-200 ease-in-out"
        >Read Case Study <span class="sr-only">about {{ item.title }}</span></a
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import { getInitials } from "@/utils/getInitials";
import CustomBlurImage from "../core/CustomBlurImage.vue";
const props = defineProps({
  item: {
    type: Object as () => CaseStudies,
    required: true,
  },
});
const getImageUrl = ({ image }: CaseStudies) =>
  image?.formats?.medium?.url ??
  image?.formats?.large?.url ??
  image?.formats?.small?.url ??
  image?.url ??
  "";
</script>
