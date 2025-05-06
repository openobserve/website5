<template>
  <div class="w-full rounded-b-lg">
    <div class="w-full bg-white p-6 rounded-lg border-2 border-gray-300 shadow-lg flex items-center justify-between">
      <!-- Default Slot where the parent passes all content -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomHoverHeader",
};
</script>