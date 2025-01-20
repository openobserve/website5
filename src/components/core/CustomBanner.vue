<template>
  <div class="banner">
    <div class="content">
      <div class="">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <div class="buttons">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :class="button.styleClass"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomBanner",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Banner styles */
.banner {
  display: flex;
  background: url("/public/BG.svg") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 250px; /* Adjust as per the design */
  padding: 20px;
}

/* Content styles */
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff; /* Ensure readability on a gradient background */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); /* Subtle shadow for contrast */
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

/* Title styles */
.title {
  font-size: 2rem;
  font-weight: bold;
}

/* Subtitle styles */
.subtitle {
  font-size: 1.1rem;
  font-weight: 300;
}

/* Buttons container */
.buttons {
  align-items: center;
  text-align: center;
  color: #ffffff; /* Ensure readability on a gradient background */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); /* Subtle shadow for contrast */
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Button styles */
button {
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.primary-btn {
  background-color: #ffffff;
  color: #007bff;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.primary-btn:hover {
  background-color: #f0f0f0;
}

.secondary-btn {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .banner {
    height: auto;
    padding: 30px 20px;
  }

  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  button {
    font-size: 0.85rem;
    padding: 8px 18px;
  }
}
</style>
