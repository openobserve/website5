<script setup>
import { defineProps, computed } from "vue";
import Typing from "@dmncodes/vue-typing"; // Import the library

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <h1
    class="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold leading-[2.5rem] md:leading-[2.8rem] lg:leading-[3.3rem] xl:leading-[4.2rem]"
  >
    <Typing
      :text="text"
      :speed="100"
      :minTypeSpeed="50"
      :maxTypeSpeed="150"
      :eraseSpeed="100"
      :eraseDelay="1500"
      :writeDelay="0"
      caret="_"
      :loop="true"
    />
  </h1>
</template>
