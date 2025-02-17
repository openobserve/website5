<script setup>
import CustomButton from "../core/CustomButton.vue";
import Heading from "../core/Heading.vue";
import CustomInput from "../forms/CustomInput.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";
import { defineProps } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  message: yup.string().required("Message is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Initialize form validation
const { handleSubmit } = useForm({ validationSchema: schema });

const name = useField("name");
const email = useField("email");
const phone = useField("phone");
const message = useField("message");
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
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderPhone: values.phone,
          senderMessage: values.message,
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
  window.location.assign("/policies/terms-of-service"); // Update with your terms page URL
};
</script>

<template>
  <!-- backgroundPosition: 'top center, bottom -200px center', -->
  <div
    class="relative flex items-center justify-center min-h-[40vh] px-6 sm:px-12 lg:px-24 bg-no-repeat py-8"
    :style="{
      backgroundImage: 'url(/ContactUsTopbg.svg), url(/ContactUsBottombg.svg)',
      backgroundPosition: 'center -200px, bottom center',
      backgroundSize: 'cover, cover',
      backgroundRepeat: 'no-repeat, no-repeat',
    }"
  >
    <div
      class="flex flex-col lg:flex-row gap-4 lg:gap-12 items-center w-full container mx-auto"
    >
      <!-- Left Column: Title & Description -->
      <div class="w-full text-left flex flex-col space-y-4">
        <h1 class="text-5xl xl:text-6xl text-white font-bold">{{ title }}</h1>
        <Heading
          :description="description"
          align="LEFT"
          class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300"
        />
      </div>

      <!-- Right Column: Form Placeholder -->
      <div class="w-full flex justify-center">
        <div
          class="bg-black bg-opacity-40 rounded-2xl p-8 shadow-lg backdrop-blur-md w-full"
        >
          <form @submit.prevent="onSubmit">
            <div class="space-y-3">
              <div>
                <label
                  for="name"
                  class="text-gray-200 font-medium cursor-pointer"
                >
                  Name <span class="text-red-500">*</span>
                </label>
                <CustomInput
                  v-model="name.value.value"
                  name="name"
                  placeholder="Enter here"
                />
                <span
                  v-if="name.errorMessage.value"
                  class="text-xs text-red-500"
                  >{{ name.errorMessage.value }}</span
                >
              </div>
              <div>
                <label
                  for="email"
                  class="text-gray-200 font-medium cursor-pointer"
                >
                  Email Address <span class="text-red-500">*</span>
                </label>
                <CustomInput
                  v-model="email.value.value"
                  name="email"
                  type="email"
                  placeholder="Enter here"
                />
                <span
                  v-if="email.errorMessage.value"
                  class="text-xs text-red-500"
                  >{{ email.errorMessage.value }}</span
                >
              </div>
              <div>
                <label
                  for="phone"
                  class="text-gray-200 font-medium cursor-pointer"
                >
                  Phone <span class="text-red-500">*</span>
                </label>
                <CustomInput
                  v-model="phone.value.value"
                  name="phone"
                  type="phone"
                  placeholder="Enter here"
                />
                <span
                  v-if="phone.errorMessage.value"
                  class="text-xs text-red-500"
                  >{{ phone.errorMessage.value }}</span
                >
              </div>

              <!-- Message -->
              <div>
                <label
                  for="message"
                  class="text-gray-200 font-medium cursor-pointer"
                >
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
              <!-- Terms & Conditions -->
              <div class="flex flex-col items-start gap-1">
                <div class="flex items-center gap-2">
                  <!-- Checkbox -->
                  <input
                    id="terms"
                    type="checkbox"
                    v-model="terms.value.value"
                    class="h-4 w-4 cursor-pointer"
                    :class="{ 'border-red-500': terms.errorMessage.value }"
                  />

                  <!-- Label with clickable link -->
                  <label
                    for="terms"
                    class="text-white text-sm cursor-pointer select-none flex flex-wrap items-center gap-1"
                  >
                    I confirm, I have read and agree to OpenObserve's
                    <a
                      href="/policies/terms-of-service"
                      class="text-blue-500 underline text-sm whitespace-nowrap"
                    >
                      Terms and Conditions
                    </a>
                    <span class="text-red-500">*</span>
                  </label>
                </div>

                <!-- ✅ Reserved Space for Error Message to Prevent Shifting -->
                <p
                  v-if="terms.errorMessage.value"
                  class="text-xs text-red-500 min-h-[1rem]"
                >
                  {{ terms.errorMessage.value }}
                </p>
                <p v-else class="min-h-[1rem]"></p>
                <!-- Keeps space even when no error -->
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
      </div>
    </div>
  </div>
</template>
