<template>
  <div class="max-w-4xl mx-auto my-10 lg:px-0 px-4">
    <div class="contact-form-card">
    <HeadingSection :title="title" :description="description" align="center" />
    <div class="mt-10">
      <template v-if="status.submitted">
        <div class="contact-form-success">
          <div class="contact-form-success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
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
            <div class="flex flex-col lg:flex-row gap-6 w-full">
              <div class="lg:w-1/2 w-full">
                <label for="fname" class="contact-form-label">First name</label>
                <input
                  id="fname"
                  v-model="formData.fname"
                  type="text"
                  placeholder="Your first name"
                  required
                  class="contact-form-input"
                />
              </div>
              <div class="lg:w-1/2 w-full">
                <label for="lname" class="contact-form-label">Last name</label>
                <input
                  id="lname"
                  v-model="formData.lname"
                  type="text"
                  placeholder="Your last name"
                  required
                  class="contact-form-input"
                />
              </div>
            </div>
            <div>
              <label for="email" class="contact-form-label"
                >Email Address</label
              >
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="your.email@example.com"
                required
                class="contact-form-input"
              />
            </div>

            <div>
              <label for="company" class="contact-form-label">Company</label>
              <input
                id="company"
                v-model="formData.company"
                type="text"
                placeholder=""
                class="contact-form-input"
              />
            </div>

            <div>
              <label for="interest" class="contact-form-label">Interest</label>
              <select
                id="interest"
                v-model="formData.interest"
                class="contact-form-input"
              >
                <option disabled value="">Select an option</option>
                <option value="cloud">Cloud</option>
                <option value="self-hosted">Self Hosted</option>
              </select>
            </div>

            <div>
              <label for="message" class="contact-form-label">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                placeholder="Tell us about your project, questions, or requirements..."
                required
                class="contact-form-textarea"
              />
            </div>
          </div>

          <div v-if="status.error" class="contact-form-error">
            {{ status.message }}
          </div>

          <button
            type="submit"
            :disabled="status.submitting"
            class="contact-form-button"
          >
            {{ status.submitting ? "Sending..." : "Send Message" }}
          </button>

          <p class="contact-form-footer">
            By submitting this form, you agree to our
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </form>
      </template>
    </div>
</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeadingSection from "@/components/core/HeadingSection.vue";

defineProps({
  title: {
    type: String,
    required: false,
    default: "Contact Us",
  },
  description: {
    type: String,
    required: false,
    default: "Have questions about deployment options? Our team is here to help.",
  },
});
const formData = ref({
  fname: "",
  lname: "",
  email: "",
  company: "",
  interest: "",
  message: "",
});

const status = ref({
  submitted: false,
  submitting: false,
  error: false,
  message: "",
});
const handleSubmit = async () => {
  status.value = {
    submitted: false,
    submitting: true,
    error: false,
    message: "",
  };

  try {
    // Replace with your actual form submission logic
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

    status.value = {
      submitted: true,
      submitting: false,
      error: false,
      message: "Thank you! Your message has been sent successfully.",
    };

    formData.value = {
      fname: "",
      lname: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    };
  } catch (error) {
    status.value = {
      submitted: false,
      submitting: false,
      error: true,
      message: "Oops! Something went wrong. Please try again later.",
    };
  }
};

const resetForm = () => {
  status.value = {
    submitted: false,
    submitting: false,
    error: false,
    message: "",
  };
};
</script>
<style scoped></style>
