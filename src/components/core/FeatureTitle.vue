<template>
  <div
    class="gap-4 mb-10 text-3xl md:text-4xl font-bold text-black"
    :class="alignClass"
  >
  <div class="grid grid-cols-1 md:grid-cols-5 gap-2">
    <component :is="`h${headingLevel}`" class="leading-tight md:text-right col-span-3">
      <span v-html="title" />
    </component>

    <!-- Animated Item -->
    <div class="relative h-[1.5em] overflow-hidden md:text-left col-span-2 mt-1">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="absolute top-0 left-0 w-full transition-all duration-500 ease-in-out"
        :class="{
          'opacity-0 translate-y-full z-0':
            index !== activeIndex && prevIndex !== index,
          'opacity-0 -translate-y-full z-10':
            prevIndex === index && index !== activeIndex,
          'opacity-100 translate-y-0 z-20': index === activeIndex,
        }"
      >
        {{ item }}
      </div>
    </div>
</div>
    <p
      v-if="description"
      :class="['text-sm md:text-lg my-4 text-gray-500', alignClass]"
    >
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    items?: string[];
    headingLevel?: number;
    description?: string;
    align?: "LEFT" | "CENTER" | "RIGHT";
  }>(),
  {
    items: () => [],
    align: "CENTER",
  }
);
const prevIndex = ref(-1);
const headingLevel = computed(() => {
  return props.headingLevel &&
    props.headingLevel >= 1 &&
    props.headingLevel <= 6
    ? props.headingLevel
    : 2;
});

const alignClass = computed(
  () =>
    ({
      LEFT: "text-left",
      CENTER: "text-center",
      RIGHT: "text-right",
    }[props.align] ?? "text-center")
);

const activeIndex = ref(0);
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    prevIndex.value = activeIndex.value;
    activeIndex.value = (activeIndex.value + 1) % props.items.length;
  }, 1500);
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.slide-cycle-enter-active,
.slide-cycle-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.slide-cycle-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-cycle-enter-to {
  opacity: 1;
  transform: translateY(0%);
}

.slide-cycle-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
.slide-cycle-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
