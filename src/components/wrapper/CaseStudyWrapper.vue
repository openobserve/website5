<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import { computed } from 'vue';

// Define the props for this component
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  },
  primaryButton: {
    type: Object,
    default: () => ({
      text: "",
      link: ""
    })
  }
});

// Transform the blog data for card display
const transformBlogData = (blog) => ({
  title: blog.title,
  description: blog.description,
  image: blog.image?.url || "",
  date: new Date(blog.publishDate).toLocaleDateString(),
  author: blog.authors?.[0]?.name || "Anonymous",
  slug: blog.slug
});

// Computed property for transformed cards
const cards = computed(() => 
  props.data.map(item => transformBlogData(item))
);

// Redirect function for clicking a card
const redirectToBlog = (slug) => {
  if (typeof window !== "undefined") {
    window.location.assign(`/blog/${slug}`); // Redirects to the blog's page
  }
};

</script>

<template>
  <CustomSection>
    <Heading :title="title" :description="subtitle" align="CENTER" />
    
    <!-- Desktop View -->
    <div class="hidden md:block py-10 relative">
      <CustomImage 
        image="/Platform/Ellipse-141.svg" 
        altText="Background decoration" 
        cssClass="absolute opacity-30 object-contain" 
      />
      
      <div class="flex flex-row gap-3 justify-center container mx-auto pt-3 h-full w-full">
        <!-- Featured (first) card -->
        <div v-if="cards.length > 0">
          <LeftSideCard 
            :card="cards[0]"  
            @click="redirectToBlog(cards[0].slug)"
          />
        </div>
        
        <!-- Remaining cards -->
        <div class="flex flex-col gap-3 justify-center items-center h-full">
          <RightSideCard
            v-for="(card, index) in cards.slice(1)"
            :key="card.slug || index"
            :card="card"
            @click="redirectToBlog(card.slug)"
          />
        </div>
      </div>
    </div> -->
   
    <!-- Mobile View -->
    <!-- <div class="block md:hidden">
      <div class="flex flex-col space-y-3">
        <LeftSideCard
          v-for="(card, index) in cards"
          :key="card.slug || index"
          :card="card"
          @click="redirectToBlog(card.slug)"
        />
      </div>
    </div> -->

    <div class="flex justify-center mt-8">
      <CustomButton 
        v-if="primaryButton.text"
        variant="secondary" 
        size="medium" 
        :buttonText="primaryButton.text" 
        :buttonLink="primaryButton.link" 
      />
    </div>
  </CustomSection>
</template>
