<template>
  <!-- Sticky Header -->
  <header class="bg-black drop-shadow-xl sticky top-0 z-50">
    <div class="w-full mx-auto px-4 flex justify-between items-center py-2">
      <Logo />
      <nav>
        <ul class="flex items-center space-x-0.5 w-full">
          <li
            class="relative"
            @mouseenter="onPlatformMenuHover"
            @mouseleave="onPlatformMenuMouseLeave"
          >
            <a
              href="/platform"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="isPlatformMenuOpen ? 'bg-gray-600/50' : 'bg-transparent'"
            >
              Platform
            </a>
          </li>
          <li
            class="relative"
            @mouseenter="onSolutionMenuHover"
            @mouseleave="onSolutionMenuMouseLeave"
          >
            <a
              href="/solutions"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="isSolutionMenuOpen ? 'bg-gray-600/50' : 'bg-transparent'"
            >
              Solutions
            </a>
          </li>
          <li
            class="relative"
            @mouseenter="onResourcesMenuHover"
            @mouseleave="onResourcesMenuMouseLeave"
          >
            <a
              href="/resources"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="isResourcesMenuOpen ? 'bg-gray-600/50' : 'bg-transparent'"
            >
              Resources
            </a>
          </li>
          <li
            class="relative"
            @mouseenter="onCompanyMenuHover"
            @mouseleave="onCompanyMenuMouseLeave"
          >
            <a
              href="/about"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all"
              :class="isCompanyMenuOpen ? 'bg-gray-600/50' : 'bg-transparent'"
            >
              Company
            </a>
          </li>
          <li class="relative">
            <a
              href="/downloads"
              class="text-white font-semibold text-base px-3 py-2 rounded-lg transition-all hover:bg-gray-600/50 "
            >
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
            src="/search.svg"
            alt="Search Icon"
            class="cursor-pointer w-full h-full object-cover p-2.5"
          />
        </div> -->
        <!-- GitHub Stats Section -->
        <!-- <GithubButton
          href="https://github.com/openobserve/openobserve"
          data-color-scheme=""
          data-size="small"
          data-show-count="true"
          aria-label="Star openobserve/openobserve on GitHub"
          >Star</GithubButton
        >

        <GithubButton
          href="https://github.com/openobserve/openobserve/fork"
          data-color-scheme=""
          data-size="small"
          data-show-count="true"
          aria-label="Fork openobserve/openobserve on GitHub"
          >Fork</GithubButton
        > -->
        <CustomButton
          variant="secondary"
          size="small"
          buttonLink="https://cloud.openobserve.ai"
          target="_blank"
        >
          LOG IN
        </CustomButton>
        <CustomButton variant="primary" size="small" buttonLink="/demo">
          GET DEMO
        </CustomButton>
      </div>
    </div>
    <!-- Dropdown Menus -->
    <div
      class="absolute top-full flex justify-center translate-x-[15%] w-[80%] xl:w-3/4 container mx-auto"
      v-if="isPlatformMenuOpen"
      @mouseenter="onPlatformMenuHover"
    >
      <CustomHoverHeader @mouseleave="onPlatformMenuMouseLeave">
        <div>
          <a class="text-xl font-bold text-[#FFFFFF]">
            {{ items.platform.title }}
          </a>
          <div
            class="w-full flex justify-between flex-col md:flex-row gap-2 pt-4"
          >
            <div
              class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            >
              <div v-for="(item, index) in items.platform.items" :key="index">
                <SectionHeader
                  :title="item.title"
                  :items="item.items"
                  :link="item.link"
                />
              </div>
            </div>
            <div class="flex flex-col space-y-1 w-full md:w-1/3">
              <h4 class="text-[#FFFFFF] text-base font-semibold">
                {{ items.platform.keyFeature.title }}
              </h4>
              <div class="w-full bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <!-- <SectionHeader :items="items.platform.keyFeature.items" /> -->
                <ul class="space-y-1 xl:space-y-2">
                  <li
                    v-for="(item, index) in items.platform.keyFeature.items"
                    :key="index"
                    class="text-[#BEC0C2] text-sm"
                  >
                    <div :class="item ? 'text-[#BEC0C2]' : ''">
                      {{ item.title }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2 mt-6 w-4/5">
            <div class="w-[55%]">
              <CustomHeaderButton
                title="Full Stack Observability Platform"
                linkTitle="View Platform"
                link="/platform"
              />
            </div>
            <a
              href="/pricing"
              class="p-4 bg-black bg-opacity-40 card-border w-1/4 flex justify-center cursor-pointer"
              >Pricing</a
            >
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div
      class="absolute top-full flex justify-center w-[60%] xl:w-1/2 left-[25%] container mx-auto"
      v-if="isSolutionMenuOpen"
      @mouseenter="onSolutionMenuHover"
    >
      <CustomHoverHeader @mouseleave="onSolutionMenuMouseLeave">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row w-full space-x-4 p-4">
            <!-- Use Case Column -->
            <div class="flex flex-col space-y-3 w-2/3">
              <h4 class="text-[#FFFFFF] text-base font-semibold">Use Case</h4>
              <div class="mt-3">
                <ul class="grid grid-cols-2 gap-4">
                  <li
                    v-for="(item, index) in items.solutions.useCases"
                    :key="index"
                    class="text-[#BEC0C2] text-sm"
                  >
                    <a
                      :href="`/solutions/${item.link}`"
                      :class="item.link ? 'gradient-hover' : ''"
                      >{{ item.title }}</a
                    >
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
                    <li
                      v-for="(item, index) in items.solutions.byTeam"
                      :key="index"
                      class="text-[#BEC0C2] text-sm"
                    >
                      <a
                        :href="`/solutions/${item.link}`"
                        :class="item.link ? 'gradient-hover' : ''"
                        >{{ item.title }}</a
                      >
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
              <CustomHeaderButton
                title="Full Stack Observability Solutions"
                linkTitle="View Solutions"
                link="/solutions"
              />
            </div>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div
      class="absolute top-full flex justify-center w-[60%] xl:w-[30%] left-[45%] container mx-auto"
      v-if="isResourcesMenuOpen"
      @mouseenter="onResourcesMenuHover"
    >
      <CustomHoverHeader @mouseleave="onResourcesMenuMouseLeave">
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
                <li class="cursor-pointer">
                  <a
                    href="https://openobserve.ai/docs/"
                    class="text-lg font-bold gradient-hover"
                    target="_blank"
                    >Documentation</a
                  >
                </li>
                <li class="cursor-pointer">
                  <a href="/blog" class="text-lg font-bold gradient-hover">Blog</a>
                </li>
              </ul>
            </div>
            <div
              class="flex flex-col space-y-3"
              v-for="(item, index) in items.resources.item2"
              :key="index"
            >
              <h4 class="text-base font-bold ">
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
            </div>
          </div>
          <div class="flex justify-center">
            <div class="w-full">
              <CustomHeaderButton
                title="Check out our resource library"
                linkTitle="View Resources"
                link="/resources"
              />
            </div>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div
      class="absolute top-full flex justify-center left-1/2 w-52 container mx-auto"
      v-if="isCompanyMenuOpen"
      @mouseenter="onCompanyMenuHover"
    >
      <CustomHoverHeader @mouseleave="onCompanyMenuMouseLeave">
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
    </div>
    <div
      class="absolute top-full translate-x-[54%] bg-[#23282C] rounded-lg p-3 w-full lg:w-1/2"
      v-if="isOpenSearch"
      @click.stop
    >
      <div
        class="flex flex-row w-full space-x-2 justify-between items-center bg-black text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer"
      >
        <img src="/search.svg" alt="Search Icon" class="" />
        <input
          type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm bg-none placeholder-white"
          placeholder="Search here"
        />
        <button @click="isOpenSearch = false" class="text-white">
          <img src="/close.svg" alt="Search Icon" class="" />
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
defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const isPlatformMenuOpen = ref(false);
const isSolutionMenuOpen = ref(false);
const isResourcesMenuOpen = ref(false);
const isCompanyMenuOpen = ref(false);
const isOpenSearch = ref(false);
const searchWrapper = ref(null); // Reference to the search bar wrapper
const platformMenuTimeout = ref(null);
const solutionMenuTimeout = ref(null);
const resourcesMenuTimeout = ref(null);
const companyMenuTimeout = ref(null);

const onPlatformMenuHover = () => {
  clearTimeout(platformMenuTimeout.value);
  isPlatformMenuOpen.value = true;

  // Close other menus immediately
  isSolutionMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onPlatformMenuMouseLeave = () => {
  platformMenuTimeout.value = setTimeout(() => {
    isPlatformMenuOpen.value = false;
  }, 800); // 2-second delay before closing
};

const onSolutionMenuHover = () => {
  clearTimeout(solutionMenuTimeout.value);
  isSolutionMenuOpen.value = true;

  // Close other menus immediately
  isPlatformMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onSolutionMenuMouseLeave = () => {
  solutionMenuTimeout.value = setTimeout(() => {
    isSolutionMenuOpen.value = false;
  }, 500);
};

const onResourcesMenuHover = () => {
  clearTimeout(resourcesMenuTimeout.value);
  isResourcesMenuOpen.value = true;

  // Close other menus immediately
  isPlatformMenuOpen.value = false;
  isSolutionMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onResourcesMenuMouseLeave = () => {
  resourcesMenuTimeout.value = setTimeout(() => {
    isResourcesMenuOpen.value = false;
  }, 500);
};

const onCompanyMenuHover = () => {
  clearTimeout(companyMenuTimeout.value);
  isCompanyMenuOpen.value = true;

  // Close other menus immediately
  isPlatformMenuOpen.value = false;
  isSolutionMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
};

const onCompanyMenuMouseLeave = () => {
  companyMenuTimeout.value = setTimeout(() => {
    isCompanyMenuOpen.value = false;
  }, 500);
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

/* .gradient-hover:hover {
  background: linear-gradient(to left, rgb(var(--blue-light)), rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */

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
