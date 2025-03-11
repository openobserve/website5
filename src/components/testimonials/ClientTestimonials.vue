<template>
  <CustomSection>
    <div>
      <Heading
        :title="heading?.title"
        :description="heading?.subtitle"
        align="CENTER"
      />
    </div>
    <div
      ref="shoutoutContainer"
      class="shoutout-embed"
      :data-widgetTitle="widgetTitle"
      :data-widgetId="widgetId"
    ></div>
  </CustomSection>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Heading from "../core/Heading.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
});
const widgetTitle = "OpenObserve carousel";
const widgetId = "1b444ce5-e928-4826-8e4d-1117403b5d6a";
const shoutoutContainer = ref(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://shoutout.io/static/website/js/embed.js"; // Replace with the actual script URL
  script.defer = true;
  script.classList.add("shoutout-script"); // Adding class to script tag
  document.body.appendChild(script);
});
</script>
