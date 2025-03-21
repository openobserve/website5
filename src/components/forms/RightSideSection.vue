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
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Initialize form validation
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    support: "",
    // ... other initial values
  },
});

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
          senderMobile: values.phone,
          senderWebsite: "",
          senderMessage: finalMessage,
          senderCompany: values.company,
          senderSupportType: values.support,
        }),
      }
    );

    if (response.ok) {
      // Redirect to success page if needed
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

<template>
  <div class="w-full md:w-1/2">
    <form @submit.prevent="onSubmit">
      <div class="space-y-3">
        <!-- Name -->
        <div>
          <label for="name" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Name <span class="text-red-500">*</span>
          </label>
          <CustomInput id="name" v-model="name.value.value" name="name" placeholder="Enter here" />
          <span v-if="name.errorMessage.value" class="text-xs text-red-500">{{
            name.errorMessage.value
          }}</span>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Email Address <span class="text-red-500">*</span>
          </label>
          <CustomInput id="email" v-model="email.value.value" name="email" type="email" placeholder="Enter here" />
          <span v-if="email.errorMessage.value" class="text-xs text-red-500">{{
            email.errorMessage.value
          }}</span>
        </div>

        <!-- Company Name -->
        <div>
          <label for="company" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Company Name <span class="text-red-500">*</span>
          </label>
          <CustomInput id="company" v-model="company.value.value" name="company" placeholder="Enter here" />
          <span v-if="company.errorMessage.value" class="text-xs text-red-500">{{ company.errorMessage.value }}</span>
        </div>

        <!-- Phone Number -->
        <div>
          <label for="phone" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <CustomInput id="phone" v-model="phone.value.value" name="phone" placeholder="Enter here" />
          <span v-if="phone.errorMessage.value" class="text-xs text-red-500">{{
            phone.errorMessage.value
          }}</span>
        </div>

        <!-- Support Needed -->
        <div>
          <label for="support" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Support Type <span class="text-red-500">*</span>
          </label>
          <select id="support" v-model="support.value.value" name="support"
            class="w-full bg-[#23282C] text-gray-200 border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden disabled>Select Support Type</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Other">Other</option>
          </select>
          <span v-if="support.errorMessage.value" class="text-xs text-red-500">{{ support.errorMessage.value }}</span>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
            Message <span class="text-red-500">*</span>
          </label>
          <textarea id="message" v-model="message.value.value" name="message"
            class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'border-red-500': message.errorMessage.value,
              'border-[#43484C]': !message.errorMessage.value,
            }" placeholder="Enter here" rows="4"></textarea>
          <span v-if="message.errorMessage.value" class="text-xs text-red-500">{{ message.errorMessage.value }}</span>
        </div>

        <!-- Terms & Conditions -->
        <div class="flex flex-col items-start gap-2">
          <div class="flex items-start gap-2">
            <div class="relative flex items-start">
              <input id="terms" type="checkbox" v-model="terms.value.value" class="mt-1 h-4 w-4 cursor-pointer"
                :class="{ 'border-red-500': terms.errorMessage.value }" />
            </div>

            <label for="terms" class="text-white text-sm cursor-pointer select-none">
              I confirm, I have read and agree to OpenObserve's
              <a href="/policies/terms-of-service" class="text-sm" target="_blank">
                Terms and Conditions
              </a>
              <span class="text-red-500">*</span>
            </label>
          </div>

          <!-- ✅ Error Message Now Displays Below in Mobile View -->
          <p v-if="terms.errorMessage.value" class="text-xs text-red-500">
            {{ terms.errorMessage.value }}
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <CustomButton variant="secondary" type="submit" :disabled="loading" class="mt-4" size="small">
        {{ loading ? "SENDING..." : "GET IN TOUCH" }}
      </CustomButton>

      <!-- Error Message -->
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>
