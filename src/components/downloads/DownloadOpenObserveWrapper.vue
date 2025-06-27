<template>
  <DownloadOptionsForm
    :title="title"
    :description="description"
    :editionOptions="editionOptions"
    :haDeploymentTitle="haDeploymentTitle"
    :haDeploymentDescription="haDeploymentDescription"
    :haDeploymentPrimaryButton="haDeploymentPrimaryButton"
    :downloadsDataForVersion="downloadsDataForVersion"
    :enterprise-button="enterpriseButton"
    @selectedVersion="handleVersionChange"
    @selectedEdition="handleEditionChange"
    @selectedMode="handleModeChange"
    />
    <!-- :release-date="data[0]?.version" -->
  <OperatingsystemForDownload
    :platforms="filteredPlatforms"
    :selectedVersion="version"
    :selectedMode="mode"
    :selectedEdition="edition"
  />
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DownloadOptionsForm from "./DownloadOptionsForm.vue";
import OperatingsystemForDownload from "./OperatingsystemForDownload.vue";
import Linux from "../assets/Linux.vue";
import MacOS from "../assets/MacOS.vue";
import Windows from "../assets/Windows.vue";
import Docker from "../assets/Docker.vue";
import Kubernetes from "../assets/Kubernetes.vue";

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
  data: {
    version: string;
  }[];
}>();

const versions = [
  { value: "latest", label: "Latest (v0.10.9)" },
  { value: "v0.10.8", label: "v0.10.8" },
  { value: "v0.10.7", label: "v0.10.7" },
];

const editionOptions = [
  { value: "oss", label: "Open Source (OSS)" },
  { value: "enterprise", label: "Enterprise" },
];

// Props or mock data (if not yet dynamic from Strapi)
const platforms = [
  {
    id: "linux",
    name: "Linux",
    icon: Linux, // <-- File must be at: public/img/icon/linux.svg
  },
  {
    id: "mac",
    name: "macOS",
    icon: MacOS, // <-- File must be at: public/img/icon/macos.svg
  },
  {
    id: "windows",
    name: "Windows",
    icon: Windows, // <-- File must be at: public/img/icon/windows.svg
  },
  {
    id: "docker",
    name: "Docker",
    icon: Docker, // <-- File must be at: public/img/icon/docker.svg
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: Kubernetes, // <-- File must be at: public/img/icon/kubernetes.svg
  },
];

const downloadsDataForVersion = computed(() => {
  return versions?.map((e) => ({
    value: e.value,
    label: e.label,
  }));
});
const version = ref("latest");
const edition = ref(editionOptions[0]?.value || "oss");
const mode = ref("single");
function handleVersionChange(value: string) {
  version.value = value;
}

function handleEditionChange(value: string) {
  edition.value = value;
}

function handleModeChange(value: string) {
  mode.value = value;
}

const filteredPlatforms = computed(() => {
  return mode.value === "ha"
    ? platforms.filter((p) => p.id === "kubernetes")
    : platforms;
});

// const downloadsDataForVersion = computed(() => {
//   return versions?.map((e) => ({
//     value: e.version.toLowerCase(),
//     label: e.version,
//   }));
// });
</script>
