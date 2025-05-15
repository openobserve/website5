<template>
  <div
    v-if="activeTabData"
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-6 w-full"
  >
    <div
      v-for="(item, index) in activeTabData.items"
      :key="index"
      class="flex flex-col p-6 border rounded-lg shadow relative"
      :class="[
        'col-span-2',
        item.container ?? '',
        item.container ?? '',
        activeTabData.items.length === 1 ? 'lg:col-span-6' : '',
        activeTabData.items.length === 2 ? 'lg:col-span-3' : '',
      ]"
    >
      <!-- Badge positioned at the top-right -->
      <span
        v-if="item.badge"
        class="absolute -top-3 left-1/2  -translate-x-1/2 lg:left-1/2 text-xs px-2 py-1 rounded-full"
        :class="item.theme"
      >
        {{ item.badge }}
      </span>
      <div class="flex flex-col justify-between items-start gap-2">
        <h3 class="text-lg lg:text-2xl font-bold">{{ item.title }}</h3>
        <p class="text-sm text-gray-600">{{ item.description }}</p>
      </div>
      <div class="mt-4" v-if="item?.price">
        <span class="text-3xl font-bold">{{ item.price }}</span>
        <span class="pl-1 font-medium text-sm text-gray-600">{{
          item.period
        }}</span>
      </div>
      <ul class="space-y-1 mt-6 leading-snug">
        <li
          v-for="(feature, fIndex) in item.features"
          :key="fIndex"
          class="flex items-start gap-2 space-y-1.5"
        >
          <Check class="h-4 w-4 text-primary-green mt-1 shrink-0" />
          <span>{{ feature }}</span>
        </li>
      </ul>
      <p v-if="item.additionalInfo" class="mt-4 text-sm text-gray-600">{{ item.additionalInfo }}</p>
      <a :href="item.button.link" :target="item.button.target ?? '_self'" class="mt-auto">
        <button
          :class="item.button.class"
          class="mt-4 w-full py-2 rounded-lg text-sm cursor-pointer"
        >
          {{ item.button.text }}
        </button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { Check } from "lucide-vue-next";
import { computed } from "vue";
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});
const activeTabData = computed(() =>
  props.tabs.find((tab) => tab.value === props.activeTab)
);
</script>

<style scoped>
.text {
  color: white;
  /* Replace with your primary green color */
}

/* Ensure consistent aspect ratio for images */
.aspect-w-1 {
  aspect-ratio: 1 / 1;
}
</style>
