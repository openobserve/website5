<script setup>
import { onMounted, onUnmounted, ref,defineEmits } from 'vue'

const searchWrapper = ref(null)

const onSearchClick = () => {
  window.dispatchEvent(new Event('open-search-modal'));
};

// const handleClickOutside = (event) => {
//   // Close search bar if clicked outside
//   if (searchWrapper.value && !searchWrapper.value.contains(event.target)) {
//     emit('open-search', false); // Dispatch event to close modal
//   }
// };

// // Attach and detach the event listener
// onMounted(() => {
//   document.addEventListener('click', handleClickOutside);
// });

// onUnmounted(() => {
//   document.removeEventListener('click', handleClickOutside);
// });
</script>

<template>
  <div
    class="relative rounded-xl hover:bg-gradient-to-r hover:from-[#3E93D9] hover:to-[#99CAE9] transition"
    @click="onSearchClick"
    ref="searchWrapper"
  >
    <img
      src="/img/icon/search.svg"
      alt="Search Icon"
      class="cursor-pointer w-full h-full object-cover p-2.5"
    />
  </div>
</template>
