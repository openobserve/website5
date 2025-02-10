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
  help: yup.string(),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
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
      "https://run.mocky.io/v3/a2626aa7-8f2d-4ef4-a811-bcf7fa85d9d3",
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
      console.log("Email sent successfully!");
      // Navigate to success page or another route
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
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <CustomInput
        v-model="name.value.value"
        name="name"
        label="Name"
        placeholder="Enter here"
      />
      <span v-if="name.errorMessage.value" class="text-xs text-red-500">{{
        name.errorMessage.value
      }}</span>

      <CustomInput
        v-model="email.value.value"
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter here"
      />
      <span v-if="email.errorMessage.value" class="text-xs text-red-500">{{
        email.errorMessage.value
      }}</span>

      <div class="input-group">
        <label class="text-sm text-gray-200">Message</label>
        <textarea
          v-model="help.value.value"
          name="help"
          class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Here"
          rows="4"
        ></textarea>
      </div>

      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          v-model="terms.value.value"
          class="rounded bg-gray-700 border-gray-600"
        />
        <label class="text-sm text-gray-200">
          I confirm I have read and agree to OpenObserve's
          <a href="#" class="text-blue-500">Terms and Conditions</a>.
        </label>
      </div>
      <span v-if="terms.errorMessage.value" class="text-xs text-red-500">{{
        terms.errorMessage.value
      }}</span>

      <CustomButton variant="secondary" type="submit">
        GET IN TOUCH
      </CustomButton>
    </form>
  </div>
</template>
