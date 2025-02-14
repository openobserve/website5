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
  help: yup.string().required("Message is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Initialize form validation
const { handleSubmit } = useForm({ validationSchema: schema });

const name = useField("name");
const email = useField("email");
const help = useField("help");
const terms = useField("terms");

const loading = ref(false);
const error = ref(null);

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderMessage: values.help,
        }),
      }
    );

    if (response.ok) {
      // Navigate to success page or another route
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
  window.location.assign("policies/terms-of-service"); // Update with your terms page URL
};
</script>

<template>
  <div class="w-full md:w-1/2">
    <form @submit.prevent="onSubmit">
      <div class="space-y-3">
        <div>
          <label
            for="name"
            class="text-gray-200 font-medium cursor-pointer text-sm md:text-base"
          >
            Name <span class="text-red-500">*</span>
          </label>
          <CustomInput
            v-model="name.value.value"
            name="name"
            placeholder="Enter here"
          />
          <span v-if="name.errorMessage.value" class="text-xs text-red-500">{{
            name.errorMessage.value
          }}</span>
        </div>
        <div>
          <label
            for="email"
            class="text-gray-200 font-medium cursor-pointer text-sm md:text-base"
          >
            Email Address <span class="text-red-500">*</span>
          </label>
          <CustomInput
            v-model="email.value.value"
            name="email"
            type="email"
            placeholder="Enter here"
          />
          <span v-if="email.errorMessage.value" class="text-xs text-red-500">{{
            email.errorMessage.value
          }}</span>
        </div>

        <div class="input-group">
          <label
            for="message"
            class="text-gray-200 font-medium cursor-pointer text-sm md:text-base"
          >
            Message <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="help.value.value"
            name="help"
            class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{
              'border-red-500': help.errorMessage.value,
              'border-[#43484C]': !help.errorMessage.value,
            }"
            placeholder="Enter Here"
            rows="4"
          ></textarea>
          <span v-if="help.errorMessage.value" class="text-xs text-red-500">{{
            help.errorMessage.value
          }}</span>
        </div>
        <!-- Terms & Conditions -->
        <div class="flex flex-col items-start gap-2">
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

            <label
              for="terms"
              class="text-white text-sm cursor-pointer select-none"
            >
              I confirm, I have read and agree to OpenObserve's
              <a
                href="/policies/terms-of-service"
                class="text-blue-500 underline text-sm"
                @click="navigateToTerms"
              >
                Terms And Conditions
              </a>
              <span class="text-red-500">*</span>
            </label>
          </div>

          <!-- ✅ Error Message Now Displays Below in Mobile View -->
          <p v-if="terms.errorMessage.value" class="text-xs text-red-500">
            {{ terms.errorMessage.value }}
          </p>
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
      </div>
    </form>
  </div>
</template>
