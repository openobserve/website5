<template>
  <component
    :is="buttonLink ? 'a' : 'button'"
    :class="[
      'relative px-6 py-2 font-semibold overflow-hidden group rounded-full inline-flex',
      parentBackground,
      variant === 'pricing' ? '' : 'btnShadow',
    ]"
    @click="!disabled && !loading ? onClick : null"
    :disabled="disabled || loading"
    :href="buttonLink"
    :type="!buttonLink ? type : null"
    v-bind="buttonProps"
  >
    <span :class="borderClasses"></span>
    <span :class="backgroundClasses"></span>
    <span class="relative z-10 flex items-center">
      <template v-if="$slots.default">
        <slot></slot>
        <span v-if="buttonText" class="ml-2">{{ buttonText }}</span>
      </template>
      <template v-else>
        <span>{{ buttonText }}</span>
      </template>
    </span>
  </component>
</template>

<script>
import { computed } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        ["primary", "secondary", "tertiary", "pricing", "ghost"].includes(value),
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    buttonText: {
      type: String,
      default: "",
    },
    buttonLink: {
      type: String,
      default: null,
    },
    btnClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value),
    },
    buttonProps: {
      type: Object,
      default: () => ({}),
    },
    onClick: Function,
  },
  setup(props) {
    // Tailwind classes for button variants
    const variants = {
      primary: {
        border:
          "absolute inset-0 bg-gradient-to-t from-button-primary-bg-blue-dark via-button-primary-bg-blue-light to-button-primary-bg-sky-blue opacity-0 transition-opacity group-hover:opacity-100",
        background:
          "absolute inset-[0.5px] rounded-full bg-background hover:bg-gradient-to-r hover:from-button-primary-bg-blue-dark hover:via-button-primary-bg-blue-light hover:to-button-primary-bg-sky-blue",
      },
      secondary: {
        border:
          "absolute inset-0 bg-gradient-to-t from-button-primary-bg-blue-dark via-button-primary-bg-blue-light to-button-primary-bg-sky-blue opacity-0 transition-opacity group-hover:opacity-100",
        background:
          "absolute inset-[0.7px] rounded-full hover:bg-gradient-to-l hover:from-button-secondary-bg-dark-sky-blue hover:via-button-secondary-bg-light-blue hover:to-button-secondary-bg-light-sky-blue",
      },
      tertiary: {
        border:
          "absolute inset-0 bg-gradient-to-t from-button-primary-bg-blue-dark via-button-primary-bg-blue-light to-button-primary-bg-sky-blue opacity-0 transition-opacity group-hover:opacity-100",
        background:
          "absolute inset-[0.7px] rounded-full hover:bg-gradient-to-t hover:from-button-secondary-bg-dark-sky-blue hover:via-button-secondary-bg-light-blue hover:to-button-secondary-bg-light-sky-blue",
      },
      ghost: {
        border:
          "absolute inset-0 bg-gradient-to-t from-button-primary-bg-blue-dark via-button-primary-bg-blue-light to-button-primary-bg-sky-blue opacity-0 transition-opacity group-hover:opacity-100",
        background:
          "absolute inset-[0.7px] rounded-full hover:bg-gradient-to-t hover:from-button-bg-gray-dark hover:to-button-bg-gray-light",
      },
      pricing: {
        border: "",
        background: "bg-white text-blue-500",
      },
    };

    // Tailwind classes for button sizes
    const sizes = {
      small: "px-2 py-0.5 text-xs",
      medium: "px-4 py-1 text-md",
      large: "px-6 py-2.5 text-lg",
    };

    const buttonClasses = computed(() => [
      "flex justify-center items-center w-full h-full text-center transition duration-300",
      props.btnClass,
    ]);

    const backgroundClasses = computed(() => variants[props.variant]?.background || "");

    const borderClasses = computed(() => variants[props.variant]?.border || "");

    const parentBackground = computed(() => {
      switch (props.variant) {
        case "primary":
          return "bg-background text-white";
        case "tertiary":
          return "text-white";
        case "pricing":
          return "bg-white text-blue-500";
        default:
          return "border border-white text-white hover:border-button-secondary-bg-dark-sky-blue";
      }
    });

    return {
      buttonClasses,
      backgroundClasses,
      borderClasses,
      parentBackground,
      sizes,
    };
  },
});
</script>

<style scoped>
.btnShadow:hover {
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 0.8);
}

.btnShadowwithIcon:hover {
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 0.8);
  background-filter: blur(60px);
}
</style>
