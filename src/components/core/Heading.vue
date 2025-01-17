<template>
  <div :class="[aligns[align]]">
    <h1
      class="text-2xl md:text-4xl font-semibold text-white"
      v-html="title"
    ></h1>
    <p
      v-if="description"
      class="font-normal md:font-menium text-white text-base md:text-lg mt-5"
      v-html="description"
    ></p>
  </div>
</template>

<script>
export default {
  name: "Heading",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    align: {
      type: String,
      default: "CENTER",
      validator: (value) =>
        ["LEFT", "CENTER", "RIGHT"].includes(value),
    },
  },
  computed: {
    aligns() {
      return {
        LEFT: "text-left",
        CENTER: "text-center",
        RIGHT: "text-right",
      };
    },
  },
};
</script>

