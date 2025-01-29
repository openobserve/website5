<script setup>
import { ref, onMounted } from "vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  formFields: {
    type: Array,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  buttonVariant: {
    type: String,
    default: "primary",
  },
});

const formData = ref({});

// Initialize form data
onMounted(() => {
  props.formFields.forEach((field) => {
    formData.value[field.name] = field.type === "checkbox" ? false : "";
  });
});

const onSubmit = () => {
  console.log("Form submitted with data:", formData.value);
};
</script>

<template>
  <div class="md:w-1/2 p-6 rounded-lg shadow-md">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div
        v-for="(field, index) in formFields"
        :key="index"
        class="flex flex-col"
      >
        <label :for="field.name" class="text-white font-medium mb-1">
          {{ field.label }}
        </label>
        <input
          v-if="field.type === 'text'"
          :type="field.type"
          :id="field.name"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
          class="bg-[#23282C] border border-[#373a3d] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-else-if="field.type === 'select'"
          :id="field.name"
          v-model="formData[field.name]"
          class="bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
          class="bg-[#23282C] border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Checkbox -->
      <div class="flex items-start gap-3">
        <input
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
        <CustomButton :variant="buttonVariant" type="submit">
          {{ buttonText }}
        </CustomButton>
      </div>
    </form>
  </div>
</template>
