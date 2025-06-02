<template>
  <div
    v-if="items.length"
    class="grid grid-cols-1 lg:grid-cols-6 gap-6 w-full"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col p-6 border rounded-lg shadow relative"
      :class="[
        'col-span-2',
        item.container ?? '',
        items.length === 1 ? 'lg:col-span-6' : '',
        items.length === 2 ? 'lg:col-span-3' : '',
        item.cardTheme
      ]"
    >
      <!-- Badge -->
      <span
        v-if="item.badge"
        class="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-full"
        :class="item.theme"
      >
        {{ item.badge }}
      </span>

      <div class="flex flex-col justify-between items-start gap-2">
        <h2 class="text-lg lg:text-2xl font-bold">{{ item.title }}</h2>
        <p class="text-sm text-gray-600">{{ item.description }}</p>
      </div>

      <div class="mt-4" v-if="item?.price">
        <span class="text-3xl font-bold">{{ item.price }}</span>
        <span class="pl-1 font-medium text-sm text-gray-600">
          {{ item.period }}
        </span>
      </div>

      <ul class="space-y-1 mt-6 leading-snug">
        <li
          v-for="(feature, fIndex) in item.features"
          :key="fIndex"
          class="flex items-start gap-2 space-y-1.5"
        >
          <Check class="h-4 w-4 text-primary-green mt-1 shrink-0" />
          <span v-html="feature.title"></span>
        </li>
      </ul>

      <p
        v-if="item.bottomDescription"
        class="mt-4 text-sm text-gray-600"
      >
        {{ item.bottomDescription }}
      </p>

      <a
        :href="item.primaryButton.link"
        :target="item.primaryButton.target ?? '_self'"
        class="mt-auto"
      >
        <button
          :class="item.primaryButton.theme"
          class="mt-4 w-full py-2 rounded-md text-sm cursor-pointer theme-pricing"
        >
          {{ item.primaryButton.text }}
        </button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from "lucide-vue-next";

interface PricingFeature {
  title: string;
}

interface PricingButton {
  text: string;
  link: string;
  theme?: string;
  target?: string;
  class?: string;
}

interface PricingItem {
  title: string;
  description: string;
  bottomDescription?: string;
  price?: string;
  period?: string;
  additionalInfo?: string;
  features: PricingFeature[];
  primaryButton: PricingButton;
  container?: string;
  badge?: string;
  theme?: string;
  cardTheme?: string;
}

defineProps<{
  items: PricingItem[];
}>();
</script>

<style scoped>
.text {
  color: white;
}

.aspect-w-1 {
  aspect-ratio: 1 / 1;
}
</style>
