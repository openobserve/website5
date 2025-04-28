<template>
  <div class="container mx-auto px-4 py-12 md:py-16 max-w-4xl -mt-24 mb-16">
    <div class="bg-light-gray dark:bg-card rounded-lg shadow-lg p-6 md:p-8">
      <template v-if="status.submitted">
        <div class="text-center py-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-green/20 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-green" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Message Sent!</h3>
          <p class="text-primary-gray mb-6">{{ status.message }}</p>
          <button @click="resetForm"
            class="bg-primary-purple hover:bg-dark-purple text-white px-4 py-2 rounded-md transition-colors">
            Send Another Message
          </button>
        </div>
      </template>
      <template v-else>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="name" class="text-sm font-medium">Name</label>
              <input id="name" v-model="formData.name" type="text" placeholder="Your name" required
                class="mt-1 w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent bg-white" />
            </div>

            <div>
              <label for="email" class="text-sm font-medium">Email Address</label>
              <input id="email" v-model="formData.email" type="email" placeholder="your.email@example.com" required
                class="mt-1 w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent bg-white" />
            </div>

            <div>
              <label for="phone" class="text-sm font-medium">Phone Number</label>
              <input id="phone" v-model="formData.phone" type="tel" placeholder="+1 (555) 123-4567"
                class="mt-1 w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent bg-white" />
            </div>

            <div>
              <label for="website" class="text-sm font-medium">Website</label>
              <input id="website" v-model="formData.website" type="url" placeholder="https://yourwebsite.com"
                class="mt-1 w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent bg-white" />
            </div>

            <div>
              <label for="message" class="text-sm font-medium">How Can We Help You?</label>
              <textarea id="message" v-model="formData.message"
                placeholder="Tell us about your project, questions, or requirements..." required
                class="mt-1 w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent bg-white min-h-[120px]" />
            </div>
          </div>

          <div v-if="status.error"
            class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
            {{ status.message }}
          </div>

          <button type="submit" :disabled="status.submitting"
            class="w-full bg-primary-purple hover:bg-dark-purple text-white px-4 py-2 rounded-md transition-colors disabled:opacity-70">
            {{ status.submitting ? 'Sending...' : 'Send Message' }}
          </button>

          <p class="text-xs text-center text-muted-foreground mt-4">
            By submitting this form, you agree to our
            <a href="/privacy-policy" class="underline hover:text-primary-purple">Privacy Policy</a>.
          </p>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  website: '',
  message: '',
})

const status = ref({
  submitted: false,
  submitting: false,
  error: false,
  message: '',
})

const handleSubmit = async () => {
  status.value = { submitted: false, submitting: true, error: false, message: '' }

  try {
    // Replace with your actual form submission logic
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call

    status.value = {
      submitted: true,
      submitting: false,
      error: false,
      message: 'Thank you! Your message has been sent successfully.',
    }

    formData.value = {
      name: '',
      email: '',
      phone: '',
      website: '',
      message: '',
    }
  } catch (error) {
    status.value = {
      submitted: false,
      submitting: false,
      error: true,
      message: 'Oops! Something went wrong. Please try again later.',
    }
  }
}

const resetForm = () => {
  status.value = { submitted: false, submitting: false, error: false, message: '' }
}
</script>