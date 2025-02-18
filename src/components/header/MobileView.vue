<template>
  <header class="bg-black flex flex-col z-50 relative">
    <div class="relative">
      <div class="flex justify-between items-center p-2">
        <Logo />
        <div class="flex items-center">
          <!-- <div
            class="relative rounded-xl"
            @click="onSearchClick"
            ref="searchWrapper"
          >
            <img
              src="/search.svg"
              alt="Search Icon"
              class="cursor-pointer w-full h-full object-cover p-2.5"
            />
          </div> -->
          <GithubButton
            href="https://github.com/openobserve/openobserve"
            data-color-scheme="dark"
            data-size="small"
            data-show-count="false"
            aria-label="Star openobserve/openobserve on GitHub"
            class=""
            >Star</GithubButton
          >
          <CustomButton
            variant="tertiary"
            size="small"
            buttonLink="https://cloud.openobserve.ai"
            target="_blank"
            btn-class="p-0"
            >LOG IN</CustomButton
          >
          <div
            class="cursor-pointer h-7 w-7 flex items-center"
            @click="onMenuClick"
          >
            <img
              :src="isMenuOpen ? '/close.svg' : '/navmenu.svg'"
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
          class="flex flex-row w-full space-x-2 justify-between items-center bg-black text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer"
        >
          <img src="/search.svg" alt="Search Icon" class="" />
          <input
            type="text"
            class="w-full bg-transparent focus:outline-none text-white text-sm placeholder-white"
            placeholder="Search here"
          />
          <button @click="isOpenSearch = false" class="text-white">
            <img src="/close.svg" alt="Search Icon" class="" />
          </button>
        </div>
      </div>
      <div v-if="isMenuOpen" class="w-full h-screen bg-black">
        <!-- Main Menu -->
        <div
          v-if="!activeSubMenu"
          class="w-full h-full flex flex-col items-center space-y-4 bg-black overflow-y-auto"
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
                <h4 class="text-gray-300 text-lg md:text-xl font-semibold">
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
          <div
            class="flex flex-col justify-center w-full items-center space-y-4 pt-20 mx-auto px-10"
          >
            <CustomButton
              class="w-full"
              variant="secondary"
              size="large"
              buttonLink="/downloads"
              >DOWNLOADS</CustomButton
            >
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
        <!-- <div style="background-image: url('/mobilenavBg1.svg')" class="bg-cover bg-no-repeat top-1/2" ></div> -->
        <div
          v-if="activeSubMenu"
          style="
            background-image:
              url(&quot;/mobilenavBg1.svg&quot;),
              url(&quot;/mobilenavBg2.svg&quot;);
            background-position: top, bottom;
            background-repeat: no-repeat, no-repeat;
            background-size: cover, cover;
          "
          class="h-[calc(100svh-60px)] w-full text-white overflow-y-auto"
        >
          <div class="flex items-center px-4 py-2">
            <button class="text-gray-300" @click="closeSubMenu">
              <img src="/NavBack.svg" alt="Back Icon" class="w-5 h-5" />
            </button>
            <h4 class="text-[#BEC0C2] text-2xl font-semibold ml-2">
              {{ activeSubMenu }}
            </h4>
          </div>
          <div class="p-4 h-full">
            <div
              v-show="activeSubMenu === 'Platform'"
              class="flex flex-col space-y-4"
            >
              <div class="flex flex-col items-center justify-between space-y-4">
                <CustomHeaderButton
                  title="Full Stack Observability Platform"
                  linkTitle="View Platform"
                  link="/platform"
                />
                <a
                  class="p-4 bg-black bg-opacity-40 card-border w-full lg:w-[40%] flex justify-center cursor-pointer"
                  href="/pricing"
                  >Pricing</a
                >
              </div>
              <div class="flex justify-center">
                <h3 class="text-xl font-bold pb-2 text-[#FFFFFF]">
                  {{ items.platform.title }}
                </h3>
              </div>
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(item, index) in items.platform.items" :key="index">
                  <SectionHeader
                    :title="item.title"
                    :items="item.items"
                    :link="item.link"
                  />
                </div>
              </div>
              <div class="flex flex-col justify-center items-center space-y-1">
                <a
                  :href="items?.platform?.keyFeature?.link"
                  class="text-[#FFFFFF] text-base font-semibold gradient-hover"
                >
                  {{ items.platform.keyFeature.title }}
                </a>
                <div class="w-full bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                  <!-- <SectionHeader :items="items.platform.keyFeature.items" /> -->
                  <ul class="space-y-1 xl:space-y-2">
                    <li
                      v-for="(item, index) in items.platform.keyFeature.items"
                      :key="index"
                      class="text-[#BEC0C2] text-sm"
                    >
                      <a
                        :href="`/key-features#${slugify(item.title)}`"
                        :class="item.title ? 'gradient-hover' : ''"
                      >
                        {{ item.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              v-show="activeSubMenu === 'Solutions'"
              class="flex flex-col space-y-4"
            >
              <CustomHeaderButton
                title="Full Stack Observability Solutions"
                linkTitle="View Solutions"
                link="/solutions"
              />
              <div class="flex flex-col space-y-3">
                <h4 class="text-[#FFFFFF] text-base font-semibold">Use Case</h4>
                <div class="mt-3">
                  <ul class="grid grid-cols-1 gap-2">
                    <li
                      v-for="(item, index) in items.solutions.useCases"
                      :key="index"
                      class="text-theme-secondaryFont text-base"
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
                  <h4 class="text-[#FFFFFF] text-base font-semibold">
                    By Team
                  </h4>
                  <div>
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
                  </div>
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
              class="flex flex-col space-y-4"
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
                        class="text-lg font-bold gradient-hover"
                        target="_blank"
                        >Documentation</a
                      >
                    </li>
                    <li class="cursor-pointer">
                      <a href="/blog" class="text-lg font-bold gradient-hover"
                        >Blog</a
                      >
                    </li>
                    <li class="cursor-pointer">
                      <a href="/faqs" class="text-lg font-bold gradient-hover"
                        >Frequently Asked Questions</a
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
            <div
              v-show="activeSubMenu === 'Company'"
              class="flex flex-col space-y-4"
            >
              <ul class="flex flex-col space-y-3">
                <li
                  v-for="(item, index) in items?.company"
                  :key="index"
                  class="text-theme-secondaryFont text-base"
                >
                  <a
                    :href="item.link"
                    :class="item.link ? 'gradient-hover' : ''"
                    >{{ item.title }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div style="background-image: url('/mobilenavBg1.svg')"></div> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
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
const navHeading = ["Platform", "Solutions", "Resources", "Company"];

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
  activeSubMenu.value = item;
};

// Close submenu and return to main menu
const closeSubMenu = () => {
  activeSubMenu.value = null;
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
.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}
</style>
