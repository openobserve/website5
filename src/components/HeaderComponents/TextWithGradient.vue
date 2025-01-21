<script>
export default {
  name: "TextGradient",
  props: {
    title: {
      type: String,
      required: true,
    },
    textGradientColor: {
      type: String,
      required: true,
    },
    textSize: {
      type: String,
      required: true,
    },
    align: {
      type: String,
      default: "left",
      validator: (value) => ["left", "center", "right"].includes(value),
    },
  },
  computed: {
    computedClass() {
      return `font-semibold text-${this.textSize} text-${this.align} ${this.textGradientColor} text-gradient`;
    }
  },
};
</script>

<template>
  <h1 :class="computedClass">
    {{ title }}
  </h1>
</template>

<style>
.text-gradient {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>