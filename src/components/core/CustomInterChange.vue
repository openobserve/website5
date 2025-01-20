<template>
  <div class="zigzag-container">
    <div class="zigzag-section" :class="sectionClasses">
      <div class="content-wrapper">
        <!-- Image Section -->
        <div class="image-container">
          <img :src="image" :alt="title" class="section-image" />
        </div>

        <!-- Text Content Section -->
        <div class="text-content">
          <!-- Title Slot or Fallback -->
          <slot name="title">
            <h2
              class="text-[#f4f4f5] mb-4 font-inter font-semibold text-[35px]"
            >
              {{ title }}
            </h2>
          </slot>

          <!-- Items Rendering -->
          <div v-if="items.length">
            <div v-for="(item, index) in items" :key="index" class="item">
              <h3 class="item-title font-inter font-semibold text-[17px]">
                {{ item.title }}
              </h3>
              <p class="item-description font-inter text-[14px]">
                {{ item.description }}
              </p>
            </div>
          </div>
          <!-- Fallback for Empty Items -->
          <div v-else>
            <p class="no-items font-inter text-[14px] text-gray-400">
              No items available.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "CustomInterChange",
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) => "title" in item && "description" in item);
      },
    },
    direction: {
      type: String,
      default: "left", // Default direction is left
      validator(value) {
        return ["left", "right"].includes(value); // Validate direction
      },
    },
  },
  setup(props) {
    // Computed class for the zigzag section
    const sectionClasses = computed(() => ({
      reverse: props.direction === "right",
    }));

    return {
      sectionClasses,
    };
  },
};
</script>

<style scoped>
/* Container Styles */
.zigzag-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Content Wrapper */
.content-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Reverse Direction */
.reverse .content-wrapper {
  flex-direction: row-reverse; /* Image will move to the right */
}

/* Image Container */
.image-container {
  flex: 1;
  min-width: 300px;
}

.section-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Text Content */
.text-content {
  flex: 1;
  padding: 2rem;
}

.item-title {
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.item-description {
  color: #dcdcdf;
  margin-bottom: 0.5rem;
}

.no-items {
  font-style: italic;
  margin-top: 1rem;
  color: #dcdcdf;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column !important;
    gap: 2rem;
  }

  .text-content {
    padding: 1rem 0;
  }

  .title {
    font-size: 1.5rem;
  }

  .item-title {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }
}
</style>
