<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  pageTag: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: false,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <div class="w-full hero-image">
    <CustomSection>
      <div class="relative w-full h-full">
        <!-- ✅ Top image positioned inside section correctly -->
        <CustomImage class="top-overlay-image" :src="'/img/solution-aws/svgviewer-output\ \(5\).svg'"
          :alt="'Top Overlay'" />

        <div class="flex flex-col lg:flex-row items-center gap-6 relative z-10 py-16">
          <div
            class="w-full flex-1  mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <div class="w-fit flex items-center justify-center rounded-3xl bg-white/20 py-1 px-4">
              <h2 class="text-sm font-semibold text-black text-center capitalize">
                {{ pageTag }}
              </h2>
            </div>
            <h1 class="text-3xl lg:text-5xl font-bold text-black">
              {{ title }}
            </h1>
            <p class="lg:w-1/2 text-black text-base md:text-xl">
              {{ description }}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <CustomButton :variant="primaryButton.variant" size="medium" :buttonText="primaryButton.text"
                :buttonLink="primaryButton.link" />
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>


<style scoped>
.hero-image {
  background-image: url('/img/solution-aws/svgviewer-output (4).svg');
  /* ✅ remove `/public` */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ✅ Constrain top overlay image inside relative wrapper */
.top-overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

.hero-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero-image {
    min-height: 80vh;
  }
}
</style>