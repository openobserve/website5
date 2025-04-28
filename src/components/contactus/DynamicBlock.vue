<template>
  <component :is="blockComponent" :block="block" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

// import CommunitySupport from './CommunitySupport.vue';
import BlogSection from './BlogSection.vue';
import type { ContentBlock } from '@/types/Contactus';
import ContactUsHeroSection from './ContactUsHeroSection.vue';
import ContactForm from '@/components/forms/ContactForm.vue';
const props = defineProps<{
  block: ContentBlock;
}>();

const blockComponent = computed(() => {
  switch (props.block.type) {
    case 'hero':
      return ContactUsHeroSection;
    case 'contactForm':
      return ContactForm;
    // case 'communitySupport':
    //   return CommunitySupport;
    case 'blogSection':
      return BlogSection;
    default:
      console.warn(`Unknown block type: ${props.block.type}`);
      return 'div'; // Fallback to a div if type is unknown
  }
});
</script>