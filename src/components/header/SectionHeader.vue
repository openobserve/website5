<template>
  <div class="space-y-3">
    <h4 class="text-[#FFFFFF] text-20 font-semibold">{{ title }}</h4>
    <ul class="space-y-4">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="text-[#BEC0C2] text-16"
      >
        <a
          href="{{item.link}}"
          :class="item.link ? 'hover:text-blue-500' : ''"
          >{{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Section",
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
