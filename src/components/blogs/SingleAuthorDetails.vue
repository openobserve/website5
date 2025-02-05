<script setup lang="ts">
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  author: {
    type: Array,
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
const redirectToAuthor = () => {
  if (props.author?.slug) {
    // console.log("Author Slug:", props.author.slug);
    window.location.assign(`author/${props.author.slug}`);
  }
};

</script>

<template>
  <section
    class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 w-full flex flex-col justify-start"
  >
    <p class="text-white px-2 py-2">About the Author</p>

    <div :class="[cardBgColor, 'rounded-xl overflow-hidden flex md:flex-row']">
      <!-- Left Side - Profile Image (Placeholder if not available) -->
      <div
        class="w-full md:w-1/6 h-40 md:h-auto relative flex items-center justify-center bg-gray-800"
      >
        <img
          v-if="author?.imageUrl"
          :src="author?.imageUrl"
          :alt="author?.name"
          class="w-full h-full object-cover absolute inset-0"
        />
        <div v-else class="text-white text-2xl font-bold">
          {{ author?.name }}
        </div>
      </div>

      <!-- Right Side - Content -->
      <div class="w-full md:w-2/3 p-6 h-40 flex flex-col justify-between">
        <div>
          <h3 :class="[titleTextColor, 'text-xl font-bold mb-3 underline']"  @click="redirectToAuthor">
            {{ author?.name }}
          </h3>
          <p
            class="mb-4 text-sm break-words line-clamp-3"
            :class="[descriptionTextColor]"
          >
            {{ author?.bio }}
          </p>
        </div>

        <!-- Social Links -->
        <!-- <div class="flex space-x-4">
          <a v-if="author.linkedInUrl" :href="author.linkedInUrl" target="_blank" :class="[linkColor, 'underline']">LinkedIn</a>
          <a v-if="author.twitterUrl" :href="author.twitterUrl" target="_blank" :class="[linkColor, 'underline']">Twitter</a>
        </div> -->
      </div>
    </div>
  </section>
</template>
