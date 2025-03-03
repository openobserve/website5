<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import { computed } from "vue";
import CustomCaseStudySwiper from "../blogs/CustomCaseStudySwiper.vue";

// Define the props for this component
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  heading: {
    type: Object,
    required: false,
  },
  primaryButton: {
    type: Object,
    default: () => ({
      text: "",
      link: "",
    }),
  },
});

// Transform the blog data for card display
const transformBlogData = (blog) => ({
  title: blog.title,
  description: blog.description,
  image: blog.image?.url || "",
  date: new Date(blog.publishDate).toLocaleDateString(),
  author: blog.authors?.[0]?.name || "Anonymous",
  slug: blog.slug,
});

// Computed property for transformed cards
const cards = computed(() => props.data.map((item) => transformBlogData(item)));

// Redirect function for clicking a card
const redirectToBlog = (slug) => {
  if (typeof window !== "undefined") {
    window.location.assign(`/blog/${slug}`); // Redirects to the blog's page
  }
};
</script>

<template>
  <section>
    <CustomSection>
      <div>
        <Heading
          :title="heading?.title"
          :description="heading?.subtitle"
          align="CENTER"
        />
      </div>

      <!-- Desktop View -->
      <div class="hidden md:block pt-[6vh] py-6 relative">
        <CustomImage
          image="/img/bg/gradient-bg/Ellipse-141.svg"
          altText="Background decoration"
          cssClass="absolute opacity-30 object-contain -z-10"
        />

        <div
          class="flex flex-row gap-3 justify-center container mx-auto h-full w-full cursor-pointer"
        >
          <!-- Featured (first) card -->
          <div v-if="cards.length > 0" class="w-full">
            <LeftSideCard
              :card="cards[0]"
              @click="redirectToBlog(cards[0].slug)"
            />
          </div>

          <!-- Remaining cards -->
          <div
            class="flex flex-col gap-3 justify-center items-center cursor-pointer w-full"
          >
            <RightSideCard
              v-for="(card, index) in cards.slice(1)"
              :key="card.slug || index"
              :card="card"
              @click="redirectToBlog(card.slug)"
            />
          </div>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="block md:hidden">
        <div class="flex flex-col space-y-3 mt-5">
          <!-- <LeftSideCard
          v-for="(card, index) in cards"
          :key="card.slug || index"
          :card="card"
          @click="redirectToBlog(card.slug)"
        /> -->
          <CustomCaseStudySwiper :sectionData="cards" />
        </div>
      </div>
      <div
        class="flex justify-center mt-6 mb-5"
        v-if="primaryButton && primaryButton.text && primaryButton.link"
      >
        <CustomButton
          variant="secondary"
          size="medium"
          :buttonText="primaryButton.text"
          :buttonLink="primaryButton.link"
        />
      </div>
    </CustomSection>
  </section>
</template>
