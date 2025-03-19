<template>
  <!-- Sticky Header -->
  <header class="sticky top-0 z-50">
    <div class="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-2">
      <Logo />
      <nav>
        <ul class="flex items-center space-x-0.5 w-full">
          <li class="relative" @mouseenter="handleMenuHover('platform')" @mouseleave="handleMenuLeave('platform')">
            <a href="/platform" class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="activeMenu === 'platform' ? 'bg-gray-600/50' : 'bg-transparent'">
              Platform
            </a>
          </li>
          <li class="relative" @mouseenter="handleMenuHover('solution')" @mouseleave="handleMenuLeave('solution')">
            <a href="/solutions" class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="activeMenu === 'solution' ? 'bg-gray-600/50' : 'bg-transparent'">
              Solutions
            </a>
          </li>
          <li class="relative" @mouseenter="handleMenuHover('resources')" @mouseleave="handleMenuLeave('resources')">
            <a href="/resources" class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="activeMenu === 'resources' ? 'bg-gray-600/50' : 'bg-transparent'">
              Resources
            </a>
          </li>
          <li class="relative" @mouseenter="handleMenuHover('company')" @mouseleave="handleMenuLeave('company')">
            <a href="/about" class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="activeMenu === 'company' ? 'bg-gray-600/50' : 'bg-transparent'">
              Company
            </a>
          </li>
          <li class="relative">
            <a href="/downloads"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all hover:bg-gray-600/50">
              Downloads
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center space-x-2">
        <!-- <div
          class="relative rounded-xl hover:bg-gradient-to-r hover:from-[#3E93D9] hover:to-[#99CAE9] transition"
          @click="onSearchClick"
          ref="searchWrapper"
        >
          <img
            src="/img/icon/search.svg"
            alt="Search Icon"
            class="cursor-pointer w-full h-full object-cover p-2.5"
          />
        </div> -->
        <a class="rounded-[4px] transition flex items-center border border-[#3d444d]"
          href="https://short.openobserve.ai/community" target="_blank">
          <img src="/img/icon/slackIcon.svg" alt="Search Icon"
            class="cursor-pointer w-[1.6rem] h-[1.6rem] object-cover p-1" />
        </a>
        <!-- GitHub Stats Section -->
        <GithubButton href="https://github.com/openobserve/openobserve" data-color-scheme="dark" data-size="large"
          data-show-count="true" aria-label="Star openobserve/openobserve on GitHub" class="pt-1.5">Star</GithubButton>
        <CustomButton variant="secondary" size="small" buttonLink="https://cloud.openobserve.ai" target="_blank">
          LOG IN
        </CustomButton>
        <CustomButton variant="primary" size="small" buttonLink="/demo">
          GET DEMO
        </CustomButton>
      </div>
    </div>
    <!-- Dropdown Menus -->
    <div class="absolute top-full flex justify-center translate-x-[15%] w-[80%] xl:w-3/4 container mx-auto"
      v-if="activeMenu === 'platform'" @mouseenter="handleMenuHover('platform')">
      <CustomHoverHeader @mouseleave="handleMenuLeave('platform')">
        <div>
          <a class="text-xl font-bold text-[#FFFFFF]">
            {{ items.platform.title }}
          </a>
          <div class="w-full flex justify-between flex-col md:flex-row gap-2 pt-4">
            <div class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div v-for="(item, index) in items.platform.items" :key="index">
                <SectionHeader :title="item.title" :items="item.items" :link="item.link" />
              </div>
            </div>
            <div class="flex flex-col space-y-1 w-full md:w-1/3">
              <a :href="items?.platform?.keyFeature?.link"
                class="text-[#FFFFFF] text-base font-semibold gradient-hover">
                {{ items.platform.keyFeature.title }}
              </a>
              <div class="w-full bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <!-- <SectionHeader :items="items.platform.keyFeature.items" /> -->
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
          <div class="flex flex-row gap-2 mt-6 w-4/5">
            <div class="w-[55%]">
              <CustomHeaderButton title="Full Stack Observability Platform" linkTitle="View Platform"
                link="/platform" />
            </div>
            <a href="/pricing"
              class="p-4 bg-black bg-opacity-40 card-border w-1/4 flex justify-center cursor-pointer">Pricing</a>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div class="absolute top-full flex justify-center w-[60%] xl:w-1/2 left-[25%] container mx-auto"
      v-if="activeMenu === 'solution'" @mouseenter="handleMenuHover('solution')">
      <CustomHoverHeader @mouseleave="handleMenuLeave('solution')">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row w-full space-x-4 p-4">
            <!-- Use Case Column -->
            <div class="flex flex-col space-y-3 w-2/3">
              <h4 class="text-[#FFFFFF] text-base font-semibold">Use Case</h4>
              <div class="mt-3">
                <ul class="grid grid-cols-2 gap-4">
                  <li v-for="(item, index) in items.solutions.useCases" :key="index" class="text-[#BEC0C2] text-sm">
                    <a :href="`/solutions/${item.link}`" :class="item.link ? 'gradient-hover' : ''">{{ item.title }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- By Team Column -->
            <div class="flex flex-col space-y-3 w-1/3">
              <div class="flex flex-col space-y-2">
                <h4 class="text-[#FFFFFF] text-base font-semibold">By Team</h4>
                <div>
                  <ul class="flex flex-col space-y-4">
                    <li v-for="(item, index) in items.solutions.byTeam" :key="index" class="text-[#BEC0C2] text-sm">
                      <a :href="`/solutions/${item.link}`" :class="item.link ? 'gradient-hover' : ''">{{ item.title
                      }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Sandbox Column -->
              <div>
                <a :href="items?.solutions?.sandbox?.link">{{
                  items?.solutions?.sandbox?.title
                }}</a>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="w-4/5 xl:w-[60%]">
              <CustomHeaderButton title="Full Stack Observability Solutions" linkTitle="View Solutions"
                link="/solutions" />
            </div>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div class="absolute top-full flex justify-center w-[60%] xl:w-[30%] left-[40%] container mx-auto"
      v-if="activeMenu === 'resources'" @mouseenter="handleMenuHover('resources')">
      <CustomHoverHeader @mouseleave="handleMenuLeave('resources')">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row space-x-14">
            <div>
              <!-- <ul
                class=""
                v-for="(item, index) in items.resources.item1"
                :key="index"
              >
                <li class="cursor-pointer flex flex-col space-y-2">
                  <a :href="item.link" class="text-lg font-bold">{{
                    item.title
                  }}</a>
                </li>
              </ul> -->
              <ul class="flex flex-col space-y-2">
                <li class="cursor-pointer text-[#BEC0C2] text-base gradient-hover">
                  <a href="https://openobserve.ai/docs/" class="text-[#BEC0C2] text-sm gradient-hover"
                    target="_blank">Documentation</a>
                </li>
                <li class="cursor-pointer">
                  <a href="/blog" class="text-[#BEC0C2] text-sm gradient-hover">Blog</a>
                </li>
                <li class="cursor-pointer">
                  <a href="/faqs" class="text-[#BEC0C2] text-sm gradient-hover">Frequently Asked Questions</a>
                </li>
                <li class="cursor-pointer">
                  <a href="/case-studies" class="text-[#BEC0C2] text-sm gradient-hover">Case Studies and
                    testimonials</a>
                </li>
              </ul>
            </div>
            <!-- <div
              class="flex flex-col space-y-3"
              v-for="(item, index) in items.resources.item2"
              :key="index"
            >
              <h4 class="text-base font-bold">
                {{ item.title }}
              </h4>
              <ul class="" v-for="(it, index) in item.items" :key="index">
                <li class="cursor-pointer flex flex-col space-y-2">
                  <a
                    :href="it.link"
                    class="gradient-hover text-sm text-[#BEC0C2]"
                    >{{ it.title }}</a
                  >
                </li>
              </ul>
            </div> -->
          </div>
          <div class="flex justify-center">
            <div class="w-full">
              <CustomHeaderButton title="Check out our resource library" linkTitle="View Resources" link="/resources" />
            </div>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div class="absolute top-full flex justify-center left-[48%] w-52 container mx-auto" v-if="activeMenu === 'company'"
      @mouseenter="handleMenuHover('company')">
      <CustomHoverHeader @mouseleave="handleMenuLeave('company')">
        <ul class="flex flex-col space-y-2">
          <li v-for="(item, index) in items?.company?.items" :key="index" class="text-[#BEC0C2] text-sm">
            <a :href="item.link" :class="item.link ? 'gradient-hover' : ''">{{
              item.title
            }}</a>
          </li>
        </ul>
      </CustomHoverHeader>
    </div>
    <!-- <div
      class="absolute top-full flex justify-center left-[48%] w-52 container mx-auto"
      v-if="isCommunityOpen"
      @mouseenter="onCommunityMenuHover"
    >
      <CustomHoverHeader @mouseleave="onCommunityMenuMouseLeave">
        <ul class="flex flex-col space-y-2">
          <li
            v-for="(item, index) in items?.company"
            :key="index"
            class="text-[#BEC0C2] text-sm"
          >
            <a :href="item.link" :class="item.link ? 'gradient-hover' : ''">{{
              item.title
            }}</a>
          </li>
        </ul>
      </CustomHoverHeader>
    </div> -->
    <div class="absolute top-full translate-x-[54%] bg-[#23282C] rounded-lg p-3 w-full lg:w-1/2" v-if="isOpenSearch"
      @click.stop>
      <div
        class="flex flex-row w-full space-x-2 justify-between items-center bg-black text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer">
        <img src="/img/icon/search.svg" alt="Search Icon" class="" />
        <input type="text" class="w-full bg-transparent focus:outline-none text-white text-sm bg-none placeholder-white"
          placeholder="Search here" />
        <button @click="isOpenSearch = false" class="text-white">
          <img src="/img/icon/close.svg" alt="Search Icon" class="" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "../core/Logo.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomHoverHeader from "./CustomHoverHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";
import SectionHeader from "./SectionHeader.vue";
import { defineProps, ref, onMounted, onUnmounted } from "vue";
import GithubButton from "vue-github-button";
import { slugify } from "@/utils/slugify";

defineProps({
  items: {
    type: Object,
    required: true,
  },
});

// Single state for active menu
const activeMenu = ref(null);
const isOpenSearch = ref(false);
const searchWrapper = ref(null);

// Single timeout reference for all menus
const menuTimeout = ref(null);

// Unified menu hover handler
const handleMenuHover = (menuName) => {
  clearTimeout(menuTimeout.value);
  activeMenu.value = menuName;
};

// Unified menu leave handler
const handleMenuLeave = (menuName) => {
  menuTimeout.value = setTimeout(() => {
    // Only close if the currently active menu is the one being left
    if (activeMenu.value === menuName) {
      activeMenu.value = null;
    }
  }, 300);
};

const onSearchClick = () => {
  isOpenSearch.value = !isOpenSearch.value;
};

const handleClickOutside = (event) => {
  // Close search bar if clicked outside
  if (searchWrapper.value && !searchWrapper.value.contains(event.target)) {
    isOpenSearch.value = false;
  }
};

// Attach and detach the event listener
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<style scoped>
.gradient-hover {
  display: inline-block;
}

.gradient-hover:hover {
  background: linear-gradient(to left,
      rgb(var(--blue-light)),
      rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-hover:hover {
  background: linear-gradient(to left, #09e6ff, #00ffc3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}

/* 
.glass-card {
  position: relative;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 8px 16px;
}

.glass-card:hover {
  background: rgba(72, 71, 71, 1);
   backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background 0.3s ease;
} */
</style>
<style>
body {
  /* margin-top: 10vh; Adjust this value based on your header height */
}
</style>
