<template>
  <a :href="`/customer-stories/${item.slug}`" class="w-full border hover:border-primary-purple rounded-lg transistion-colors duration-300 ease-in-out">
    <div
      :key="item.slug"
      class="flex flex-col overflow-hidden rounded-lg shadow-md h-full"
    >
      <div class="relative h-48 overflow-hidden">
        <CustomBlurImage :image="getImageUrl(item)" :altText="item.title" />
      </div>
      <!-- Content section -->

      <div class="bg-white p-6 flex-1 flex flex-col">
        <component
          :is="`h${headingLevel}`"
          class="text-lg font-semibold flex-grow mb-2"
        >
          {{ item?.title }}
        </component>
        <p class="text-primary-gray mb-3 text-base">
          {{ item?.description?.slice(0, 200)
          }}<span v-if="item?.description?.length > 200">...</span>
        </p>

        <!-- <div class="flex items-center mt-auto mb-6 gap-2" v-for="it in item.authors">
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
      </div> -->
      </div>
    </div>
  </a>
</template>
<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import { getInitials } from "@/utils/getInitials";
import { computed } from "vue";
import CustomBlurImage from "../core/CustomBlurImage.vue";
const props = defineProps({
  item: {
    type: Object as () => CaseStudies,
    required: true,
  },
  headingLevel: {
    type: Number,
    required: false,
  },
});

const headingLevel = computed(() => {
  return props.headingLevel &&
    props.headingLevel >= 1 &&
    props.headingLevel <= 6
    ? props.headingLevel
    : 3;
});

const getImageUrl = ({ image }: CaseStudies) =>
  image?.formats?.medium?.url ??
  image?.formats?.large?.url ??
  image?.formats?.small?.url ??
  image?.url ??
  "";
</script>
