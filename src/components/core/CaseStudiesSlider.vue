<template>
  <div class="w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <!-- Image Section -->
      <div v-if="imageUrl" class="h-48 md:h-56 lg:h-64 overflow-hidden">
        <img :src="imageUrl" :alt="imageAlt" class="w-full h-full object-cover">
      </div>

      <!-- Content Section -->
      <div class="p-4 md:p-6">
        <!-- Title -->
        <h3 v-if="title" class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          {{ title }}
        </h3>

        <!-- Subtitle -->
        <h4 v-if="subtitle" class="text-md md:text-lg font-semibold text-gray-600 mb-3">
          {{ subtitle }}
        </h4>

        <!-- Body Content -->
        <p v-if="content" class="text-gray-700 mb-4">
          {{ content }}
        </p>

        <!-- Slot for additional content -->
        <div v-if="$slots.default" class="mt-4">
          <slot></slot>
        </div>

        <!-- Actions -->
        <div v-if="hasActions" class="flex flex-wrap gap-2 mt-4">
          <button v-for="(action, index) in actions" :key="index" @click="action.handler"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors" :class="[
              action.primary
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            ]">
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindCard',
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasActions() {
      return this.actions && this.actions.length > 0
    }
  }
}
</script>