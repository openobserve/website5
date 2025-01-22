<template>
  <header class="bg-black flex flex-col sticky top-0 z-50">
    <div class="">
      <div class="flex justify-between items-center p-4">
        <Logo />
        <div class="flex items-center space-x-1">
          <CustomButton variant="tertiary">LOGIN IN</CustomButton>
          <div class="cursor-pointer" @click="onMenuClick">
            <img
              :src="isMenuOpen ? '/close.svg' : '/navmenu.svg'"
              alt="Mobile View Menu Icon"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div v-if="isMenuOpen" class="w-full h-full ">
        <!-- Main Menu -->
        <div
          v-if="!activeSubMenu"
          class="w-full flex flex-col items-center space-y-4"
        >
          <ul class="w-full flex flex-col space-y-4 p-4">
            <li
              v-for="(item, index) in navHeading"
              :key="index"
              class="flex flex-col space-y-4"
            >
              <div
                class="flex flex-row items-center justify-between w-full cursor-pointer"
                @click="onSubMenuClick(item)"
              >
                <h4 class="text-gray-300 text-2xl font-semibold">
                  {{ item }}
                </h4>
                <img src="/subMenuIcon.svg" alt="Arrow Icon" class="w-4 h-4" />
              </div>
              <div
                class="w-full flex justify-center h-0.5"
                style="
                  background: linear-gradient(
                    90deg,
                    rgba(1, 1, 1, 0) 0%,
                    #595d62 25.5%,
                    #595d62 70%,
                    rgba(1, 1, 1, 0) 100%
                  );
                "
              ></div>
            </li>
          </ul>
          <div class="flex flex-col space-y-4 w-full pt-20 px-4">
            <CustomButton variant="secondary" size="large"
              >DOWNLOAD</CustomButton
            >
            <CustomButton variant="primary" size="large">GET DEMO</CustomButton>
          </div>
        </div>

        <!-- Submenu Content -->
        <div v-if="activeSubMenu" class="h-screen w-full bg-black text-white">
          <div class="flex items-center px-4 py-2">
            <button class="text-gray-300" @click="closeSubMenu">
              <img src="/NavBack.svg" alt="Back Icon" class="w-5 h-5" />
            </button>
            <h4 class="text-white text-2xl font-semibold ml-2">
              {{ activeSubMenu }}
            </h4>
          </div>
          <div class="p-4">
            <div v-show="activeSubMenu === 'Platform'" class="flex flex-col space-y-4">
              <div>
                <CustomHeaderButton
                  title="Full Stack Observability Platform"
                  linkTitle="View Platform"
                />
              </div>
              <div class="w-full grid grid-cols-1 gap-6 ">
                <div v-for="(item, index) in items.platform.items" :key="index">
                  <SectionHeader :title="item.title" :items="item.items" />
                </div>
              </div>
              <div class="w-full bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <SectionHeader
                  :title="items.platform.keyFeature.title"
                  :items="items.platform.keyFeature.items"
                />
              </div>
            </div>
            <div v-show="activeSubMenu === 'Solution'">
              dfmdmdfmdkfmdswkddmkdfknf.fkng.kfn.gbm/gmb/gh
              <div v-show="activeSubMenu === 'Resources'">
                dfmdmdfmdkfmdswedkcfvlb,hln,jl,mlmgfkwndwjksbnjl
                bjldbfjkfbjkchbhsjcbkd bdabfcehjf
              </div>
              <div v-show="activeSubMenu === 'Company'">
                dfmdmdfmdkfmdsdfrkgmglkmfknkndwkj.dnwkdkjwdkwdhwkhdnw,kd,wkdh,kdhj
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref,defineProps } from "vue";
import Logo from "../core/Logo.vue";
import CustomButton from "../core/CustomButton.vue";
import SectionHeader from "./SectionHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";

defineProps({
  items: Object,
  required: true,
});
// Menu items
const navHeading = ["Platform", "Solution", "Resources", "Company"];

// Reactive states
const isMenuOpen = ref(false);
const activeSubMenu = ref(null); // Tracks the currently active submenu

// Toggle main menu
const onMenuClick = () => {
  isMenuOpen.value = !isMenuOpen.value;

  // Reset submenu state when closing the menu
  if (!isMenuOpen.value) {
    activeSubMenu.value = null;
  }
};

// Open a submenu
const onSubMenuClick = (item) => {
  activeSubMenu.value = item;
};

// Close submenu and return to main menu
const closeSubMenu = () => {
  activeSubMenu.value = null;
};
</script>
