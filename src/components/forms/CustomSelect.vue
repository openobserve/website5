<script>
import { Field } from "vee-validate";

export default {
  name: "CustomSelect",
  components: {
    Field,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
<!-- CustomSelect.vue -->
<template>
  <div class="input-group">
    <label :for="name" class="text-sm text-gray-200">{{ label }}</label>
    <Field :name="name" v-slot="{ field, errorMessage }">
      <select
        v-bind="field"
        :id="name"
        class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span v-if="errorMessage" class="text-xs text-red-500">{{
        errorMessage
      }}</span>
    </Field>
  </div>
</template>
