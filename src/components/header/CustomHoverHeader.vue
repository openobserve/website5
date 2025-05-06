<template>
  <div class="w-full rounded-b-lg">
    <div class="w-full bg-white p-6 rounded-b-lg">
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