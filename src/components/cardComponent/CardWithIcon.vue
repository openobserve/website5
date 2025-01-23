<script setup>
import { defineProps } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  textColorOnHover:{
    type: String,
  }
});

</script>

<template>
  
  <div class=" group flex flex-col space-y-4 w-full h-full justify-center items-center text-center">
    <img :src="card.icon" alt="Icon" class="w-16 h-16 object-cover" />
    <h3 
      class="text-[#BEC0C2] text-base font-semibold group-hover transition-colors duration-100"
      :title="card.title"
    >
      {{ card.title }}
    </h3>
  </div>
</template>
