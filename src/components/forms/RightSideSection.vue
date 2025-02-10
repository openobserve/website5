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
  support: yup.string().required("Support type is required"),
  message: yup.string().required("Message is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

// Initialize form validation
const { handleSubmit } = useForm({ validationSchema: schema });

const name = useField("name");
const email = useField("email");
const company = useField("company");
const phone = useField("phone");
const support = useField("support");
const message = useField("message");
const terms = useField("terms");

const loading = ref(false);
const error = ref(null);

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = null;

  // Combine fields into the message
  const finalMessage = `
Company: ${values.company}
Support Type: ${values.support}
Message: ${values.message}
  `.trim();

  try {
    const response = await fetch(
      "https://run.mocky.io/v3/a2626aa7-8f2d-4ef4-a811-bcf7fa85d9d3",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderPhone: values.phone,
          senderMessage: finalMessage,
        }),
      }
    );

    if (response.ok) {
      console.log("Email sent successfully!");
      console.log(response);
      // Redirect to success page if needed
      window.location.assign("/thank-you");
    } else {
      const body = await response.json();
      error.value = body.message || "Something went wrong!";
      console.log(error.value);
    }
  } catch (err) {
    error.value = err.message || "Network error!";
    console.log(error.value);
  } finally {
    loading.value = false;
  }
});

const navigateToTerms = (e) => {
  e.preventDefault();
  window.location.assign("/terms-and-conditions"); // Update with your terms page URL
};
</script>

<template>
  <div class="w-1/2">
    <form @submit.prevent="onSubmit">
      <div class="space-y-3">
        <!-- Name -->
        <div>
          <label for="name" class="text-gray-200 font-medium cursor-pointer">
            Name <span class="text-blue-500">*</span>
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

        <!-- Email -->
        <div>
          <label for="email" class="text-gray-200 font-medium cursor-pointer">
            Email Address <span class="text-blue-500">*</span>
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

        <!-- Company Name -->
        <div>
          <label for="company" class="text-gray-200 font-medium cursor-pointer">
            Company Name <span class="text-blue-500">*</span>
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

        <!-- Phone Number -->
        <div>
          <label for="phone" class="text-gray-200 font-medium cursor-pointer">
            Phone Number <span class="text-blue-500">*</span>
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

        <!-- Support Needed -->
        <div>
          <label for="support" class="text-gray-200 font-medium cursor-pointer">
            Support Type <span class="text-blue-500">*</span>
          </label>
          <select
            id="support"
            v-model="support.value.value"
            name="support"
            class="w-full bg-[#23282C] text-gray-200 border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Other">Other</option>
          </select>
          <span
            v-if="support.errorMessage.value"
            class="text-xs text-red-500"
            >{{ support.errorMessage.value }}</span
          >
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="text-gray-200 font-medium cursor-pointer">
            Message <span class="text-blue-500">*</span>
          </label>
          <textarea
            id="message"
            v-model="message.value.value"
            name="message"
            class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter here"
            rows="4"
          ></textarea>
          <span
            v-if="message.errorMessage.value"
            class="text-xs text-red-500"
            >{{ message.errorMessage.value }}</span
          >
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
              required
            />
          </div>
          <div class="ml-2">
            <label for="terms" class="text-white cursor-pointer select-none">
              I confirm I have read and agree to OpenObserve's terms and condition
              <a
                href="/terms-and-conditions"
                class="text-blue-500 underline"
                @click="navigateToTerms"
              >
              </a>
              <span class="text-blue-500">*</span>
            </label>
            <p
              v-if="terms.errorMessage.value"
              class="text-xs text-red-500 mt-1"
            >
              {{ terms.errorMessage.value }}
            </p>
          </div>
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
