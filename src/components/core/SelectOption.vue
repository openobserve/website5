<template>
  <div class="space-y-2 w-full">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        class="w-full bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2  appearance-none"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-if="latest"
          :value="latest.value"
          disabled
          class="font-semibold "
        >
          Latest ({{ latest.label }})
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option?.value"
          :selected="option?.value === modelValue"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label?: string;
  id?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  latest?: {
    value: string;
    label: string;
  };
}>();

defineEmits(["update:modelValue"]);

</script>
<style scoped>
  select {
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none;
    -moz-appearance: none;

    background-color: #ffffff;
    border: 1px solid #e7e7e7;
    padding: 10px 8px;
    border-radius: 6px;
    font-size: 14px;
    color: #111827;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' fill='none' stroke='%23333' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
  }

  select:focus {
    outline: invert;
    border-color: #5e5f64;
    box-shadow: 0 0 0 2px rgba(90, 91, 93, 0.3);
  }

  option {
    background: white;
    color: #111827;
    padding: 10px;
  }
</style>