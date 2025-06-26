<template>
  <CustomSection sectionClass="!pt-14 !pb-0">
    <div class="max-w-6xl mx-auto w-full">
      <div class="bg-white rounded-lg border border-gray-200 p-8">
        <div class="flex flex-wrap justify-center gap-6 mb-8">
          <button
            v-for="platform in platforms"
            :key="platform.id"
            @click="selectedPlatform = platform.id"
            class="flex flex-col items-center p-6 rounded-lg border-2 transition-all min-w-[120px]"
            :class="
              selectedPlatform === platform.id
                ? 'border-[#45A4F3] bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            "
          >
            <div
              :class="[
                'mb-3',
                selectedPlatform === platform.id
                  ? 'text-[#45A4F3]'
                  : 'text-gray-600',
              ]"
            >
              <img :src="platform.icon" :alt="platform.name" class="w-6 h-6" />
            </div>
            <span
              :class="[
                'text-sm font-medium',
                selectedPlatform === platform.id
                  ? 'text-[#45A4F3]'
                  : 'text-gray-700',
              ]"
            >
              {{ platform.name }}
            </span>
          </button>
        </div>

        <div v-if="platformInstructions" class="bg-white">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ platformInstructions.title }}
            </h3>
            <p
              v-if="platformInstructions.description"
              class="text-gray-600 mb-4"
            >
              {{ platformInstructions.description }}
            </p>
            <p
              v-if="platformInstructions.sha"
              class="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded"
            >
              {{ platformInstructions.sha }}
            </p>
          </div>

          <div class="space-y-8">
            <div
              v-for="(instruction, index) in platformInstructions.instructions"
              :key="index"
            >
              <h4 class="font-medium text-gray-900 mb-4">
                {{ instruction.name }}
              </h4>

              <button
                v-if="instruction.downloadUrl"
                class="inline-flex items-center bg-[#6B76E3] text-white px-4 py-2 rounded hover:opacity-90"
                @click="() => window.open(instruction.downloadUrl, '_blank')"
              >
                <Download class="h-4 w-4 mr-2" />
                Download
              </button>

              <div
                v-else
                class="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div class="flex items-start justify-between">
                  <pre
                    class="text-sm text-gray-800 font-mono overflow-x-auto flex-1 whitespace-pre-wrap"
                    >{{ instruction.commands.join("\n") }}</pre
                  >

                  <button
                    class="ml-2 h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                    @click="
                      copyToClipboard(instruction.commands.join('\n'), index)
                    "
                  >
                    <component
                      :is="copiedCommand === index ? Check : Copy"
                      class="h-4 w-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="platformInstructions.additionalInfo"
            class="mt-6 p-4 bg-[#5ACA7A]/10 rounded-lg border border-[#5ACA7A]/20"
          >
            <p class="text-sm text-green-800 font-medium">
              {{ platformInstructions.additionalInfo }}
            </p>
          </div>

          <div
            v-if="platformInstructions.troubleshooting"
            class="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
          >
            <div class="flex items-start space-x-2">
              <AlertCircle class="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h5 class="font-medium text-orange-800 mb-2">
                  {{ platformInstructions.troubleshooting.title }}
                </h5>
                <p
                  class="text-sm text-orange-700 mb-2 font-mono bg-orange-100 p-2 rounded"
                >
                  {{ platformInstructions.troubleshooting.description }}
                </p>
                <p class="text-sm text-orange-700">
                  {{ platformInstructions.troubleshooting.solution }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Copy, Check, AlertCircle, Download } from "lucide-vue-next";
import CustomSection from "@/components/core/CustomSection.vue";

// Props or mock data (if not yet dynamic from Strapi)
const platforms = [
  {
    id: "linux",
    name: "Linux",
    icon: "/img/icon/linux.svg", // <-- File must be at: public/img/icon/linux.svg
  },
  {
    id: "mac",
    name: "macOS",
    icon: "/img/icon/macos.svg", // <-- File must be at: public/img/icon/macos.svg
  },
  {
    id: "windows",
    name: "Windows",
    icon: "/img/icon/windows.svg", // <-- File must be at: public/img/icon/windows.svg
  },
  {
    id: "docker",
    name: "Docker",
    icon: "/img/icon/docker.svg", // <-- File must be at: public/img/icon/docker.svg
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "/img/icon/kubernetes.svg", // <-- File must be at: public/img/icon/kubernetes.svg
  },
];

const instructionsMap = {
  linux: {
    title: "Install on Linux",
    description: "Follow the steps below to install on Linux.",
    sha: "sha256:123abc...",
    instructions: [
      {
        name: "Install via CLI",
        commands: [
          "wget https://example.com/linux.tar.gz",
          "tar -xzf linux.tar.gz",
        ],
      },
    ],
    additionalInfo: "Make sure to give execution permissions to the binary.",
    troubleshooting: {
      title: "Permission Error",
      description: "Permission denied when running the binary.",
      solution: "Run `chmod +x binary` and try again.",
    },
  },
  mac: {
    title: "Install on macOS",
    description: "Drag the app to Applications folder.",
    instructions: [
      {
        name: "Download .dmg",
        downloadUrl: "https://example.com/macos.dmg",
      },
    ],
  },
  windows: {
    title: "Install on Windows",
    instructions: [
      {
        name: "Download Installer",
        downloadUrl: "https://example.com/windows.exe",
      },
    ],
  },
};

const selectedPlatform = ref("linux");
const copiedCommand = ref<number | null>(null);

const platformInstructions = computed(
  () => instructionsMap[selectedPlatform.value]
);

function copyToClipboard(text: string, index: number) {
  navigator.clipboard.writeText(text).then(() => {
    copiedCommand.value = index;
    setTimeout(() => (copiedCommand.value = null), 2000);
  });
}
</script>
