<template>
  <div class="">
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
        <button @click="reset()" class="contact-form-button">
          Send Another Message
        </button>
      </div>
    </template>
    <template v-else>
      <form @submit.prevent="onSubmit" class="contact-form">
        <div class="contact-form-fields">
          <div>
            <label for="name" class="contact-form-label">Name</label>
            <Field
              name="name"
              type="text"
              placeholder="Your name"
              as="input"
              :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
            />
            <ErrorMessage name="name" class="contact-form-error" />
          </div>

          <div>
            <label for="email" class="contact-form-label">Email Address</label>
            <Field
              name="email"
              type="email"
              placeholder="your.name@company.com"
              as="input"
              :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
            />
            <ErrorMessage name="email" class="contact-form-error" />
          </div>

          <div>
            <label for="phone" class="contact-form-label">Phone Number</label>
            <Field
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              as="input"
              :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
            />
            <ErrorMessage name="phone" class="contact-form-error" />
          </div>

          <div>
            <label for="website" class="contact-form-label">Website</label>
            <Field
              name="website"
              type="url"
              placeholder="https://yourwebsite.com"
              as="input"
              :class="['contact-form-input', errors.email ? 'is-invalid' : '']"
            />
            <ErrorMessage name="website" class="contact-form-error" />
          </div>

          <div>
            <label for="message" class="contact-form-label"
              >How Can We Help You?</label
            >
            <Field
              name="message"
              as="textarea"
              id="message"
              placeholder="Tell us about your project, questions, or requirements..."
              :class="[
                'contact-form-textarea',
                errors.message ? 'is-invalid' : '',
              ]"
            />
            <ErrorMessage name="message" class="contact-form-error" />
          </div>
        </div>

        <div v-if="status.error" class="contact-form-error">
          {{ status.message }}
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="contact-form-button"
        >
          {{ isSubmitting ? "Sending..." : "Send Message" }}
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
import { ref } from "vue";
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// Form validation
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
   phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits only")
    .required("Phone number is required"),
  website: yup.string().url("Invalid URL"),
  message: yup.string().required("Message is required"),
});
type FormData = yup.InferType<typeof schema>;
const { handleSubmit, errors, resetForm, isSubmitting } = useForm<FormData>({
  validationSchema: schema,
});

const status = ref({
  submitted: false,
  error: false,
  message: "",
});

const onSubmit = handleSubmit(async (values) => {
  status.value = { submitted: false, error: false, message: "" };
  console.log("Form submitted with:", values);
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    const response = await fetch(
      "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
      {
        method: "POST",
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderMobile: values.phone,
          senderWebsite: values.website,
          senderMessage: values.message,
        }),
      }
    );

    if (!response.ok) {
      status.value = {
        submitted: false,
        error: true,
        message: "Oops! Something went wrong. Please try again later.",
      };
    } else {
      status.value = {
        submitted: true,
        error: false,
        message: "Thank you! Your message has been sent successfully.",
      };
    }
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
