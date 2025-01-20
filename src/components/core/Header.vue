<script setup>
import CustomButton from "./CustomButton.vue";
</script>

<template>
  <header
    class="bg-black text-white flex items-center justify-between px-4 py-3 sm:px-6 md:py-4"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img src="/Open Observe Logo.svg" alt="Logo" class="h-8 w-auto md:h-10" />
    </div>

    <!-- Navigation -->
    <nav
      class="hidden md:flex items-center space-x-6 text-[#BEC0C2] font-inter font-semibold text-sm"
    >
      <a href="#" class="hover:text-white transition">Platform</a>
      <a href="#" class="hover:text-white transition">Solution</a>
      <a href="#" class="hover:text-white transition">Resources</a>
      <a href="#" class="hover:text-white transition">Company</a>
    </nav>

    <!-- Actions -->
    <div class="flex items-center space-x-2 md:space-x-4">
      <!-- CustomButton Components -->
      <CustomButton
        variant="tertiary"
        class="text-xs sm:text-sm font-semibold"
      >
        LOGIN IN
      </CustomButton>
      <CustomButton
        variant="secondary"
        class="text-xs sm:text-sm font-semibold"
      >
        DOWNLOAD
      </CustomButton>
      <CustomButton
        variant="primary"
        class="text-xs sm:text-sm font-semibold"
      >
        GET DEMO
      </CustomButton>
    </div>

    <!-- Mobile Menu Button (for smaller screens) -->
    <button
      class="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 5h18M3 12h18m-6 7h6"
        />
      </svg>
    </button>
  </header>
</template>

<style scoped>
/* Add custom styles only if absolutely necessary */
</style>
