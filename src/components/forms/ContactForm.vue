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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- first name -->
            <div>
              <label for="fname" class="contact-form-label">
                First Name <span class="text-red-500">*</span></label
              >

              <Field
                name="fname"
                type="text"
                placeholder="John"
                as="input"
                :class="[
                  'contact-form-input',
                  errors.fname ? 'is-invalid' : '',
                ]"
              />
              <ErrorMessage name="fname" class="contact-form-error" />
            </div>
            <!-- last name -->
            <div>
              <label for="lname" class="contact-form-label">
                Last Name <span class="text-red-500">*</span></label
              >

              <Field
                name="lname"
                type="text"
                placeholder="Smith"
                as="input"
                :class="[
                  'contact-form-input',
                  errors.lname ? 'is-invalid' : '',
                ]"
              />
              <ErrorMessage name="lname" class="contact-form-error" />
            </div>
          </div>
          <div>
            <label for="email" class="contact-form-label"
              >Email Address <span class="text-red-500">*</span></label
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

          <div>
            <label for="phone" class="contact-form-label"
              >Phone Number <span class="text-red-500">*</span></label
            >
            <Field
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              as="input"
              :class="['contact-form-input', errors.phone ? 'is-invalid' : '']"
            />
            <ErrorMessage name="phone" class="contact-form-error" />
          </div>

          <div>
            <label for="website" class="contact-form-label"
              >Website <span class="text-red-500">*</span></label
            >
            <Field
              name="website"
              type="url"
              placeholder="https://yourwebsite.com"
              as="input"
              :class="[
                'contact-form-input',
                errors.website ? 'is-invalid' : '',
              ]"
            />
            <ErrorMessage name="website" class="contact-form-error" />
          </div>

          <div>
            <label for="message" class="contact-form-label"
              >How Can We Help You? <span class="text-red-500">*</span></label
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
          <a href="/policies/terms-of-service/" target="_blank"
            >Terms & Conditions</a
          >
          and
          <a href="/policies/privacy-policy/" target="_blank">Privacy Policy</a>
        </p>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useSegment } from "@/composables/useSegment";
import { restrictedDomains } from "@/utils/restrictedDomains";

// Form validation
const schema = yup.object({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .test(
      "is-allowed-domain",
      "Please enter your official work email address.",
      (value) => {
        if (!value) return true;
        const domain = value.split("@")[1]?.toLowerCase();
        if (!domain) return false;
        return !restrictedDomains.some(
          (restricted) =>
            domain.includes(restricted)
        );
      }
    ),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  website: yup.string().required("Website is required").url("Invalid URL"),
  message: yup.string().required("Message is required"),
});
type FormData = yup.InferType<typeof schema>;
const { handleSubmit, errors, resetForm, isSubmitting } = useForm<FormData>({
  validationSchema: schema,
});

// Segment tracking
const { trackContactFormSubmission } = useSegment();

const status = ref({
  submitted: false,
  error: false,
  message: "",
});

const onSubmit = handleSubmit(async (values) => {
  status.value = { submitted: false, error: false, message: "" };
  try {
    // Track contact form submission in Segment
    await trackContactFormSubmission({
      firstName: values.fname,
      lastName: values.lname,
      email: values.email,
      phone: values.phone,
      website: values.website,
      message: values.message,
      source: "contact_form",
    });

    const response = await fetch(
      "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
      {
        method: "POST",
        body: JSON.stringify({
          senderFirstName: values.fname,
          senderLastName: values.lname,
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
    // console.error("Contact form submission error:", e);
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
