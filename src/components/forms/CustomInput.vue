<!-- CustomInput.vue -->
<template>
  <div class="input-group">
    <label :for="name" class="text-sm text-gray-200">{{ label }}</label>
    <Field
      :name="name"
      :validateOnInput="true"
      :rules="validationRules"
      v-slot="{ field, errorMessage, meta }"
    >
      <div class="relative">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          :id="name"
          class="w-full bg-[#23282C] text-white border border-[#43484C] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errorMessage }"
        />
        <span v-if="errorMessage" class="text-xs text-red-500 mt-1 block">
          {{ getErrorMessage(errorMessage, meta) }}
        </span>
      </div>
    </Field>
  </div>
</template>

<script>
import { Field } from "vee-validate";

export default {
  name: "CustomInput",
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
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    // Custom validation messages
    requiredMessage: {
      type: String,
      default: "This field is required",
    },
    emailMessage: {
      type: String,
      default: "Please enter a valid email address",
    },
    minMessage: {
      type: String,
      default: "Must be at least {min} characters",
    },
    maxMessage: {
      type: String,
      default: "Must not exceed {max} characters",
    },
    // Validation rules
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
  },
  setup(props) {
    const validationRules = (value) => {
      // Empty value check
      if (props.required && (!value || !value.trim())) {
        return props.requiredMessage;
      }

      // Skip other validations if value is empty and not required
      if (!value) return true;

      // Email validation
      if (props.type === "email") {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
          return props.emailMessage;
        }
      }

      // Min length validation
      if (props.min && value.length < props.min) {
        return props.minMessage.replace("{min}", props.min);
      }

      // Max length validation
      if (props.max && value.length > props.max) {
        return props.maxMessage.replace("{max}", props.max);
      }

      return true;
    };

    const getErrorMessage = (errorMessage, meta) => {
      if (!meta.dirty && !meta.touched) {
        return "";
      }
      return errorMessage;
    };

    return {
      validationRules,
      getErrorMessage,
    };
  },
};
</script>
