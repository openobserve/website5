<template>
  <div ref="sectionRef" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
        <HeadingSection :title="title" :description="description" align="CENTER" />
      <div class="w-full">
        <div class="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-0 bg-transparent gap-2">
          <button v-for="tab in tabs" :key="tab.value" @click="setActiveTab(tab.value)" :class="[
            'py-3 flex flex-col items-center gap-2 transition-colors rounded-lg cursor-pointer',
            activeTab === tab.value ? 'bg-primary-purple text-white' : 'text-gray-700 hover:bg-gray-100'
          ]">
            <img :src="tab.icon" :alt="tab.title+'icon'" class="h-5 w-5" />
            <span>{{ tab.title }}</span>
          </button>
        </div>

        <div class="mt-8">
          <div v-for="tab in tabs" :key="'content-' + tab.value" v-show="activeTab === tab.value">
            <div class="bg-white rounded-lg shadow">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2">{{ tab.card.title }}</h2>
                <p class="text-gray-600 mb-6">{{ tab.card.description }}</p>
                <div class="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p class="mb-4">{{ tab.card.content }}</p>
                    <ul class="space-y-2 mb-6">
                      <li v-for="(feature, index) in tab.card.features" :key="index" class="flex items-start">
                        <span class="bg-primary-purple text-white rounded-full p-1 mr-2 mt-0.5">
                          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                          </svg>
                        </span>
                        <span>{{ feature }}</span>
                      </li>
                    </ul>
                    <button
                      class="bg-primary-purple hover:bg-dark-purple text-white py-2 px-4 rounded transition-colors cursor-pointer">
                      {{ tab.card.buttonText }}
                    </button>
                  </div>
                  <div class="relative h-[300px] w-full rounded-lg overflow-hidden">
                    <img :src="tab.card.image" :alt="tab.card.title" class="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import HeadingSection from '../core/HeadingSection.vue'
import CustomSection from '../core/CustomSection.vue'
const props = defineProps({
  title: String,
  description: String,
  tabs: {
    type: Array,
    required: true
  },
  background: {
    type: Boolean,
    required: false
  }
})
const activeTab = ref('performance')
const autoRotate = ref(true)
const sectionRef = ref(null)
let interval = null

// Function to move to the next tab
const rotateToNextTab = () => {
  const currentIndex = tabs.findIndex(tab => tab.value === activeTab.value)
  const nextIndex = (currentIndex + 1) % tabs.length
  activeTab.value = tabs[nextIndex].value
}

const setActiveTab = (tabValue) => {
  activeTab.value = tabValue
  if (autoRotate.value) {
    autoRotate.value = false
  }
}

// Set up auto-rotation
onMounted(() => {
  if (autoRotate.value) {
    interval = setInterval(() => {
      rotateToNextTab()
    }, 3000)
  }

  const sectionElement = sectionRef.value
  if (sectionElement) {
    sectionElement.addEventListener('click', handleInteraction)
    sectionElement.addEventListener('touchstart', handleInteraction)
  }
})

// Stop auto-rotation when user interacts with the section
const handleInteraction = () => {
  if (autoRotate.value) {
    autoRotate.value = false
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
}

// Clean up
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }

  const sectionElement = sectionRef.value
  if (sectionElement) {
    sectionElement.removeEventListener('click', handleInteraction)
    sectionElement.removeEventListener('touchstart', handleInteraction)
  }
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>