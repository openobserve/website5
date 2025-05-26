<script setup>
import CustomInterchange from "../core/CustomInterchange.vue";
import CustomSection from "../core/CustomSection.vue";
import { motion } from "motion-v";
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
      delay: 0.15,
    },
  },
};
</script>

<template>
  <div class="flex flex-col">
    <div>
      <!-- Each card tracks its own visibility -->
      <motion.div
        :initial="'hidden'"
        :whileInView="'visible'"
        :variants="itemVariants"
        :inViewOptions="{ once: true, amount: 0.1 }"
        v-for="(card, index) in items"
        :key="index"
        :class="index % 2 === 0 ? 'bg-gray-50' : ''"
      >
        <CustomSection>
          <CustomInterchange
            :heading="card.heading"
            :cardData="card.cardData"
            :items="card.items"
            :direction="card.direction || 'left'"
            :theme="card.theme"
            :id="card.id"
          />
        </CustomSection>
      </motion.div>
    </div>
  </div>
</template>
