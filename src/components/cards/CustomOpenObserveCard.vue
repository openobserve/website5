<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  unifiedObservability: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  integrations: {
    type: Object,
    required: true,
  },
});

const hasUnifiedButton = computed(() => props.unifiedObservability?.buttonLink);
const hasIntegrationButton = computed(() => props.integrations?.buttonLink);
</script>

<template>
  <div class="flex flex-col items-center gap-6 w-full pb-10 px-6 lg:px-12 container mx-auto">
    <!-- Unified Observability Card -->
    <div class="w-full rounded-lg card">
      <a v-if="hasUnifiedButton" :href="props.unifiedObservability.buttonLink">
        <div class="card-content text-center">
          <h2 class="heading">{{ props.unifiedObservability.title }}</h2>
          <p class="description">{{ props.unifiedObservability.description }}</p>
          <div class="button-container" v-if="hasUnifiedButton">
            <a :href="props.unifiedObservability.buttonLink" class="button">
              {{ props.unifiedObservability.buttonText }}
            </a>
          </div>
        </div>
      </a>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div v-for="(item, index) in props.items" :key="index" class="card">
        <div class="card-content-without-hover text-center">
          <h2 class="heading">{{ item?.title }}</h2>
          <p class="description">{{ item?.description }}</p>
        </div>
      </div>
    </div>

    <!-- Integrations Card -->
    <div class="w-full">
      <a v-if="hasIntegrationButton" :href="props.integrations.buttonLink">
        <div class="card">
          <div class="card-content text-center">
            <h2 class="heading">{{ props.integrations.title }}</h2>
            <p class="description">{{ props.integrations.description }}</p>
            <div class="button-container" v-if="hasIntegrationButton">
              <a :href="props.integrations.buttonLink" class="button">
                {{ props.integrations.buttonText }}
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Card Styling */
.card {
  position: relative;
  padding: 0.0625rem;
  border: 1px solid #484c53;
  border-radius: 12px;
}

/* Inner Content */
.card-content,
.card-content-without-hover {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: rgb(19, 18, 25);
  border-radius: 10px;
  transition: background 0.3s ease-in-out;
  height: 100%;
}

.card:hover .card-content {
  background: rgba(31, 34, 37, 0.95);
}

.heading {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  padding: 0.5rem 0;
}

.description {
  font-size: 0.875rem;
  color: #BEC0C2;
  font-weight: medium;
  margin-top: 0.75rem;
}

.button-container {
  text-align: center;
}

.button {
  color: #1C99FF;
  font-size: 0.875rem;
  font-weight: bold;
  transition: color 0.3s;
}
</style>
