<template>
  <section class="w-full py-12 md:py-24 bg-light-gray">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{{ title }}</h2>
          <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {{ description }}
          </p>
        </div>
      </div>

      <div class="mt-12">
        <div class="w-full">
          <div class="flex justify-center mb-8">
            <div class="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-2">
              <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                class="px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer" :class="{
                  'bg-white text-primary-purple shadow': activeTab === tab.value,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': activeTab !== tab.value
                }">
                {{ tab.label }}
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div v-for="tab in tabs" :key="tab.value">
              <div v-if="activeTab === tab.value" class="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div class="space-y-4">
                  <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                    :class="tab.badge.class">
                    {{ tab.badge.text }}
                  </span>
                  <h3 class="text-2xl font-bold">{{ tab.title }}</h3>
                  <p class="text-gray-500">
                    {{ tab.description }}
                  </p>
                  <ul class="space-y-2">
                    <li v-for="(feature, index) in tab.features" :key="index" class="flex items-center gap-2">
                      <CheckCircle class="h-5 w-5 text-primary-green" />
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                  <button
                    class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                    :class="tab.button.class">
                    {{ tab.button.text }}
                  </button>
                </div>
                <div class="flex justify-center">
                  <div class="relative h-[300px] w-full max-w-[500px]">
                    <img :src="tab.image?.url" :alt="tab.imageAlt"
                      class="object-contain rounded-lg shadow-lg w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
const props = defineProps({
  title: String,
  description: String,
  tabs: {
    type: Array,
    required: true
  }
})

const activeTab = ref('visibility')
</script>