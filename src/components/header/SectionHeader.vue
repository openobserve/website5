<template>
  <div class="w-full space-y-1 xl:space-y-2">
    <h4 class="text-[#FFFFFF] text-sm md:text-base lg:text-sm xl:text-base font-semibold">{{ title }}</h4>
    <ul class="space-y-1 xl:space-y-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="text-[#BEC0C2] text-sm"
      >
        <a :href="item.link" :class="item.link ? 'gradient-hover' : ''">{{
          item.title
        }}</a>
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
</style>
