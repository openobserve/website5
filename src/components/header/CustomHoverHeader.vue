<template>
  <div
    class="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-lg space-y-6"
  >
    <!-- Default Slot where the parent passes all content -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CustomHoverHeader",
};
</script>
