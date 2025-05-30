<template>
  <div v-show="isVisible" class="flex flex-col space-y-8 text-black mt-4 font-medium">
    <CustomHeaderButton :title="title" :linkTitle="linkTitle" :link="link" />
    <div>
      <ul class="grid grid-cols-1 gap-2 font-semibold text-gray-600 text-base">
        <li v-for="(item, index) in items" :key="index">
          <a
            :href="item.link.startsWith('/') ? item.link : '/' + item.link"
            class="block hover:text-black"
            :target="item.target || '_self'"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import CustomHeaderButton from "./CustomHeaderButton.vue";
defineProps({
  isVisible: Boolean,
  title: String,
  linkTitle: String,
  link: String,
  items: Array
});
</script>
