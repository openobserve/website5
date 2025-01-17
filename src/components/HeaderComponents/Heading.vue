<script>
export default {
  name: "Heading",
  props: {
    variant: {
      type: String,
      validator: (value) => ["SectionTitle", "SemiTitle"].includes(value),
    },
  },
  computed: {
    // Define custom styles for variants
    variant() {
      return {
        SectionTitle: "text-white font-semibold text-[48px]",
        SectionDescription: "text-[#F4F4F5] font-medium text-[24px]",
        SemiTitle1: "text-[#F4F4F5] font-semibold text-[48px]",
        SemiTitle2: "text-white font-semibold text-[20px]",
        SemiTitle2Descrition:"text-[#BEC0C2] font-regular text-[16px]"
      }[this.variant];
    },
  },
};
</script>

<template>
  <h1
    :class="[
      variant, // Apply variant styles
      className,
    ]"
  >
    <slot />
  </h1>
</template>
