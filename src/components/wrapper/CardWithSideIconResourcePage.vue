<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  btnValues: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    required: false,
  },
});
function getTag(card) {
  return card && card.button && card.button.link ? "a" : "div";
}

function getHref(card) {
  return card && card.button && card.button.link ? card.button.link : null;
}

function getTarget(card) {
  return card && card.button && card.button.target ? card.button.target : null;
}
</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!pb-0">
      <!-- Heading Section -->
      <HeadingSection
        :title="title"
        :description="description"
        align="center"
        v-if="title || description"
      />

      <!-- Card rendering based on activeTab -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-for="(card, index) in data" :key="index">
          <component
            :is="getTag(card)"
            :href="getHref(card)"
            :target="getTarget(card)"
            :class="['block',card.button?.link ? 'hover:shadow-xl transition duration-300 ease-in-out' : '']"
          >
            <CardWithSideIcon
              :title="card.title"
              :description="card.description"
              :icon="card.icon"
              :theme="card.theme"
              headingLevel="2"
              class="w-full"
            />
          </component>
        </template>
      </div>
    </CustomSection>
  </div>
</template>
