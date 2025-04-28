<template>
  <section class="w-full bg-black text-white py-8 md:py-12">
    <div class="container mx-auto px-4 max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium">{{ block.fields.name }}</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :placeholder="`Your ${block.fields.name.toLowerCase()}`"
          />
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium">{{ block.fields.email }}</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium">{{ block.fields.phone }}</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            class="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div class="space-y-2">
          <label for="website" class="block text-sm font-medium">{{ block.fields.website }}</label>
          <input
            type="url"
            id="website"
            v-model="formData.website"
            class="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div class="space-y-2">
          <label for="message" class="block text-sm font-medium">{{ block.fields.message }}</label>
          <textarea
            id="message"
            v-model="formData.message"
            rows="5"
            class="w-full px-4 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about your project, questions, or requirements..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          {{ block.submitButton.text }}
        </button>

        <p class="text-xs text-gray-400 text-center mt-4">
          {{ block.privacyText }}
          <a :href="block.privacyLink.url" class="text-indigo-400 hover:underline">
            {{ block.privacyLink.text }}
          </a>.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ContactFormBlock } from '@/types/Contactus';

const props = defineProps<{
  block: ContactFormBlock;
}>();

const formData = ref({
  name: '',
  email: '',
  phone: '',
  website: '',
  message: '',
});

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Form submitted:', formData.value);
  // Reset form after submission
  formData.value = {
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  };
};
</script>