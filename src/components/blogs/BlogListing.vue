<script setup lang="ts">
interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  slug: string;
  slug: string;
}
const props = defineProps({
  sectionData: {
    type: Array as () => Blog[], // Correctly typed array of Blog objects
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-white",
  },
  descriptionTextColor: {
    type: String,
    default: "text-gray-400",
  },
  cardBgColor: {
    type: String,
    default: "bg-[#2A2A2A]",
  },
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
  },
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
          :href="`/blog/${blog.slug}`"
          rel="noopener noreferrer"
          :class="[
            cardBgColor,
            'flex flex-col rounded-xl overflow-hidden transition-transform h-[400px]',
          ]"
        >

          <div class="h-48 w-full flex-shrink-0">
            {{ console.log(blog.image.formats,"blog.imageUrl") }}
            <img
              :src="blog.imageUrl || blog.image.url || ''"
              :alt="blog.title"
              class="w-full h-full object-center object-cover" 
            />
          </div>
          <div class="flex flex-col flex-grow p-6">
            <h3 :class="[titleTextColor, 'text-xl font-bold mb-2 line-clamp-2']">
              {{ blog.title }}
            </h3>
            <p :class="[descriptionTextColor, 'mb-4 text-sm line-clamp-3 flex-grow']">
              {{ blog.description }}
            </p>
            <!-- <a :class="[linkColor, 'text-sm font-semibold hover:opacity-80 mt-auto']" :href="`/blogs/${blog.slug}`">
              LEARN MORE
            </a> -->
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
