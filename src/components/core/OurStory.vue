<template>
  <section id="our-story" class="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Title with horizontal lines -->
    <div class="flex items-center gap-4">
      <div class="h-px flex-1 bg-gray-200 "></div>
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl text-gray-900 whitespace-nowrap">
        {{ data.title }}
      </h2>
      <div class="h-px flex-1 bg-gray-200 "></div>
    </div>

    <!-- Content grid -->
    <div class="grid gap-8 md:grid-cols-2 items-center">
      <!-- Text content -->
      <div class="space-y-4 text-gray-600">
        <div class="text-lg" v-html="data.paragraphs"></div>
      </div>

      <!-- Image -->
      <div class="relative h-64 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img :src="data.image.src" :alt="data.image.alt" class="object-contain w-full h-full" loading="lazy" />
      </div>
    </div>

    <!-- Read more link -->
    <div class="flex justify-center pt-4">
      <a :href="data.link.url"
        class="inline-flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors font-medium">
        {{ data.link.text }}
        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: "Our Story",
      paragraphs: "OpenObserve was born from a simple yet powerful idea: observability should be accessible, efficient, and affordable for everyone.<br>Founded in 2022 by a team of engineers who experienced firsthand the challenges of managing observability at scale, we set out to build a solution that would dramatically reduce the cost and complexity of monitoring modern applications.<br>Our journey began with a clear mission: to create an open-source observability platform that delivers enterprise-grade features without the enterprise-grade price tag. Today, OpenObserve helps organizations of all sizes gain deeper insights into their systems while using up to 10x less storage and computing resources.",
      image: {
        src: "/img/logo.svg",
        alt: "OpenObserve founding team"
      },
      link: {
        text: "Read our full journey",
        url: "/blog/our-journey"
      }
    })
  }
});
</script>