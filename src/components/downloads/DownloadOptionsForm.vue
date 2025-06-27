<template>
  <CustomSection sectionClass="!pt-14 !pb-0">
    <div class="max-w-4xl mx-auto w-full">
      <div class="border border-gray-200 rounded-lg shadow-sm">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
          <p class="text-sm text-gray-600">{{ description }}</p>
        </div>

        <div class="p-4 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseSelect
              v-model="selectedVersion"
              label="Version"
              :options="downloadsDataForVersion"
              :latest="downloadsDataForVersion[0]"
            />

            <BaseSelect
              v-model="selectedEdition"
              label="Edition"
              :options="editionOptions"
            />

            <BaseSelect
              v-model="selectedMode"
              label="Deployment Mode"
              :options="[
                { value: 'single', label: 'Single Node' },
                { value: 'ha', label: 'High Availability (HA)' },
              ]"
            />
          </div>

          <!-- HA Mode Info -->
          <div
            v-if="selectedMode === 'ha'"
            class="bg-blue-50 border border-[#45A4F3] rounded-lg p-4"
          >
            <div class="flex items-start space-x-3">
              <Server class="h-5 w-5 text-[#45A4F3] mt-0.5" />
              <div>
                <h4 class="text-[#45A4F3] font-medium mb-2">
                  {{ haDeploymentTitle }}
                </h4>
                <p class="text-blue-700 text-sm mb-3">
                  {{ haDeploymentDescription }}
                </p>
                <a
                  :href="haDeploymentPrimaryButton.link"
                  target="_blank"
                  class="inline-flex items-center text-[#45A4F3] hover:text-blue-800 text-sm font-medium"
                >
                  <FileText class="h-4 w-4 mr-1" />
                  {{ haDeploymentPrimaryButton.text }}
                  <ExternalLink class="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <!-- Version Info with Changelog -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span
                  class="text-xs font-semibold px-2 py-1 rounded-full text-white"
                  :class="
                    selectedEdition === 'enterprise'
                      ? 'bg-[#6B76E3]'
                      : 'bg-gray-500'
                  "
                >
                  {{
                    selectedEdition === "enterprise"
                      ? "Enterprise"
                      : "Open Source"
                  }}
                </span>
                <div class="text-sm text-gray-600 flex items-center space-x-4">
                  <span>
                    Released:
                    {{
                      selectedVersion === "latest"
                        ? releaseDate
                        : "Nov 10, 2024"
                    }}
                  </span>
                  <a
                    :href="`https://github.com/openobserve/openobserve/releases/tag/${
                      selectedVersion === 'latest' ? 'v0.10.9' : selectedVersion
                    }`"
                    target="_blank"
                    class="text-[#45A4F3] hover:text-blue-600 font-medium inline-flex items-center"
                  >
                  <FileText class="h-4 w-4 mr-1" />
                    View Changelog
                  <ExternalLink class="h-3 w-3 ml-1" />        
                  </a>
                </div>
              </div>

              <!-- Enterprise CTA -->
              <a
                v-if="selectedEdition === 'enterprise'"
                :href="enterpriseButton.link"
                :target="enterpriseButton.target || '_blank'"
                class="text-[#6B76E3] hover:text-purple-800 text-sm font-medium"
              >
                {{ enterpriseButton.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseSelect from "@/components/core/SelectOption.vue";
import CustomSection from "../core/CustomSection.vue";
import { ExternalLink, FileText, Server } from "lucide-vue-next";

const props = defineProps<{
  title: string;
  description: string;
  enterpriseButton: {
    text: string;
    link: string;
    target?: string;
  };
  haDeploymentTitle: string;
  haDeploymentDescription: string;
  haDeploymentPrimaryButton: {
    text: string;
    link: string;
    target?: string;
  };
  releaseDate: string;
  downloadsDataForVersion: {
    label: string;
    value: string;
  }[];
  editionOptions: {
    value: string;
    label: string;
  }[];
}>();

const selectedVersion = ref("latest");
const selectedEdition = ref(
  props.editionOptions[0]?.value
);
const selectedMode = ref("single");

const emits = defineEmits(["selectedVersion", "selectedEdition", "selectedMode"]);

watch(selectedVersion, (val) => emits('selectedVersion', val));
watch(selectedEdition, (val) => {
  emits('selectedEdition', val);
});
watch(selectedMode, (val) => emits('selectedMode', val));
</script>
