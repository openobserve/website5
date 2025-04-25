<template>
  <div class="bg-[url('/img/bg/gradient-bg/MenuTexture.svg')] w-full rounded-lg">
    <div class="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-lg">
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