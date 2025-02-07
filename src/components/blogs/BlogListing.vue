<script setup lang="ts">

interface Blog {
  title: string;
  description: string;
  image: {
    url: string;
  };
  slug: string;
}

const props = defineProps({
  sectionData: {
    type: Array as () => Blog[],
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
        <a v-for="blog in sectionData" :key="blog.title" :href="`/blog/${blog.slug}`" rel="noopener noreferrer" :class="[
          cardBgColor,
          'flex flex-col rounded-xl overflow-hidden transition-transform h-[400px]',
        ]">
          <!-- Left Side - Image -->
          <div class="h-48 w-full flex-shrink-0"> <img :src="blog.image?.url || ''" :alt="blog.title"
              class="w-full h-full object-center object-cover" />
          </div>

          <!-- Right Side - Content -->
          <div class="w-full p-6 flex flex-col justify-between">
            <div>
              <h6 :class="[titleTextColor, 'text-md font-bold mb-3']">
                {{ blog.title }}
              </h6>
              <p :class="[descriptionTextColor, 'mb-2 text-sm line-clamp-2']">
                {{ blog.description }}
              </p>
            </div>
            <span :class="[linkColor, 'text-sm font-semibold hover:opacity-80 inline-block']">
              LEARN MORE
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>