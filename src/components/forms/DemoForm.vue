<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// Form validation
const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  company: yup.string().required("Company name is required"),
  deployment: yup.string().required("Deployment option is required"),
  volume: yup.string().required("Data volume is required"),
  referral: yup.string().required("Referral source is required"),
});
type FormData = yup.InferType<typeof schema>;

const status = ref({
  submitted: false,
  error: false,
  message: "",
});
const { handleSubmit, errors, resetForm, isSubmitting, submitCount } =
  useForm<FormData>({
    validationSchema: schema,
    validateOnMount: false, // default
    initialValues: {
      email: "",
      company: "",
      deployment: "",
      volume: "",
      referral: "",
    }
  });
const onSubmit = handleSubmit(async (values) => {
  status.value = { submitted: false, error: false, message: "" };
  console.log("Form submitted with:", values);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    status.value = {
      submitted: true,
      error: false,
      message: "Thank you! Your message has been sent successfully.",
    };

    resetForm();
  } catch (e) {
    status.value = {
      submitted: false,
      error: true,
      message: "Oops! Something went wrong. Please try again later.",
    };
  }
});

const reset = () => {
  status.value = { submitted: false, error: false, message: "" };
  resetForm();
};
</script>

<template>
  <div class="w-full mx-auto">
    <div class="contact-form-card">
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
          <button @click="reset()" class="contact-form-button">
            Send Another Message
          </button>
        </div>
      </template>
      <template v-else>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- {{ JSON.stringify(errors) }} -->
          <!-- Work Email -->
          <div>
            <label for="email" class="contact-form-label"
              >Work Email <span class="text-red-500">*</span></label
            >

            <Field
              name="email"
              type="email"
              placeholder="your.name@company.com"
              as="input"
              :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
            />
            <ErrorMessage name="email" class="contact-form-error" />
          </div>
          <!-- Company Name -->
          <div>
            <label for="company" class="contact-form-label"
              >Company Name <span class="text-red-500">*</span></label
            >
            <Field
              name="company"
              type="text"
              placeholder="Acme Inc."
              as="input"
              :class="[
                'contact-form-input',
                errors.company ? 'is-invalid' : '',
              ]"
            />
            <ErrorMessage name="company" class="contact-form-error" />
          </div>

          <!-- Deployment Preference -->
          <div>
            <label for="deployment" class="contact-form-label"
              >Deployment Preference <span class="text-red-500">*</span></label
            >
            <Field
              name="deployment"
              as="select"
              :class="[
                'contact-form-select',
                errors.deployment ? 'is-invalid' : '',
              ]"
            >
              <option value="">Select deployment option</option>
              <option value="cloud">Cloud (Saas)</option>
              <option value="self-hosted">Self-hosted</option>
              <option value="hybrid">Hybrid</option>
              <option value="not-sure">Not sure yet</option>
            </Field>
            <ErrorMessage name="deployment" class="contact-form-error" />
          </div>

          <!-- Data Volume -->
          <div>
            <label for="volume" class="contact-form-label"
              >Expected Daily Data Volume
              <span class="text-red-500">*</span></label
            >
            <Field
              name="volume"
              as="select"
              :class="[
                'contact-form-select',
                errors.volume ? 'is-invalid' : '',
              ]"
            >
              <option value="">Select data volume</option>
              <option value="lt-10gb">Less than 10GB</option>
              <option value="10-100gb">10GB - 100GB</option>
              <option value="100gb-1tb">100GB - 1TB</option>
              <option value="gt-1tb">More than 1TB</option>
              <option value="not-sure">Not sure yet</option>
            </Field>
            <ErrorMessage name="volume" class="contact-form-error" />
          </div>

          <!-- How did you hear -->
          <div>
            <label for="referral" class="contact-form-label"
              >How did you hear about us?
              <span class="text-red-500">*</span></label
            >
            <Field
              name="referral"
              type="text"
              placeholder="Search engine, social media, colleague, etc."
              as="input"
             :class="['contact-form-input', errors.referral ? 'is-invalid' : '']"
            />
            <ErrorMessage name="referral" class="contact-form-error" />
          </div>

          <!-- Error message -->
          <div v-if="status.error" class="text-red-600 text-sm">
            {{ status.message }}
          </div>

          <!-- Submit -->
          <CustomButton type="submit" :disabled="isSubmitting" class="w-full">
            {{ isSubmitting ? "Submitting..." : "Request Demo" }}
          </CustomButton>

          <p class="text-xs text-center text-gray-500 mt-4">
            By submitting this form, you agree to our
            <a
              href="/privacy-policy"
              class="underline hover:text-primary-purple"
              >Privacy Policy</a
            >.
          </p>
        </form>
      </template>
    </div>
  </div>
</template>
