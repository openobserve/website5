<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-6">
        <a href="/" class="flex items-center">
          <img
            src="/images/openobserve-logo.png"
            alt="OpenObserve Logo"
            width="180"
            height="40"
            class="h-8 w-auto"
          />
        </a>

        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.link"
            class="text-sm font-medium transition-colors hover:text-primary-blue"
          >
            {{ item.title }}
          </a>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-2 border rounded-full px-3 py-1">
          <svg
            class="h-4 w-4 text-primary-blue"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span class="text-sm font-medium">14,777</span>
        </div>
        <button class="hidden md:inline-flex border rounded px-4 py-1 text-sm">
          Log in
        </button>
        <button class="bg-primary-purple hover:bg-dark-purple text-white px-4 py-1 rounded text-sm">
          Get Demo
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data : {
    type: Object,
  }
})

const navItems = computed(() => {
  return props?.data?.data?.navItems
});
</script>
