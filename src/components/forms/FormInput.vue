<script>
export default {
  name: "FormInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text", // Default input type
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "", // Additional custom class
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<template>
  <div class="mb-4">
    <!-- Label -->
    <label :for="id" class="block font-semibold text-[#F4F4F5] text-sm mb-2">
      {{ label }}
    </label>

    <!-- Input -->
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      :class="[
        'w-full py-3 px-4 rounded-lg shadow border appearance-none leading-tight',
        'bg-[#353B40] text-[#F4F4F5] border-[#929A9E] placeholder-[#929A9E]',
        'focus:outline-none focus:bg-[#353B40] focus:border-[#1C99FF] focus:placeholder-[#F4F4F5] focus:text-[#F4F4F5]',
        'hover:bg-[#43484C]',
        inputClass,
      ]"
      @input="updateValue"
    />
  </div>
</template>
