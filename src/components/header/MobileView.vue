<template>
  <header class="flex flex-col z-50 relative">
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
          <a
            class="rounded-md transition flex items-center border -mt-0.5"
            href="https://short.openobserve.ai/community"
            target="_blank"
          >
            <img
              src="/img/icon/slackIcon.svg"
              alt="Slack Icon"
              class="cursor-pointer w-5 h-5 object-cover p-1"
            />
          </a>
          <GithubButton
            href="https://github.com/openobserve/openobserve"
            data-color-scheme="light"
            data-size="small"
            data-show-count="false"
            aria-label="Star openobserve/openobserve on GitHub"
            class=""
            >Star</GithubButton
          >
          <a
            href="https://cloud.openobserve.ai"
            class="text-black text-xs"
            target="_blank"
            >LOG IN</a
          >
          <!-- <CustomButton
            variant="tertiary"
            size="small"
            buttonLink="https://cloud.openobserve.ai"
            target="_blank"
            btn-class="p-0"
            >LOG IN</CustomButton
          > -->
          <div
            class="cursor-pointer h-7 w-7 flex items-center"
            @click="onMenuClick"
          >
            <img
              :src="
                isMenuOpen ? '/img/icon/close.svg' : '/img/icon/navmenu.svg'
              "
              alt="Mobile View Menu Icon"
              class=""
            />
          </div>
        </div>
      </div>
      <div
        class="absolute top-full left-0 right-0 bg-[#23282C] rounded-lg p-3 w-full"
        v-if="isOpenSearch"
        @click.stop
      >
        <div
          class="flex flex-row w-full space-x-2 justify-between items-center bg-white text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer"
        >
          <img src="/img/icon/search.svg" alt="Search Icon" class="" />
          <input
            type="text"
            class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-white"
            placeholder="Search here"
          />
          <button @click="isOpenSearch = false" class="text-white">
            <img src="/img/icon/close.svg" alt="close Icon" class="" />
          </button>
        </div>
      </div>
      <div v-if="isMenuOpen" class="w-full h-screen bg-white">
        <!-- Main Menu -->
        <div
          v-if="!activeSubMenu"
          class="w-full h-full flex flex-col items-center space-y-4 bg-white overflow-y-auto"
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
                <h4 class="text-gray-500 text-lg md:text-xl font-semibold">
                  {{ item }}
                </h4>
                <img
                  src="/img/icon/submenuicon.svg"
                  alt="Arrow Icon"
                  class="w-4 h-4"
                />
              </div>
              <div
                class="w-full flex justify-center h-0.5"
                style="
                  background: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    #c0c0c0 25.5%,
                    #c0c0c0 70%,
                    rgba(255, 255, 255, 0) 100%
                  );
                "
              ></div>
            </li>
          </ul>
          <div
            class="flex flex-col justify-center w-full items-center space-y-4 pt-4 mx-auto px-10"
          >
            <!-- <CustomButton class="w-full" variant="secondary" size="large" buttonLink="/downloads">DOWNLOADS
            </CustomButton> -->
            <CustomButton
              class="w-full"
              variant="primary"
              size="large"
              buttonLink="/demo"
              >GET DEMO</CustomButton
            >
          </div>
        </div>

        <!-- Submenu Content -->
        <!-- <div style="background-image: url('/img/bg/gradient-bg/mobilenavBg1.svg')" class="bg-cover bg-no-repeat top-1/2" ></div> -->
        <div
          v-if="activeSubMenu"
          style="
            background-image: url('/img/bg/gradient-bg/mobilenavBg1.svg'),
              url('/img/bg/gradient-bg/mobilenavBg2.svg.svg');
            background-position: top, bottom;
            background-repeat: no-repeat, no-repeat;
            background-size: cover, cover;
          "
          class="h-[calc(100svh-60px)] w-full text-white overflow-y-auto"
        >
          <div class="flex items-center px-4 py-2">
            <button class="text-gray-300 cursor-pointer" @click="closeSubMenu">
              <img
                src="/img/icon/navback.svg"
                alt="Back Icon"
                class="w-5 h-5"
              />
            </button>
            <h4 class="text-black text-2xl font-semibold ml-2">
              {{ activeSubMenu }}
            </h4>
          </div>
          <div class="p-4 h-full">
            <div
              v-show="activeSubMenu === 'Platform'"
              class="flex flex-col space-y-4"
            >
              <div
                class="flex flex-col items-center justify-between space-y-4 w-full text-black"
              >
                <CustomHeaderButton
                  title="Full Stack Observability Platform"
                  linkTitle="View Platform"
                  link="/platform"
                />
                <a
                  class="p-4 bg-white bg-opacity-40 card-border w-full lg:w-[40%] flex justify-center text-black cursor-pointer text-sm"
                  href="/pricing"
                  >Pricing</a
                >
              </div>
              <div class="flex justify-center">
                <h3 class="text-xl font-bold pb-2 text-black">
                  {{ items.platform.title }}
                </h3>
              </div>
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                <div v-for="(item, index) in items.platform.items" :key="index">
                  <SectionHeader
                    :title="item.title"
                    :items="item.items"
                    :link="item.link"
                  />
                </div>
              </div>
            </div>
            <div
              v-show="activeSubMenu === 'Solutions'"
              class="flex flex-col space-y-4 text-black"
            >
              <CustomHeaderButton
                title="Full Stack Observability Solutions"
                linkTitle="View Solutions"
                link="/solutions"
              />
              <div class="flex flex-col space-y-3">
                <h4 class="text-black text-base font-semibold">Use Case</h4>
                <div class="">
                  <ul class="grid grid-cols-1 gap-2">
                    <li
                      v-for="(item, index) in items.solutions.useCases"
                      :key="index"
                      class="text-theme-secondaryFont text-base gradient-hover"
                    >
                      <a
                        :href="`/solutions/${item.link}`"
                        :class="item?.link ? 'gradient-hover' : ''"
                        >{{ item.title }}</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="flex flex-col space-y-2">
                  <!-- <h4 class="text-[#FFFFFF] text-base font-semibold">
                    By Team
                  </h4> -->
                  <!-- <div>
                    <ul class="flex flex-col space-y-2">
                      <li
                        v-for="(item, index) in items.solutions.byTeam"
                        :key="index"
                        class="text-theme-secondaryFont text-base"
                      >
                        <a
                          :href="`/solutions/${item.link}`"
                          :class="item.link ? 'gradient-hover' : ''"
                          >{{ item.title }}</a
                        >
                      </li>
                    </ul>
                  </div> -->
                  <!-- <div>
                    <a :href="items?.solutions?.sandbox?.link">{{
                      items?.solutions?.sandbox?.title
                    }}</a>
                  </div> -->
                </div>
              </div>
            </div>
            <div
              v-show="activeSubMenu === 'Resources'"
              class="flex flex-col space-y-4 text-black"
            >
              <CustomHeaderButton
                title="Full Stack Observability Resources"
                linkTitle="View Resources"
                link="/resources"
              />
              <div class="flex flex-col space-y-3">
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
                        class="text-theme-secondaryFont text-base gradient-hover"
                        target="_blank"
                        >Documentation</a
                      >
                    </li>
                    <li class="cursor-pointer">
                      <a
                        href="/blog"
                        class="text-theme-secondaryFont text-base gradient-hover"
                        >Blog</a
                      >
                    </li>
                    <li class="cursor-pointer">
                      <a
                        href="/faqs"
                        class="text-theme-secondaryFont text-base gradient-hover"
                        >Frequently Asked Questions</a
                      >
                    </li>
                    <li class="cursor-pointer">
                      <a
                        href="/case-studies"
                        class="text-theme-secondaryFont text-base gradient-hover"
                        >Case Studies and testimonials</a
                      >
                    </li>
                  </ul>
                </div>
                <!-- <div
                  class="flex flex-col space-y-3"
                  v-for="(item, index) in items.resources.item2"
                  :key="index"
                >
                  <h4 class="text-base font-bold">{{ item.title }}</h4>
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
            </div>
            <!-- <div v-show="activeSubMenu === 'Company'" class="flex flex-col space-y-4">
              <ul class="flex flex-col space-y-3">
                <li v-for="(item, index) in items?.company?.items" :key="index"
                  class="text-theme-secondaryFont text-base">
                  <a :href="item.link" :class="item.link ? 'gradient-hover' : ''">{{ item.title }}</a>
                </li>
              </ul>
            </div> -->
          </div>
        </div>
        <!-- <div style="background-image: url('/img/bg/gradient-bg/mobilenavBg1.svg')"></div> -->
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "../core/Logo.vue";
import CustomButton from "../core/CustomButton.vue";
import SectionHeader from "./SectionHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";
import { slugify } from "@/utils/slugify";
import GithubButton from "vue-github-button";

defineProps({
  items: Object,
  required: true,
});
// Menu items
const navHeading = ["Platform", "Solutions", "Resources"];

// Reactive states
const isMenuOpen = ref(false);
const activeSubMenu = ref(null); // Tracks the currently active submenu
const isOpenSearch = ref(false);
const searchWrapper = ref(null); // Reference to the search bar wrapper
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
  console.log("Submenu clicked:", item);
  activeSubMenu.value = item;
};

// Close submenu and return to main menu
const closeSubMenu = () => {
  activeSubMenu.value = null;
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
.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}

.gradient-hover {
  display: inline-block;
}

.gradient-hover:hover {
  background: linear-gradient(to left, #6A76E3 ,#45A4F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}
</style>
