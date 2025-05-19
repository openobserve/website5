<template>
  <div
    class="gap-4 mb-16 text-3xl md:text-4xl font-bold text-black"
    :class="alignClass"
  >
    <component :is="`h${headingLevel}`" class="leading-tight">
      <span v-html="title" />
    </component>

    <!-- Animated Item -->
    <div class="relative h-[1.2em] overflow-hidden" v-if="items.length > 0">
      <transition name="slide-cycle" mode="out-in">
        <span :key="activeIndex" class="block absolute w-full">
          {{ items[activeIndex] }}
        </span>
      </transition>
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

console.log(props.items, "itwms for title");

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
    activeIndex.value = (activeIndex.value + 1) % props.items.length;
  }, 3000); // Every 3 seconds
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.slide-cycle-enter-active,
.slide-cycle-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

.slide-cycle-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-cycle-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-cycle-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-cycle-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

</style>
