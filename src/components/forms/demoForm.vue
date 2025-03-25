<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import CustomInput from "./CustomInput.vue";
import CustomButton from "../core/CustomButton.vue";

// Define props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^\d+$/, "Phone number must be digits only"),
  help: yup.string().required("Message is required"),
  website: yup.string().optional(),
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
const help = useField("help");
const terms = useField("terms");
const website = useField("website");

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
        body: JSON.stringify({
          senderName: values.name,
          senderEmail: values.email,
          senderWebsite: values.website,
          senderMobile: values.phone,
          senderMessage: values.help,
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

// Restrict input to numeric values and 10 digits
const onContactInput = (event) => {
  let value = event.target.value;
  // Allow only numeric input and truncate to 10 digits
  value = value.replace(/\D/g, "").slice(0, Math.min(10, value.length));
  event.target.value = value; // Update the input value in the DOM
  contact.value.value = value; // Update the model value
};
</script>

<template>
  <div class="flex flex-col justify-center items-center px-4 pt-[5vh]">
    <div class="items-center text-white text-2xl">
      <h2>{{ title }}</h2>
    </div>
    <div class="w-full max-w-md md:max-w-lg p-6 md:p-8 rounded-lg shadow-lg">
      <form @submit.prevent="onSubmit">
        <div class="space-y-3">
          <!-- Name Field -->
          <div>
            <label for="name" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
              Name <span class="text-red-500">*</span>
            </label>
            <CustomInput v-model="name.value.value" name="name" placeholder="Enter here" />
            <span v-if="name.errorMessage.value" class="text-xs text-red-500">{{
              name.errorMessage.value
            }}</span>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
              Email Address <span class="text-red-500">*</span>
            </label>
            <CustomInput v-model="email.value.value" name="email" type="email" placeholder="Enter here" />
            <span v-if="email.errorMessage.value" class="text-xs text-red-500">{{ email.errorMessage.value }}</span>
          </div>
          <!-- Contact Field -->
          <div>
            <label for="phone" class="text-gray-200 font-medium cursor-pointer">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <CustomInput id="phone" v-model="phone.value.value" name="phone" placeholder="Enter here" />
            <span v-if="phone.errorMessage.value" class="text-xs text-red-500">{{ phone.errorMessage.value }}</span>
          </div>
          <div>
            <label
              for="website"
              class="text-gray-200 font-medium cursor-pointer text-sm md:text-base"
            >
              Website
            </label>
            <CustomInput
              v-model="website.value.value"
              name="website"
              type="text"
              placeholder="Enter here"
            />
          </div>
          <!-- Message Field -->
          <div>
            <label for="help" class="text-gray-200 font-medium cursor-pointer text-sm md:text-base">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea v-model="help.value.value" name="help"
              class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{
                'border-red-500': help.errorMessage.value,
                'border-[#43484C]': !help.errorMessage.value,
              }" placeholder="Enter Here" rows="4"></textarea>
            <span v-if="help.errorMessage.value" class="text-xs text-red-500">{{
              help.errorMessage.value
            }}</span>
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
                <a href="/policies/terms-of-service" class="text-blue-500 underline text-sm" target="">
                  Terms and Conditions
                </a>
                <span class="text-red-500">*</span>
              </label>
            </div>

            <p v-if="terms.errorMessage.value" class="text-xs text-red-500">
              {{ terms.errorMessage.value }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center lg:px-14">
            <CustomButton variant="secondary" type="submit" :disabled="loading" class="mt-4 w-full">
              {{ loading ? "SENDING..." : "GET IN TOUCH" }}
            </CustomButton>
          </div>

          <!-- Error Message -->
          <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
