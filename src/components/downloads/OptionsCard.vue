<template>
  <div class="w-full">
    <div v-for="tab in tabs" :key="tab.value" :class="[' w-full h-full gap-6',`grid-cols-1 grid`]">
      <div
        v-if="activeTab === tab.value"
        v-for="(item, index) in tab.items"
        :key="index"
        class="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center border rounded-lg p-4 h-full"
      >
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">{{ item?.title }}</h3>
          <p class="text-gray-500" v-html="item?.description" />
          
          <ul class="space-y-2" v-if="item?.features?.length">
            <li
              v-for="(feature, idx) in item.features"
              :key="idx"
              class="flex items-center gap-2"
            >
              <Check class="h-5 w-5 text-primary-purple" />
              <span>{{ feature }}</span>
            </li>
          </ul>

          <p
            class="text-gray-500"
            v-if="item?.additionalInfo"
            v-html="item?.additionalInfo"
          ></p>

          <a
            v-if="item?.button?.text && item?.button?.link"
            :href="item.button.link"
            :target="item.button.target || '_self'"
          >
            <button
              class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors w-full"
              :class="item.button.class"
            >
              {{ item.button.text }}
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { Check } from "lucide-vue-next";

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
