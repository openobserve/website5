<template>
  <DownloadOptionsForm :title="title" :description="description" :editionOptions="editionOptions" :haDeploymentTitle="haDeploymentTitle" :haDeploymentDescription="haDeploymentDescription" :haDeploymentPrimaryButton="haDeploymentPrimaryButton" :downloadsDataForVersion="downloadsDataForVersion" :enterprise-button="enterpriseButton"/>
  <OperatingsystemForDownload /> 
</template>
<script setup lang="ts">
import { computed, version } from "vue";
import DownloadOptionsForm from "./DownloadOptionsForm.vue";
import OperatingsystemForDownload from "./OperatingsystemForDownload.vue";
const props = defineProps<{
  title: string;
  description: string;
  enterpriseButton: {
    text: string;
    link: string;
    target?: string;
  },
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
const downloadsDataForVersion = computed(() => {
  return versions?.map((e) => ({
    value: e.value,
    label: e.label,
  }));
});

// const downloadsDataForVersion = computed(() => {
//   return versions?.map((e) => ({
//     value: e.version.toLowerCase(),
//     label: e.version,
//   }));
// });
</script>
