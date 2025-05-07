<template>
  <!-- Sticky Header -->
  <header class="sticky top-0 z-50 w-full">
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 flex justify-between items-center py-2"
    >
      <Logo />
      <nav>
        <ul
          class="flex items-center space-x-0.5 w-full font-semibold text-base"
        >
          <li
            class="relative"
            @mouseenter="onPlatformMenuHover"
            @mouseleave="onPlatformMenuMouseLeave"
          >
            <a
              href="/platform"
              class="px-3 py-2 rounded-lg transition-all"
              :class="isPlatformMenuOpen ? 'theme-purple' : 'bg-transparent'"
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
              class="px-3 py-2 rounded-lg transition-all"
              :class="isSolutionMenuOpen ? 'theme-purple' : 'bg-transparent'"
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
              class="px-3 py-2 rounded-lg transition-all"
              :class="isResourcesMenuOpen ? 'theme-purple' : 'bg-transparent'"
            >
              Resources
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
        <a
          class="rounded-[4px] transition flex items-center border"
          href="https://short.openobserve.ai/community"
          target="_blank"
        >
          <img
            src="/img/icon/slackIcon.svg"
            alt="Search Icon"
            class="cursor-pointer w-[1.6rem] h-[1.6rem] object-cover p-1"
          />
        </a>
        <!-- GitHub Stats Section -->
        <GithubButton
          href="https://github.com/openobserve/openobserve"
          data-color-scheme="dark"
          data-size="large"
          data-show-count="true"
          aria-label="Star openobserve/openobserve on GitHub"
          class="pt-1.5"
          >Star</GithubButton
        >
        <CustomButton
          variant="secondary"
          size="small"
          buttonLink="https://cloud.openobserve.ai"
          target="_blank"
        >
          LOG IN
        </CustomButton>
        <CustomButton
          variant="primary"
          size="small"
          buttonLink="/demo"
          class="transition-opacity duration-500 ease-in-out"
          :class="
            showStickyButton
              ? 'opacity-100'
              : 'opacity-0'
          "
        >
          GET DEMO
        </CustomButton>
      </div>
    </div>
    <!-- Dropdown Menus -->
    <div
      class="fixed top-full flex justify-center left-[15%] xl:left-1/4 w-auto mx-auto"
      v-if="isPlatformMenuOpen"
      @mouseenter="onPlatformMenuHover"
    >
      <CustomHoverHeader @mouseleave="onPlatformMenuMouseLeave">
        <div>
          <a class="text-xl font-bold">
            {{ items.platform.title }}
          </a>
          <div
            class="w-full flex justify-between flex-col md:flex-row gap-2 pt-4"
          >
            <ul class="grid grid-cols-3 gap-x-6 gap-y-4">
              <li
                v-for="(item, index) in items.platform.items"
                :key="index"
                class="text-gray-600 text-sm"
              >
                <a
                  :href="`/platform/${item.link}`"
                  :class="item.link ? 'gradient-hover' : ''"
                  >{{ item.title }}</a
                >
              </li>
            </ul>
          </div>
          <div class="flex flex-row gap-2 mt-6 w-full">
            <div class="w-[80%]">
              <CustomHeaderButton
                title="Full Stack Observability Platform"
                linkTitle="View Platform"
                link="/platform"
              />
            </div>
            <a
              href="/pricing"
              class="p-4 border border-gray-400 rounded-lg w-1/4 flex justify-center cursor-pointer text-sm"
              >Pricing</a
            >
          </div>
        </div>
      </CustomHoverHeader>
    </div>
    <div
      class="fixed top-full flex justify-center w-[50%] left-1/4 xl:w-[40%] 2xl:w-[30%] 2xl:left-1/3 mx-auto"
      v-if="isSolutionMenuOpen"
      @mouseenter="onSolutionMenuHover"
    >
      <CustomHoverHeader @mouseleave="onSolutionMenuMouseLeave">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row w-full space-x-4">
            <!-- Use Case Column -->
            <div class="flex flex-col space-y-3">
              <h4 class="text-base font-semibold">Use Case</h4>
              <div class="mt-3">
                <ul class="grid grid-cols-2 gap-4">
                  <li
                    v-for="(item, index) in items.solutions.useCases"
                    :key="index"
                    class="text-gray-600 text-sm"
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
          </div>
          <div class="flex justify-center">
            <div class="w-full">
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
      class="fixed top-full flex justify-center w-[45%] xl:w-[31%] left-[30%] 2xl:w-[30%] xl:left-[40%] mx-auto"
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
              <ul class="flex flex-col space-y-2 text-gray-600 text-sm">
                <li class="cursor-pointer gradient-hover">
                  <a
                    href="https://openobserve.ai/docs/"
                    class=""
                    target="_blank"
                    >Documentation</a
                  >
                </li>
                <li class="cursor-pointer gradient-hover">
                  <a href="/blog" class="">Blog</a>
                </li>
                <li class="cursor-pointer gradient-hover">
                  <a href="/faqs" class="">Frequently Asked Questions</a>
                </li>
                <li class="cursor-pointer gradient-hover">
                  <a href="/case-studies" class=""
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
      class="absolute top-full translate-x-[54%] bg-[#23282C] rounded-lg p-3 w-full lg:w-1/2"
      v-if="isOpenSearch"
      @click.stop
    >
      <div
        class="flex flex-row w-full space-x-2 justify-between items-center bg-black text-white border-[0.5px] h-10 rounded-lg px-2 border-gray-50 focus-within:border-sky-500 hover:bg-gray-700 cursor-pointer"
      >
        <img src="/img/icon/search.svg" alt="Search Icon" class="" />
        <input
          type="text"
          class="w-full bg-transparent focus:outline-none text-white text-sm bg-none placeholder-white"
          placeholder="Search here"
        />
        <button @click="isOpenSearch = false" class="text-white">
          <img src="/img/icon/close.svg" alt="Search Icon" class="" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from "@/components/core/Logo.vue";
import CustomButton from "@/components/core/CustomButton.vue";
import CustomHoverHeader from "@/components/header/CustomHoverHeader.vue";
import CustomHeaderButton from "@/components/header/CustomHeaderButton.vue";
import { ref, onMounted, onUnmounted } from "vue";
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
  isSolutionMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onPlatformMenuMouseLeave = () => {
  platformMenuTimeout.value = setTimeout(() => {
    if (!isPlatformMenuOpen.value) return;
    isPlatformMenuOpen.value = false;
  }, 300); // Increased delay for smoother experience
};

const onSolutionMenuHover = () => {
  clearTimeout(solutionMenuTimeout.value);
  isSolutionMenuOpen.value = true;
  isPlatformMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onSolutionMenuMouseLeave = () => {
  solutionMenuTimeout.value = setTimeout(() => {
    if (!isSolutionMenuOpen.value) return;
    isSolutionMenuOpen.value = false;
  }, 300);
};

const onResourcesMenuHover = () => {
  clearTimeout(resourcesMenuTimeout.value);
  isResourcesMenuOpen.value = true;
  isPlatformMenuOpen.value = false;
  isSolutionMenuOpen.value = false;
  isCompanyMenuOpen.value = false;
};

const onResourcesMenuMouseLeave = () => {
  resourcesMenuTimeout.value = setTimeout(() => {
    if (!isResourcesMenuOpen.value) return;
    isResourcesMenuOpen.value = false;
  }, 300);
};

const onCompanyMenuHover = () => {
  clearTimeout(companyMenuTimeout.value);
  isCompanyMenuOpen.value = true;
  isPlatformMenuOpen.value = false;
  isSolutionMenuOpen.value = false;
  isResourcesMenuOpen.value = false;
};

const onCompanyMenuMouseLeave = () => {
  companyMenuTimeout.value = setTimeout(() => {
    if (!isCompanyMenuOpen.value) return;
    isCompanyMenuOpen.value = false;
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

const showStickyButton = ref(false);

const handleScroll = () => {
  showStickyButton.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
.gradient-hover {
  display: inline-block;
}

/* .gradient-hover:hover {
  background: linear-gradient(to left,
      rgb(var(--blue-light)),
      rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */

.gradient-hover:hover {
  background: linear-gradient(to left, #6a76e3, #45a4f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}
</style>
