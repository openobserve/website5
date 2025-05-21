<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// Form validation
const schema = yup.object({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  company: yup.string().required("Company name is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
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
      fname: "",
      lname: "",
      company: "",
      phone: "",
      referral: "",
    },
  });
const onSubmit = handleSubmit(async (values) => {
  status.value = { submitted: false, error: false, message: "" };
  try {
    const response = await fetch(
      "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
      {
        method: "POST",
        body: JSON.stringify({
          senderName: values.fname,
          senderLastName: values.lname,
          senderCompany: values.company,
          senderMobile: values.phone,
          senderMessage: values.referral,
          formType: "sales",
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
          <!-- Phone -->
          <div>
            <label for="phone" class="contact-form-label">Phone Number</label>
            <Field
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              as="input"
              :class="['contact-form-input', errors.phone ? 'is-invalid' : '']"
            />
            <ErrorMessage name="phone" class="contact-form-error" />
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
              :class="[
                'contact-form-input',
                errors.referral ? 'is-invalid' : '',
              ]"
            />
            <ErrorMessage name="referral" class="contact-form-error" />
          </div>

          <!-- Error message -->
          <div v-if="status.error" class="text-red-600 text-sm">
            {{ status.message }}
          </div>

          <!-- Submit -->
          <CustomButton type="submit" :disabled="isSubmitting" class="w-full">
            {{ isSubmitting ? "Submitting..." : "Contact Sales" }}
          </CustomButton>

          <p class="contact-form-footer">
            By submitting this form, you agree to our
            <a href="/policies/terms-of-service" target="_blank"
              >Terms & Conditions</a
            >
            and
            <a href="/policies/privacy-policy" target="_blank"
              >Privacy Policy</a
            >
          </p>
        </form>
      </template>
    </div>
  </div>
</template>
