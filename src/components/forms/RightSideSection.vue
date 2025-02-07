<script setup>
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";
import CustomInput from "./CustomInput.vue";
const formData = ref({
  name: "",
  company: "",
  email: "",
  phone: "",
  support: "Technical",
  message: "",
  terms: false,
});

const onSubmit = () => {
  console.log("Form submitted with data:", formData.value);
};
</script>

<template>
  <div class="md:w-1/2 p-6">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Name -->
      <div class="flex flex-col">
        <label for="name" class="text-white font-medium mb-1">Name</label>
        <CustomInput
          type="text"
          id="name"
          placeholder="Enter here"
          v-model="formData.name"
        />
      </div>

      <!-- Company Name -->
      <div class="flex flex-col">
        <label for="company" class="text-white font-medium mb-1"
          >Company Name</label
        >
        <CustomInput
          type="text"
          id="company"
          placeholder="Enter here"
          v-model="formData.company"
        />
      </div>

      <!-- Email Address -->
      <div class="flex flex-col">
        <label for="email" class="text-white font-medium mb-1"
          >Email Address</label
        >
        <CustomInput
          type="text"
          id="email"
          placeholder="Enter here"
          v-model="formData.email"
        />
      </div>

      <!-- Phone Number -->
      <div class="flex flex-col">
        <label for="phone" class="text-white font-medium mb-1"
          >Phone Number</label
        >
        <CustomInput
          type="text"
          id="phone"
          placeholder="Enter here"
          v-model="formData.phone"
        />
      </div>

      <!-- Support Needed -->
      <div class="flex flex-col">
        <label for="support" class="text-white font-medium mb-1"
          >Support Needed</label
        >
        <select
          id="support"
          v-model="formData.support"
          class="bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <!-- Message -->
      <div class="flex flex-col">
        <label for="message" class="text-white font-medium mb-1">Message</label>
        <textarea
          id="message"
          placeholder="Enter here"
          v-model="formData.message"
          class="bg-[#23282C] border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Terms Checkbox -->
      <div class="flex items-start gap-3">
        <CustomInput
          type="checkbox"
          id="terms"
          v-model="formData.terms"
          class="mt-1"
        />
        <label for="terms" class="text-gray-600">
          I confirm I have read and agree to the
          <a href="#" class="text-blue-500 underline">Terms and Conditions</a>.
        </label>
      </div>

      <!-- Submit Button -->
      <div>
        <CustomButton variant="secondary" type="submit">
          Get In Touch
        </CustomButton>
      </div>
    </form>
  </div>
</template>
