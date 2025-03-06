<script setup>
import { ref } from "vue";
import CustomSection from "../core/CustomSection.vue";
import cloudSection from "./cloudSection.vue";
import selfHostedSection from "./selfHostedSection.vue";

// export default {
//   components: {
//     cloudSection,
//     selfHostedSection,
//     CustomSection,
//   },
//   props: {
//     cloudSectionData: {
//       type: Object,
//       required: true,
//     },
//     selfHostedSectionData: {
//       type: Object,
//       required: true,
//     },
//   },
//   data() {
//     return {
//       selectedTab: "cloud", // Default tab
//     };
//   },
// };
const props = defineProps({
  cloudData: {
    type: Object,
  },
  selfHostedData: {
    type: Object,
  },
});

const selectedTab = ref("cloud");
</script>

<template>
  <CustomSection>
    <div class="w-full mx-auto">
      <h1 class="mb-10 text-4xl text-white font-semibold text-center">
        Get started with OpenObserve
      </h1>
      <!-- Tab Buttons -->
      <div class="flex w-full relative border-b-[3px] border-gray-500">
        <button class="w-1/2 py-3 cld-btn text-lg font-semibold transition-colors duration-300 relative" :class="[
          selectedTab === 'cloud'
            ? 'text-white '
            : 'border-transparent cld-be-effect',
        ]" @click="selectedTab = 'cloud'">
          Cloud
        </button>
        <button class="w-1/2 py-3 slf-btn text-lg font-semibold transition-colors duration-300 relative" :class="[
          selectedTab === 'selfHosted'
            ? 'text-white'
            : 'border-transparent slf-be-effect',
        ]" @click="selectedTab = 'selfHosted'">
          Self-Hosted
        </button>
        <!-- Single Underline Indicator -->
        <div class="absolute bottom-0 h-0.5 w-1/2 transition-all duration-300" :class="[
          selectedTab === 'cloud'
            ? 'left-0 bg-blue-400 shadow-blue-glow'
            : 'left-1/2 bg-orange-400 shadow-orange-glow',
        ]"></div>
      </div>
      <!-- Tab Content -->
      <div class="mt-6 justify-center">
        <transition name="fade" mode="out-in">
          <cloudSection v-if="selectedTab === 'cloud'" :title="cloudData?.title" :items="cloudData?.items"
            :bottom-title="cloudData?.bottomTitle" :bottom-description="cloudData?.bottomDescription" key="cloud" />
          <selfHostedSection v-else :docker-command="selfHostedData?.dockerCommand"
            :enterprise-features="selfHostedData?.enterpriseFeatures"
            :enterprise-title="selfHostedData?.enterpriseTitle" :download-title="selfHostedData?.downloadTitle"
            :haDeploymentDescription="selfHostedData?.haDeploymentDescription"
            :enterprise-description="selfHostedData?.enterpriseDescription" :enterpriseBottomDescription="selfHostedData?.enterpriseBottomDescription
              " :title="selfHostedData?.title" :self-hosted-button="selfHostedData?.selfHostedButton" key="selfHosted" />
        </transition>
      </div>
    </div>
  </CustomSection>
</template>

<style>
.shadow-blue-glow {
  box-shadow: 0 0 8px rgba(88, 212, 225, 0.7);
}

.shadow-orange-glow {
  box-shadow: 0 0 8px rgba(245, 106, 64, 0.7);
}

.cld-btn {
  border-radius: 4px;
  background:
    linear-gradient(180deg,
      rgba(0, 0, 0, 0) 7.31%,
      rgba(2, 16, 112, 0.4) 80.86%),
    linear-gradient(271deg,
      rgba(255, 183, 175, 0.8) -6.81%,
      rgba(67, 145, 255, 0.8) 8.16%,
      rgba(73, 166, 246, 0.8) 34.12%,
      rgba(88, 212, 225, 0.8) 52.59%,
      rgba(74, 157, 255, 0.8) 66.57%,
      rgba(0, 136, 255, 0.8) 93.03%),
    linear-gradient(153deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%);
}

.slf-btn {
  border-radius: 4px;
  background:
    linear-gradient(180deg,
      rgba(0, 0, 0, 0) 48.63%,
      rgba(44, 8, 80, 0.4) 86.59%),
    linear-gradient(91deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 218, 210, 0) 51.5%,
      rgba(255, 183, 167, 0.4) 100%),
    linear-gradient(90deg,
      rgba(208, 190, 166, 0.6) 0%,
      rgba(240, 167, 94, 0.8) 8.5%,
      #ff9d4e 21.59%,
      #ed843f 30.71%,
      #f56a40 52.5%,
      #e97746 74.16%,
      #ffa366 86.51%,
      #ffb16d 98.5%);
}

.slf-be-effect {
  color: white;
  border-radius: 4px;
  background:
    linear-gradient(88deg, rgba(0, 0, 0, 0) 51.76%, rgba(1, 1, 1, 0.8) 92%),
    linear-gradient(92deg,
      rgba(255, 255, 255, 0) -3.08%,
      rgba(223, 127, 106, 0.6) 100%);
}

.cld-be-effect {
  color: white;
  border-radius: 4px;
  background:
    linear-gradient(270deg, rgba(0, 0, 0, 0) 6.6%, rgba(1, 8, 55, 0.56) 71.85%),
    linear-gradient(271deg,
      rgba(255, 183, 175, 0.24) 11.39%,
      rgba(67, 145, 255, 0.24) 35.14%,
      rgba(88, 212, 225, 0.3) 52.59%,
      rgba(73, 166, 246, 0.24) 68.92%,
      rgba(0, 136, 255, 0.48) 93.03%);
}

/* Smooth fade transition for tab switching */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.active-cloud-tab::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right,
      rgba(67, 145, 255, 0.3),
      rgba(88, 212, 225, 1),
      rgba(67, 145, 255, 0.3));
  box-shadow: 0 0 10px rgba(88, 212, 225, 0.7);
}

.active-self-hosted-tab::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right,
      rgba(240, 167, 94, 0.3),
      rgba(245, 106, 64, 1),
      rgba(240, 167, 94, 0.3));
  box-shadow: 0 0 10px rgba(245, 106, 64, 0.7);
}

/* Update transition styles to include the border effect */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
