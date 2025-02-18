<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import CustomInput from "./CustomInput.vue";
import CustomButton from "../core/CustomButton.vue";

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  company: yup.string().required("Company name is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  jobTitle: yup.string().required("Job title is required"),
  deployment: yup.string().required("Please select deployment interest"),
  dataVolume: yup.string().required("Please select expected data volume"),
  message: yup.string().required("Message is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Initialize form validation
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    deployment: "",
    dataVolume: "",
    // ... other initial values
  },
});

const name = useField("name");
const email = useField("email");
const company = useField("company");
const phone = useField("phone");
const jobTitle = useField("jobTitle");
const deployment = useField("deployment");
const dataVolume = useField("dataVolume");
const message = useField("message");
const terms = useField("terms");

const loading = ref(false);
const error = ref(null);

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = null;

  // Format message
  const finalMessage = `
Company: ${values.company} </br>
Job Title: ${values.jobTitle} </br>
Deployment: ${values.deployment} </br>
Data Volume: ${values.dataVolume} </br>
Message: ${values.message}
  `.trim();

  try {
    const response = await fetch(
      "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
      {
        method: "POST",
        // headers: { 
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        //   "Access-Control-Allow-Headers": "Content-Type, Authorization"
        // },
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderPhone: values.phone,
          senderWebsite: "",
          senderMessage: finalMessage,
        }),
      }
    );

    if (response.ok) {
      window.location.assign("/thank-you");
    } else {
      const body = await response.json();
      error.value = body.message || "Something went wrong!";
    }
  } catch (err) {
    error.value = err.message || "Network error!";
  } finally {
    loading.value = false;
  }
});

const navigateToTerms = (e) => {
  e.preventDefault();
  window.location.assign("/policies/terms-of-service"); // Update with your terms page URL
};
</script>
<!-- SampleForm.vue -->
<template>
  <div class="">
    <form @submit.prevent="onSubmit">
      <div class="space-y-3">
        <div>
          <label for="name" class="text-gray-200 font-medium cursor-pointer">
            Name <span class="text-red-500">*</span>
          </label>
          <CustomInput
            id="name"
            v-model="name.value.value"
            name="name"
            placeholder="Enter here"
          />
          <span v-if="name.errorMessage.value" class="text-xs text-red-500">{{
            name.errorMessage.value
          }}</span>
        </div>

        <div>
          <label for="company" class="text-gray-200 font-medium cursor-pointer">
            Company Name <span class="text-red-500">*</span>
          </label>
          <CustomInput
            id="company"
            v-model="company.value.value"
            name="company"
            placeholder="Enter here"
          />
          <span
            v-if="company.errorMessage.value"
            class="text-xs text-red-500"
            >{{ company.errorMessage.value }}</span
          >
        </div>

        <div>
          <label for="email" class="text-gray-200 font-medium cursor-pointer">
            Email Address <span class="text-red-500">*</span>
          </label>
          <CustomInput
            id="email"
            v-model="email.value.value"
            name="email"
            type="email"
            placeholder="Enter here"
          />
          <span v-if="email.errorMessage.value" class="text-xs text-red-500">{{
            email.errorMessage.value
          }}</span>
        </div>

        <div>
          <label for="phone" class="text-gray-200 font-medium cursor-pointer">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <CustomInput
            id="phone"
            v-model="phone.value.value"
            name="phone"
            placeholder="Enter here"
          />
          <span v-if="phone.errorMessage.value" class="text-xs text-red-500">{{
            phone.errorMessage.value
          }}</span>
        </div>

        <div>
          <label
            for="jobTitle"
            class="text-gray-200 font-medium cursor-pointer"
          >
            Job Title <span class="text-red-500">*</span>
          </label>
          <CustomInput
            id="jobTitle"
            v-model="jobTitle.value.value"
            name="jobTitle"
            placeholder="Enter here"
          />
          <span
            v-if="jobTitle.errorMessage.value"
            class="text-xs text-red-500"
            >{{ jobTitle.errorMessage.value }}</span
          >
        </div>

        <div>
          <label
            for="deployment"
            class="text-gray-200 font-medium cursor-pointer"
          >
            Deployment Interest <span class="text-red-500">*</span>
          </label>
          <select
            id="deployment"
            v-model="deployment.value.value"
            name="deployment"
            class="w-full bg-[#23282C] text-gray-200 border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>Select deployment type</option>
            <option value="cloud">Cloud</option>
            <option value="self-hosted">Self Hosted</option>
          </select>
          <span
            v-if="deployment.errorMessage.value"
            class="text-xs text-red-500"
            >{{ deployment.errorMessage.value }}</span
          >
        </div>

        <div>
          <label
            for="dataVolume"
            class="text-gray-200 font-medium cursor-pointer"
          >
            Expected Data Volume <span class="text-red-500">*</span>
          </label>
          <select
            id="dataVolume"
            v-model="dataVolume.value.value"
            name="dataVolume"
            class="w-full bg-[#23282C] text-gray-200 border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>Select Data Volume type</option>
            <option value="small">< 100GB/day</option>
            <option value="medium">100GB - 1TB/day</option>
            <option value="large">> 1TB/day</option>
          </select>
          <span
            v-if="dataVolume.errorMessage.value"
            class="text-xs text-red-500"
            >{{ dataVolume.errorMessage.value }}</span
          >
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="text-gray-200 font-medium cursor-pointer">
            How can I Help You ? <span class="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            v-model="message.value.value"
            name="message"
            class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'border-red-500': message.errorMessage.value,
              'border-[#43484C]': !message.errorMessage.value,
            }"
            placeholder="Enter here"
            rows="4"
          ></textarea>
          <span
            v-if="message.errorMessage.value"
            class="text-xs text-red-500"
            >{{ message.errorMessage.value }}</span
          >
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="flex items-start gap-2">
        <div class="relative flex items-start">
          <input
            id="terms"
            type="checkbox"
            v-model="terms.value.value"
            class="mt-1 h-4 w-4 cursor-pointer"
            :class="{ 'border-red-500': terms.errorMessage.value }"
          />
        </div>
        <div>
          <label
            for="terms"
            class="text-white text-sm cursor-pointer select-none"
          >
            I confirm, I have read and agree to OpenObserve's
            <a
              href="/policies/terms-of-service"
              class="text-blue-500 underline"
              target="_blank"
            >
              Terms and Condition
            </a>
            <span class="text-red-500">*</span>
          </label>
          <p v-if="terms.errorMessage.value" class="text-xs text-red-500 mt-1">
            {{ terms.errorMessage.value }}
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <CustomButton
        variant="secondary"
        type="submit"
        :disabled="loading"
        class="mt-4"
      >
        {{ loading ? "SENDING..." : "GET IN TOUCH" }}
      </CustomButton>

      <!-- Error Message -->
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>
