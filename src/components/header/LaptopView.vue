<template>
  <!-- Sticky Header -->
  <header class="bg-black sticky top-0 z-50">
    <div class="w-full mx-auto px-4 flex justify-between items-center">
      <Logo />
      <nav>
        <ul class="flex space-x-2 xl:space-x-6 w-full">
          <li
            class="relative py-6"
            @mouseenter="onPlatformMenuHover"
            @mouseleave="onPlatformMenuMouseLeave"
          >
            <a
              href="#"
              class="text-white font-semibold text-base hover:underline"
            >
              Platform
            </a>
          </li>
          <li
            class="relative py-6"
            @mouseenter="onSolutionMenuHover"
            @mouseleave="onSolutionMenuMouseLeave"
          >
            <a
              href="#"
              class="text-white font-semibold text-base hover:underline"
            >
              Solution
            </a>
          </li>
          <li
            class="relative py-6"
            @mouseenter="onResourcesMenuHover"
            @mouseleave="onResourcesMenuMouseLeave"
          >
            <a href="#" class="text-white font-semibold text-base hover:underline">
              Resources
            </a>
          </li>
          <li
            class="relative py-6"
            @mouseenter="onCompanyMenuHover"
            @mouseleave="onCompanyMenuMouseLeave"
          >
            <a
              href="#"
              class="text-white font-semibold text-base hover:underline"
            >
              Company
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
        <CustomButton variant="tertiary" size="small" buttonLink="https://cloud.openobserve.ai" target="_blank"> LOGIN IN </CustomButton>
        <CustomButton variant="secondary" size="small" buttonLink="download"> DOWNLOAD </CustomButton>
        <CustomButton variant="primary" size="small" buttonLink="/"> GET DEMO </CustomButton>
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
          <a class="text-xl font-bold pb-2 text-[#FFFFFF]">
            {{ items.platform.title }}
          </a>
          <div class="w-full flex justify-between flex-col md:flex-row gap-2">
            <div
              class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
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
                <SectionHeader :items="items.platform.keyFeature.items" />
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
                      :href="`/solution/${item.link}`"
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
                        :href="`/solution/${item.link}`"
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
                title="Full Stack Observability Platform"
                linkTitle="View Platform"
                link="#"
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
              <ul
                class=""
                v-for="(item, index) in items.resources.item1"
                :key="index"
              >
                <li class="cursor-pointer flex flex-col space-y-2">
                  <a :href="item.link" class="text-lg font-bold">{{
                    item.title
                  }}</a>
                </li>
              </ul>
            </div>
            <div
              class="flex flex-col space-y-3"
              v-for="(item, index) in items.resources.item2"
              :key="index"
            >
              <h4 class="text-base font-bold">{{ item.title }}</h4>
              <ul
                class=""
                v-for="(it, index) in item.items"
                :key="index"
              >
                <li class="cursor-pointer flex flex-col space-y-2">
                  <a :href="it.link" class="gradient-hover text-sm text-[#BEC0C2]">{{ it.title }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="w-full">
              <CustomHeaderButton
                title="Check out our resource library"
                linkTitle="View Resources"
                link="resources"
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

// Handle hover event and position the dropdown dynamically
const onPlatformMenuHover = (event) => {
  isPlatformMenuOpen.value = true;
};

const onPlatformMenuMouseLeave = () => {
  isPlatformMenuOpen.value = false;
};

const onSolutionMenuHover = (event) => {
  isSolutionMenuOpen.value = true;
};

const onSolutionMenuMouseLeave = () => {
  isSolutionMenuOpen.value = false;
};

const onResourcesMenuHover = (event) => {
  isResourcesMenuOpen.value = true;
};

const onResourcesMenuMouseLeave = () => {
  isResourcesMenuOpen.value = false;
};

const onCompanyMenuHover = (event) => {
  isCompanyMenuOpen.value = true;
};

const onCompanyMenuMouseLeave = () => {
  isCompanyMenuOpen.value = false;
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
  background: linear-gradient(
    to left,
    rgb(var(--blue-light)),
    rgb(var(--blue-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}
</style>
<style>
body {
  /* margin-top: 10vh; Adjust this value based on your header height */
}
</style>
