<template>
  <header class="bg-black flex flex-col z-50 relative">
    <div class="relative">
      <div class="flex justify-between items-center p-2">
        <Logo />
        <div class="flex items-center space-x-2">
          <!-- <div
            class="relative rounded-xl"
            @click="onSearchClick"
            ref="searchWrapper"
          >
            <img
              src="/img/icon/search.svg"
              alt="Search Icon"
              class="cursor-pointer w-full h-full object-cover p-2.5"
            />
          </div> -->
          <a class="rounded-md transition flex items-center border -mt-0.5 border-[#3d444d]"
            href="https://short.openobserve.ai/community" target="_blank">
            <img src="/img/icon/slackIcon.svg" alt="Slack Icon" class="cursor-pointer w-5 h-5 object-cover p-1" />
          </a>
          <GithubButton href="https://github.com/openobserve/openobserve" data-color-scheme="dark" data-size="small"
            data-show-count="false" aria-label="Star openobserve/openobserve on GitHub" class="">Star</GithubButton>
          <a href="https://cloud.openobserve.ai" class="text-white text-xs" target="_blank">LOG IN</a>
          <!-- <CustomButton
            variant="tertiary"
            size="small"
            buttonLink="https://cloud.openobserve.ai"
            target="_blank"
            btn-class="p-0"
            >LOG IN</CustomButton
          > -->
          <div class="cursor-pointer h-7 w-7 flex items-center" @click="toggleMenu">
            <img :src="menuState.isOpen ? '/img/icon/close.svg' : '/img/icon/navmenu.svg'"
              alt="Mobile View Menu Icon" class="" />
          </div>
        </div>
      </div>
      <div class="absolute top-full left-0 right-0 bg-[#23282C] rounded-lg p-3 w-full" v-if="searchState.isOpen" @click.stop>
        <div
          class="flex flex-row w-full space-x-2 justify-between items-center bg-black text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer">
          <img src="/img/icon/search.svg" alt="Search Icon" class="" />
          <input type="text" class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-white"
            placeholder="Search here" />
          <button @click="closeSearch" class="text-white">
            <img src="/img/icon/close.svg" alt="close Icon" class="" />
          </button>
        </div>
      </div>
      <div v-if="menuState.isOpen" class="w-full h-screen bg-black">
        <!-- Main Menu -->
        <div v-if="!menuState.activeSubMenu" class="w-full h-full flex flex-col items-center space-y-4 bg-black overflow-y-auto">
          <ul class="w-full flex flex-col space-y-4 p-4">
            <li v-for="(item, index) in navHeading" :key="index" class="flex flex-col space-y-4">
              <div class="flex flex-row items-center justify-between w-full cursor-pointer"
                @click="openSubMenu(item)">
                <h4 class="text-gray-300 text-lg md:text-xl font-semibold">
                  {{ item }}
                </h4>
                <img src="/img/icon/subMenuIcon.svg" alt="Arrow Icon" class="w-4 h-4" />
              </div>
              <div class="w-full flex justify-center h-0.5" style="
                  background: linear-gradient(
                    90deg,
                    rgba(1, 1, 1, 0) 0%,
                    #595d62 25.5%,
                    #595d62 70%,
                    rgba(1, 1, 1, 0) 100%
                  );
                "></div>
            </li>
          </ul>
          <div class="flex flex-col justify-center w-full items-center space-y-4 pt-20 mx-auto px-10">
            <CustomButton class="w-full" variant="secondary" size="large" buttonLink="/downloads">DOWNLOADS
            </CustomButton>
            <CustomButton class="w-full" variant="primary" size="large" buttonLink="/demo">GET DEMO</CustomButton>
          </div>
        </div>

        <!-- Submenu Content -->
        <div v-if="menuState.activeSubMenu" style="
            background-image:
              url(&quot;/img/bg/gradient-bg/mobilenavBg1.svg&quot;),
              url(&quot;/img/bg/gradient-bg/mobilenavBg2.svg.svg&quot;);
            background-position: top, bottom;
            background-repeat: no-repeat, no-repeat;
            background-size: cover, cover;
          " class="h-[calc(100svh-60px)] w-full text-white overflow-y-auto">
          <div class="flex items-center px-4 py-2">
            <button class="text-gray-300" @click="closeSubMenu">
              <img src="/img/icon/NavBack.svg" alt="Back Icon" class="w-5 h-5" />
            </button>
            <h4 class="text-[#BEC0C2] text-2xl font-semibold ml-2">
              {{ menuState.activeSubMenu }}
            </h4>
          </div>
          <div class="p-4 h-full">
            <div v-show="menuState.activeSubMenu === 'Platform'" class="flex flex-col space-y-4">
              <div class="flex flex-col items-center justify-between space-y-4">
                <CustomHeaderButton title="Full Stack Observability Platform" linkTitle="View Platform"
                  link="/platform" />
                <a class="p-4 bg-black bg-opacity-40 card-border w-full lg:w-[40%] flex justify-center cursor-pointer"
                  href="/pricing">Pricing</a>
              </div>
              <div class="flex justify-center">
                <h3 class="text-xl font-bold pb-2 text-[#FFFFFF]">
                  {{ items.platform.title }}
                </h3>
              </div>
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(item, index) in items.platform.items" :key="index">
                  <SectionHeader :title="item.title" :items="item.items" :link="item.link" />
                </div>
              </div>
              <div class="flex flex-col justify-center items-center space-y-1">
                <a :href="items?.platform?.keyFeature?.link"
                  class="text-[#FFFFFF] text-base font-semibold gradient-hover">
                  {{ items.platform.keyFeature.title }}
                </a>
                <div class="w-full bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                  <ul class="space-y-1 xl:space-y-2">
                    <li v-for="(item, index) in items.platform.keyFeature.items" :key="index"
                      class="text-[#BEC0C2] text-sm">
                      <a :href="`/key-features#${slugify(item.title)}`" :class="item.title ? 'gradient-hover' : ''">
                        {{ item.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-show="menuState.activeSubMenu === 'Solutions'" class="flex flex-col space-y-4">
              <CustomHeaderButton title="Full Stack Observability Solutions" linkTitle="View Solutions"
                link="/solutions" />
              <div class="flex flex-col space-y-3">
                <h4 class="text-[#FFFFFF] text-base font-semibold">Use Case</h4>
                <div class="mt-3">
                  <ul class="grid grid-cols-1 gap-2">
                    <li v-for="(item, index) in items.solutions.useCases" :key="index"
                      class="text-theme-secondaryFont text-base">
                      <a :href="`/solutions/${item.link}`" :class="item?.link ? 'gradient-hover' : ''">{{ item.title }}</a>
                    </li>
                  </ul>
                </div>
                <div class="flex flex-col space-y-2">
                  <h4 class="text-[#FFFFFF] text-base font-semibold">
                    By Team
                  </h4>
                  <div>
                    <ul class="flex flex-col space-y-2">
                      <li v-for="(item, index) in items.solutions.byTeam" :key="index"
                        class="text-theme-secondaryFont text-base">
                        <a :href="`/solutions/${item.link}`" :class="item.link ? 'gradient-hover' : ''">{{ item.title }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="menuState.activeSubMenu === 'Resources'" class="flex flex-col space-y-4">
              <CustomHeaderButton title="Full Stack Observability Resources" linkTitle="View Resources"
                link="/resources" />
              <div class="flex flex-col space-y-3">
                <div>
                  <ul class="flex flex-col space-y-2">
                    <li class="cursor-pointer">
                      <a href="https://openobserve.ai/docs/" class="text-theme-secondaryFont text-base gradient-hover"
                        target="_blank">Documentation</a>
                    </li>
                    <li class="cursor-pointer">
                      <a href="/blog" class="text-theme-secondaryFont text-base gradient-hover">Blog</a>
                    </li>
                    <li class="cursor-pointer">
                      <a href="/faqs" class="text-theme-secondaryFont text-base gradient-hover">Frequently Asked
                        Questions</a>
                    </li>
                    <li class="cursor-pointer">
                      <a href="/case-studies" class="text-theme-secondaryFont text-base gradient-hover">Case Studies and
                        testimonials</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-show="menuState.activeSubMenu === 'Company'" class="flex flex-col space-y-4">
              <ul class="flex flex-col space-y-3">
                <li v-for="(item, index) in items?.company?.items" :key="index"
                  class="text-theme-secondaryFont text-base">
                  <a :href="item.link" :class="item.link ? 'gradient-hover' : ''">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, onUnmounted } from "vue";
import Logo from "../core/Logo.vue";
import CustomButton from "../core/CustomButton.vue";
import SectionHeader from "./SectionHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";
import { slugify } from "@/utils/slugify";
import GithubButton from "vue-github-button";

defineProps({
  items: {
    type: Object,
    required: true,
  },
});

// Consolidated menu state
const menuState = reactive({
  isOpen: false,
  activeSubMenu: null,
});

// Consolidated search state
const searchState = reactive({
  isOpen: false,
});

// Menu items
const navHeading = ["Platform", "Solutions", "Resources", "Company"];

// Search reference
const searchWrapper = ref(null);

// Toggle main menu
const toggleMenu = () => {
  menuState.isOpen = !menuState.isOpen;
  
  // Reset submenu state when closing the menu
  if (!menuState.isOpen) {
    menuState.activeSubMenu = null;
  }
};

// Open a submenu
const openSubMenu = (item) => {
  menuState.activeSubMenu = item;
};

// Close submenu and return to main menu
const closeSubMenu = () => {
  menuState.activeSubMenu = null;
};

// Close search
const closeSearch = () => {
  searchState.isOpen = false;
};

// Handle clicks outside search area
const handleClickOutside = (event) => {
  if (searchWrapper.value && !searchWrapper.value.contains(event.target)) {
    searchState.isOpen = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}

.gradient-hover {
  display: inline-block;
}

.gradient-hover:hover {
  background: linear-gradient(to left, #09e6ff, #00ffc3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>