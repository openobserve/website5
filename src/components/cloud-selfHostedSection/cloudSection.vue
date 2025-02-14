<script setup>
import { Field } from "vee-validate";
import * as yup from "yup";
import BaseForm from "../forms/BaseForm.vue";
import CustomInput from "../forms/CustomInput.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomSeprater from "../core/CustomSeprater.vue";

const props = defineProps({
  title:{
    type: String,
    required: true,
  },
  items:{
    type: Array,
    required: true,
  },
  bottomTitle:{
    type: String,
    required: true,
  },
  bottomDescription:{
    type: String,
    required: true,
  },
});

// Define the validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});
const handleSubmit = (values) => {
};

</script>

<template>

  <div class="w-full container mx-auto ">
    <div class="justify-center grid grid-cols-1 lg:grid-cols-2 gap-5">
    <!-- static content -->
      <div class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50">
        <!-- <h2 class="text-xl font-semibold text-white mb-8">Create a free account</h2>
        <BaseForm
          :schema="schema"
          @submit="handleSubmit"
          :validateOnMount="false"
          class="mb-10 space-y-4"
        >
          <div class="space-y-2">
            <Field name="name" v-slot="{ field, errorMessage, meta }">
              <CustomInput v-bind="field" label="Name" placeholder="Enter here" />
              <span
                v-if="errorMessage && (isSubmitted || meta.touched)"
                class="text-xs text-red-500"
              >
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <div class="space-y-2">
            <Field name="terms" type="checkbox" v-slot="{ field, errorMessage, meta }">
              <div class="flex flex-col space-y-2">
                <div class="flex items-start gap-3">
                  <input
                    type="checkbox"
                    v-bind="field"
                    class="mt-1 rounded bg-gray-700 border-gray-600"
                  />
                  <label class="text-sm text-gray-200">
                    I confirm I have read and agree to OpenObserve's
                    <a href="#" class="text-blue-500">Terms and Conditions</a>.
                  </label>
                </div>
                <span
                  v-if="errorMessage && (isSubmitted || meta.touched)"
                  class="text-xs text-red-500"
                >
                  please agree the terms and conditions.
                </span>
              </div>
            </Field>
          </div>

          <CustomButton
            variant="primary"
            type="submit"
            class="py-3 transition-all w-full duration-300 uppercase tracking-wide mt-4"
          >
            CREATE AN ACCOUNT
          </CustomButton>
        </BaseForm> -->
        <h2 class="text-xl md:text-2xl font-semibold text-white text-left mb-4 md:mb-8">
          Create a free account
        </h2>
        <div class="text-sm md:text-md font-medium text-white text-left mb-8">By using this service, you agree to OpenObserve's Terms and Conditions.</div>
        <div class="space-y-4 mb-8 flex flex-col items-center justify-center">
          <a href="https://cloud.openobserve.ai/web/login" class="w-full md:w-80">
            <button
              class="flex justify-start gap-5 md:gap-10 w-full bg-gray-800 text-gray-200 rounded-lg p-2 md:p-3 shadow-md hover:bg-gray-700 transition"
            >
              <img src="/favicon.png" alt="OpenObserve" class="h-6 w-6 mr-3" />
              <span class="font-medium text-sm md:text-base">Try OpenObserve Cloud</span>
            </button>
          </a>
        </div>

        <!-- Commenting out the following for now and replacing with the above snippet to directly navigate to Cloud login page.
        TO-DO - Fix the links below and ensure they all work to login. -->
        <!-- <div class="space-y-4 mb-8 flex flex-col items-center justify-center">
          <a href="https://auth.openobserve.ai/dex/auth/github?client_id=o2-client&redirect_uri=https%3A%2F%2Fcloud.openobserve.ai%2Fconfig%2Fredirect&response_type=code&scope=openid+profile+email+groups+offline_access&state=5cuFXm2a0iMLlHZvJNCJVK9NgTPUNWLp" class="w-full md:w-80">
            <button
              class="flex justify-start gap-5 md:gap-10 w-full bg-gray-800 text-gray-200 rounded-lg p-2 md:p-3 shadow-md hover:bg-gray-700 transition"
            >
              <img src="/download-pricing/github.svg" alt="GitHub" class="h-6 w-6 mr-3" />
              <span class="font-medium text-sm md:text-base">Log in with GitHub</span>
            </button>
          </a>

          <a href="https://auth.openobserve.ai/dex/auth/gitlab?client_id=o2-client&redirect_uri=https%3A%2F%2Fcloud.openobserve.ai%2Fconfig%2Fredirect&response_type=code&scope=openid+profile+email+groups+offline_access&state=5cuFXm2a0iMLlHZvJNCJVK9NgTPUNWLp" class="w-full md:w-80">
            <button
              class="flex items-center justify-start gap-5 md:gap-10 w-full bg-gray-800 text-gray-200 rounded-lg p-2 md:p-3 shadow-md hover:bg-gray-700 transition"
            >
              <img src="/download-pricing/gitlab.svg" alt="GitLab" class="h-6 w-6 mr-3" />
              <span class="font-medium text-sm md:text-base">Log in with GitLab</span>
            </button>
          </a>

          <a href="https://auth.openobserve.ai/dex/auth/google?client_id=o2-client&redirect_uri=https%3A%2F%2Fcloud.openobserve.ai%2Fconfig%2Fredirect&response_type=code&scope=openid+profile+email+groups+offline_access&state=5cuFXm2a0iMLlHZvJNCJVK9NgTPUNWLp" class="w-full md:w-80">
            <button
              class="flex items-center justify-start gap-5 md:gap-10  w-full bg-gray-800 text-gray-200 rounded-lg p-2 md:p-3 shadow-md hover:bg-gray-700 transition"
            >
              <img src="/download-pricing/google.svg" alt="Google" class="h-6 w-6 mr-3" />
              <span class="font-medium text-sm md:text-base">Log in with Google</span>
            </button>
          </a>

          <a href="https://auth.openobserve.ai/dex/auth/microsoft?client_id=o2-client&redirect_uri=https%3A%2F%2Fcloud.openobserve.ai%2Fconfig%2Fredirect&response_type=code&scope=openid+profile+email+groups+offline_access&state=5cuFXm2a0iMLlHZvJNCJVK9NgTPUNWLp" class="w-full md:w-80">
            <button
              class="flex items-center justify-start gap-5 md:gap-10 w-full bg-gray-800 text-gray-200 rounded-lg p-2 md:p-3 shadow-md hover:bg-gray-700 transition"
            >
              <img
                src="/download-pricing/microsoft.svg"
                alt="Microsoft"
                class="h-6 w-6 mr-3"
              />
              <span class="font-medium text-sm md:text-base">Log in with Microsoft</span>
            </button>
          </a>
        </div> -->

        <!-- <CustomSeprater /> -->

        <!-- Login Options -->
        <!-- <div class="pt-8">
          <p class="text-center text-gray-400 text-sm mb-4">Login With</p>
          <div class="flex justify-center gap-4 w-full">
            <button
              class="p-3 bg-[#2A2D31] rounded-lg hover:bg-[#32363B] transition-all duration-200 shadow-lg shadow-black/20"
            >
              <img
                src="/download-pricing/search.svg"
                alt="Search login"
                class="h-10 w-10"
              />
            </button>

            <button
              class="p-3 bg-[#2A2D31] rounded-lg hover:bg-[#32363B] transition-all duration-200 shadow-lg shadow-black/20"
            >
              <img
                src="/download-pricing/downloadGit.svg"
                alt="Frame login"
                class="h-10 w-10"
              />
            </button>

            <button
              class="p-3 bg-[#2A2D31] rounded-lg hover:bg-[#32363B] transition-all duration-200 shadow-lg shadow-black/20"
            >
              <img
                src="/download-pricing/microsoft.svg"
                alt="Microsoft login"
                class="h-10 w-10"
              />
            </button>
          </div>
        </div> -->
      </div>

      <!-- dynamic content -->
      <div class="bg-[#23282c]/40 rounded-lg p-3 md:p-8 border-r border-gray-800/50">
        <div class="mb-6">
          <h4 class="text-white text-xl md:text-2xl font-medium mb-4 md:mb-8">{{ title }}</h4>
        </div>

        <!-- Features List loop -->
        <div class="flex-grow">
          <ul class="space-y-4 mb-8">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="flex gap-3 text-gray-300"
            >
            <span class="text-sm">{{ item.title }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <h4 class="text-white text-lg md:text-xl font-medium py-2">
            {{ bottomTitle }}
          </h4>
          <p class="text-white text-md md:text-lg font-medium py-2">
           {{ bottomDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom focus styles */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom checkbox styles */
input[type="checkbox"] {
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

/* Gradient background animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
</style>
