<script setup>
import CustomButton from "../core/CustomButton.vue";
import Heading from "../core/Heading.vue";
import BaseForm from "../forms/BaseForm.vue";
import CustomInput from "../forms/CustomInput.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";
import { defineProps } from "vue";
import { Field } from "vee-validate";
import * as yup from "yup";
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

const schema = yup.object({
  name: yup.string().required("Name is required"),
  companyName: yup.string().required("Company name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

const handleSubmit = (values) => {
  console.log("Form submitted:", values);
};
</script>

<template>
  <!-- backgroundPosition: 'top center, bottom -200px center', -->
  <div
    class="relative flex items-center justify-center min-h-screen px-6 sm:px-12 lg:px-24 bg-no-repeat bg-cover"
    :style="{
      backgroundImage: 'url(/ContactUsTopbg.svg), url(/ContactUsBottombg.svg)',
      backgroundPosition: 'center -200px, bottom center',
      backgroundSize: 'cover, cover',
      backgroundRepeat: 'no-repeat, no-repeat',
    }"
  >
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full container mx-auto"
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
          <BaseForm :schema="schema" :onSubmit="handleSubmit" class="">
            <CustomInput name="name" label="Name" placeholder="Enter here" />

            <CustomInput
              name="email"
              label="Email address"
              type="email"
              placeholder="Enter here"
            />

            <CustomInput
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter here"
            />

            <div class="flex items-center gap-2">
              <Field
                name="terms"
                type="checkbox"
                v-slot="{ field, errorMessage }"
              >
                <div class="flex space-x-2">
                  <input
                    type="checkbox"
                    v-bind="field"
                    class="rounded bg-gray-700 border-gray-600"
                  />
                  <label class="text-sm text-gray-200">
                    I confirm I have read and agree to OpenObserve's
                    <a href="#" class="text-blue-500">Terms and Conditions</a>.
                  </label>
                  <span
                    v-if="errorMessage"
                    class="text-xs text-red-500 block"
                    >{{ errorMessage }}</span
                  >
                </div>
              </Field>
            </div>
            <div class="flex justify-center mt-5">
              <CustomButton variant="secondary" type="submit">
                GET IN TOUCH
              </CustomButton>
            </div>
          </BaseForm>
        </div>
      </div>
    </div>
  </div>
</template>
