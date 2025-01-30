<script setup lang="ts">
interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface BlogSectionData {
  sectionTitle: string;
  sectionDescription: string;
  recentPostsText: string;
  blogs: Blog[];
}

const props = defineProps({
  sectionData: {
    type: Object as () => BlogSectionData,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-white",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-gray-400",
    required: false,
  },
  cardBgColor: {
    type: String,
    default: "bg-[#2A2A2A]",
    required: false,
  },
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
    required: false,
  },
});
</script>

<template>
    <div class="min-h-screen">
      <div class="container mx-auto px-1">
        <div class="grid grid-rows-1 lg:grid-rows-2 gap-8">
          <a
            v-for="blog in sectionData.blogs"
            :key="blog.title"
            :href="blog.link"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              cardBgColor,
              'rounded-xl overflow-hidden transition-transform hover:scale-105 flex flex-rows md:flex-row',
            ]"
          >
            <!-- Left Side - Image -->
            <div class="w-full  h-48 md:h-auto relative">
              <img
                :src="blog.imageUrl"
                :alt="blog.title"
                class="w-full h-full object-cover absolute inset-0"
              />
            </div>
  
            <!-- Right Side - Content -->
            <div class="w-full p-6 flex flex-col justify-between">
              <div>
                <h3 :class="[titleTextColor, 'text-xl font-bold mb-3']">
                  {{ blog.title }}
                </h3>
                <p :class="[descriptionTextColor, 'mb-4 text-sm line-clamp-3']">
                  {{ blog.description }}
                </p>
              </div>
              <span
                :class="[linkColor, 'text-sm font-semibold hover:opacity-80 inline-block']"
              >
                LEARN MORE
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </template>
  
