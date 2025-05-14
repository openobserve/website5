<template>
    <div class="">
      <template v-if="status.submitted">
        <div class="contact-form-success">
          <div class="contact-form-success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="contact-form-success-title">Message Sent!</h3>
          <p class="contact-form-success-message">{{ status.message }}</p>
          <button @click="resetForm" class="contact-form-button">
            Send Another Message
          </button>
        </div>
      </template>
      <template v-else>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="contact-form-fields">
            <div>
              <label for="name" class="contact-form-label">Name</label>
              <input id="name" v-model="formData.name" type="text" placeholder="Your name" required
                class="contact-form-input" />
            </div>

            <div>
              <label for="email" class="contact-form-label">Email Address</label>
              <input id="email" v-model="formData.email" type="email" placeholder="your.email@example.com" required
                class="contact-form-input" />
            </div>

            <div>
              <label for="phone" class="contact-form-label">Phone Number</label>
              <input id="phone" v-model="formData.phone" type="tel" placeholder="+1 (555) 123-4567"
                class="contact-form-input" />
            </div>

            <div>
              <label for="website" class="contact-form-label">Website</label>
              <input id="website" v-model="formData.website" type="url" placeholder="https://yourwebsite.com"
                class="contact-form-input" />
            </div>

            <div>
              <label for="message" class="contact-form-label">How Can We Help You?</label>
              <textarea id="message" v-model="formData.message"
                placeholder="Tell us about your project, questions, or requirements..." required
                class="contact-form-textarea" />
            </div>
          </div>

          <div v-if="status.error" class="contact-form-error">
            {{ status.message }}
          </div>

          <button type="submit" :disabled="status.submitting" class="contact-form-button">
            {{ status.submitting ? 'Sending...' : 'Send Message' }}
          </button>

          <p class="contact-form-footer">
            By submitting this form, you agree to our
            <a href="/policies/privacy-policy">Privacy Policy</a>
            and <a href="/policies/terms-of-service">Terms of Service</a>.
          </p>
        </form>
      </template>
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