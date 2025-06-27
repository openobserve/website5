<template>
  <CustomSection sectionClass="!pt-14 !pb-0">
    <div class="max-w-6xl mx-auto w-full">
      <div class="bg-white rounded-lg border border-gray-200 p-8">
        <div class="flex flex-wrap justify-center gap-6 mb-8">
          <button
            v-for="platform in platforms"
            :key="platform.id"
            @click="selectedPlatform = platform.id"
            class="flex flex-col items-center p-6 rounded-lg border-2 transition-all min-w-[120px] cursor-pointer"
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
              class="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded overflow-x-auto"
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
                class="inline-flex items-center bg-[#6B76E3] text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
                >
                <!-- @click="() => window.open(instruction.downloadUrl, '_blank')" -->
                <Download class="h-4 w-4 mr-2" />
                Download
              </button>

              <div
                v-else
                class="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div class="flex items-center justify-between">
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
import { ref, computed, watch } from "vue";
import { Copy, Check, AlertCircle, Download } from "lucide-vue-next";
import CustomSection from "@/components/core/CustomSection.vue";

const props = defineProps<{
  platforms: Array<{
    id: string;
    name: string;
    icon: string; // Path to the icon image
  }>;
  selectedVersion: string;
  selectedMode: string;
  selectedEdition: string;
}>();

const selectedPlatform = ref("linux");
const copiedCommand = ref<number | null>(null);
function copyToClipboard(text: string, index: number) {
  navigator.clipboard.writeText(text).then(() => {
    copiedCommand.value = index;
    setTimeout(() => (copiedCommand.value = null), 2000);
  });
}

const getPlatformInstructions = () => {
  const isEnterprise = props.selectedEdition === "enterprise";
  switch (selectedPlatform.value) {
    case "linux":
      return {
        title: "Linux (64 Bit)",
        description:
          "Download the binary or use our installation script for the latest version.",
        sha: "SHA256: 0eedc92b1d48bbb34dac8a6afbba39c7ea9b849f194186146fa6f756cb84093",
        instructions: [
          {
            name: "Download Binary",
            commands: [
              `openobserve${
                isEnterprise ? "-enterprise" : ""
              }-linux-amd64.tar.gz`,
            ],
            downloadUrl: `https://github.com/openobserve/openobserve/releases/download/${
              props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
            }/openobserve${
              isEnterprise ? "-enterprise" : ""
            }-linux-amd64.tar.gz`,
          },
          {
            name: "Quick Install Script",
            commands: [
              "curl -L https://raw.githubusercontent.com/openobserve/openobserve/main/download.sh | sh",
            ],
          },
          {
            name: "Manual Download with curl",
            commands: [
              `curl -L https://github.com/openobserve/openobserve/releases/download/${
                props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
              }/openobserve${
                isEnterprise ? "-enterprise" : ""
              }-linux-amd64.tar.gz | tar xz`,
            ],
          },
          {
            name: "Run OpenObserve",
            commands: [
              'ZO_ROOT_USER_EMAIL="root@example.com" ZO_ROOT_USER_PASSWORD="Complexpass#123" ./openobserve',
            ],
          },
        ],
        additionalInfo:
          "Now point your browser to http://localhost:5080 and login",
        troubleshooting: {
          title: "Getting glibc error running binary?",
          description:
            "./openobserve: `/lib/libm.so.6`: version `GLIBC_2.27` not found (required by ./openobserve)",
          solution:
            "Download the musl binary instead of regular binary from releases page that has no external dependencies. This binary is not as performant as other binaries though. We recommend running the containerized version if performance is a concern for you and are unable to make the dependencies work.",
        },
      };

    case "windows":
      return {
        title: "Windows (64 Bit)",
        description:
          "Download the Windows executable for your selected version.",
        sha: "SHA256: c39a4c5762aefed8aec78ab52b0aa52a6da8ce0c644d63d4d2cdcf374059763",
        instructions: [
          {
            name: "Download Windows Executable",
            commands: [
              `openobserve${isEnterprise ? "-enterprise" : ""}-windows-x64.exe`,
            ],
            downloadUrl: `https://github.com/openobserve/openobserve/releases/download/${
              props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
            }/openobserve${isEnterprise ? "-enterprise" : ""}-windows-x64.exe`,
          },
          {
            name: "PowerShell Download",
            commands: [
              `Invoke-WebRequest -Uri "https://github.com/openobserve/openobserve/releases/download/${
                props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
              }/openobserve${
                isEnterprise ? "-enterprise" : ""
              }-windows-x64.exe" -OutFile "openobserve.exe"`,
            ],
          },
          {
            name: "Run OpenObserve",
            commands: [
              "set ZO_ROOT_USER_EMAIL=root@example.com",
              "set ZO_ROOT_USER_PASSWORD=Complexpass#123",
              "openobserve.exe",
            ],
          },
        ],
        additionalInfo:
          "Now point your browser to http://localhost:5080 and login",
      };

    case "mac":
      return {
        title: "macOS (Intel and Apple Silicon)",
        description:
          "Download the appropriate binary for your Mac architecture or use our installation script.",
        sha: "SHA256: e149e7ec3c2eac0c9e7af13ceba861d4b09ed14c7d330317c0de49e5313b580d",
        instructions: [
          {
            name: "Download Intel Mac Binary",
            commands: [
              `openobserve${
                isEnterprise ? "-enterprise" : ""
              }-darwin-amd64.tar.gz`,
            ],
            downloadUrl: `https://github.com/openobserve/openobserve/releases/download/${
              props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
            }/openobserve${
              isEnterprise ? "-enterprise" : ""
            }-darwin-amd64.tar.gz`,
          },
          {
            name: "Download Apple Silicon Binary",
            commands: [
              `openobserve${
                isEnterprise ? "-enterprise" : ""
              }-darwin-arm64.tar.gz`,
            ],
            downloadUrl: `https://github.com/openobserve/openobserve/releases/download/${
              props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
            }/openobserve${
              isEnterprise ? "-enterprise" : ""
            }-darwin-arm64.tar.gz`,
          },
          {
            name: "Quick Install Script",
            commands: [
              "curl -L https://raw.githubusercontent.com/openobserve/openobserve/main/download.sh | sh",
            ],
          },
          {
            name: "Manual Download - Intel Macs",
            commands: [
              `curl -L https://github.com/openobserve/openobserve/releases/download/${
                props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
              }/openobserve${
                isEnterprise ? "-enterprise" : ""
              }-darwin-amd64.tar.gz | tar xz`,
            ],
          },
          {
            name: "Manual Download - Apple Silicon",
            commands: [
              `curl -L https://github.com/openobserve/openobserve/releases/download/${
                props.selectedVersion === "latest" ? "v0.10.9" : props.selectedVersion
              }/openobserve${
                isEnterprise ? "-enterprise" : ""
              }-darwin-arm64.tar.gz | tar xz`,
            ],
          },
          {
            name: "Run OpenObserve",
            commands: [
              'ZO_ROOT_USER_EMAIL="root@example.com" ZO_ROOT_USER_PASSWORD="Complexpass#123" ./openobserve',
            ],
          },
        ],
        additionalInfo:
          "Now point your browser to http://localhost:5080 and login",
      };

    case "docker":
      return {
        title: "Docker",
        description: `Docker images are available at https://gallery.ecr.aws/zinclabs/openobserve${
          isEnterprise ? "-enterprise" : ""
        }`,
        sha: "",
        instructions: [
          {
            name: "Docker Run",
            commands: [
              `docker run -v $PWD/data:/data -e ZO_DATA_DIR="/data" -p 5080:5080 \\`,
              `    -e ZO_ROOT_USER_EMAIL="root@example.com" -e ZO_ROOT_USER_PASSWORD="Complexpass#123" \\`,
              `    public.ecr.aws/zinclabs/openobserve${
                isEnterprise ? "-enterprise" : ""
              }:latest`,
            ],
          },
        ],
        additionalInfo:
          "Now point your browser to http://localhost:5080 and login",
        troubleshooting: {
          title: "Error pulling image if you have AWS CLI installed?",
          description:
            "If you have AWS CLI installed and get login error then run below command:",
          solution:
            "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws",
        },
      };

    case "kubernetes":
      return {
        title: "Kubernetes - Manifest",
        description: "",
        sha: "",
        instructions: [
          {
            name: "Create Namespace",
            commands: ["kubectl create ns openobserve"],
          },
          {
            name: "Create Deployment",
            commands: [
              "kubectl apply -f https://raw.githubusercontent.com/zinclabs/openobserve/main/deploy/k8s/statefulset.yaml",
            ],
          },
          {
            name: "Port Forward",
            commands: [
              "kubectl -n openobserve port-forward svc/openobserve 5080:5080",
            ],
          },
        ],
        additionalInfo:
          "Now point your browser to http://localhost:5080 and login",
      };

    default:
      return null;
  }
};

const platformInstructions = computed(() => {
  return getPlatformInstructions();
});
</script>

