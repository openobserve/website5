<template>
  <div class="info-card-container">
    <div class="info-card" v-for="(item, index) in cards" :key="index">
      <div class="icon-wrapper">
        <img :src="item.icon" :alt="item.title" class="icon" />
      </div>
      <div class="content">
        <h2 class="title text-[#E2E3E5] font-semibold text-[18px]">
          {{ item.title }}
        </h2>
        <p class="description text-[#BEC0C2] text-[14px]">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Container for the cards */
.info-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Exactly 3 cards per row */
  gap: 1.5rem; /* Space between cards */
  width: 100%; /* Full width */
  max-width: 1200px; /* Centered max width */
  margin: 0 auto; /* Center the container */
  padding: 2rem; /* Padding on the sides */
}

/* Individual card styles */
.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #000;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Icon wrapper */
.icon-wrapper {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #0ea5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

/* Icon image */
.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Card content */
.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Title styles */
.title {
  margin: 0;
}

/* Description styles */
.description {
  margin: 0;
  line-height: 1.5;
}
</style>
