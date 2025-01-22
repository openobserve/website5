<template>
  <div
    :class="[containerClasses]"
    @click="!disabled && !loading ? onClick : null"
  >
    <component
      :is="buttonLink ? 'a' : 'button'"
      :class="[buttonClasses]"
      :disabled="disabled || loading"
      :href="buttonLink"
      :type="!buttonLink ? type : null"
      v-bind="buttonProps"
    >
      <span class="flex flex-row items-center gap-2">
        <slot></slot>
        {{ buttonText }}
      </span>
    </component>
  </div>
</template>

<script>
import { computed } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    variant: {
      type: String,
      default: "primary", // Default variant
      validator: (value) =>
        ["primary", "secondary", "tertiary", "pricing", "white"].includes(
          value
        ),
    },
    size: {
      type: String,
      default: "medium", // Default size
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    buttonText: {
      type: String,
      default: "", // Default to empty, supports slot content as fallback
    },
    buttonLink: {
      type: String,
      default: null, // If provided, renders button as a link
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
      default: "button", // Default button type
      validator: (value) => ["button", "submit", "reset"].includes(value),
    },
    buttonProps: {
      type: Object,
      default: () => ({}), // Spread other props like form attributes
    },
    onClick: Function, // Event handler for click
  },
  setup(props) {
    // Tailwind classes for button variants
    const variants = {
      primary: {
        container:
          "btnShadow flex justify-center items-center rounded-full hover:bg-gradient-to-b hover:opacity-100 hover:from-[#d1fbff] hover:from-0% hover:to-[#004883] hover:to-100%",
        background:
          "bg-sky-500 text-white font-semibold hover:bg-gradient-to-r hover:opacity-100 hover:from-[#0079DD] hover:from-0% hover:via-[#3BB3FF] hover:via-81% hover:to-[#76DBFF] hover:to-95% focus:ring focus:ring-sky-300 rounded-full",
      },
      secondary: {
        container:
          "btnShadow flex justify-center items-center rounded-full hover:bg-gradient-to-b hover:opacity-100 hover:from-[#d1fbff] hover:from-0% hover:to-[#004883] hover:to-100%",
        background:
          "text-white  rounded-full border-2 hover:border-transparent border-white font-semibold focus:ring focus:ring-sky-300 hover:opacity-80 hover:bg-gradient-to-l hover:from-[#008bff] hover:from-0% hover:via-[#35a0fc] hover:via-38% hover:to-[#99cae9] hover:to-100%",
      },
      tertiary: {
        container:
          "btnShadow flex justify-center items-center rounded-full hover:opacity-80 hover:bg-gradient-to-t hover:from-[#008bff] hover:from-0% hover:to-[#99cae9] hover:to-100%",
        background:
          "text-white rounded-full hover:border-none font-semibold focus:ring focus:ring-sky-300 hover:opacity-80 hover:bg-gradient-to-l hover:from-[#008bff] hover:from-0% hover:via-[#35a0fc] hover:via-38% hover:to-[#99cae9] hover:to-100%",
      },
      pricing: {
        container:
          "flex justify-center items-center rounded-md hover:bg-gradient-to-r hover:opacity-100 hover:from-[#76DBFF] hover:from-100% hover:via-[#37A1E2] hover:via-100% hover:to-[#0E7BCF] hover:to-100%",
        background:
          "bg-black bg-opacity-40 hover:bg-opacity-40 hover:bg-black text-white font-semibold  hover:border-transparent  rounded-md hover:opacity-50 ",
      },
      white: {
        background: "bg-white text-black font-semibold rounded-full",
      },
    };

    // Tailwind classes for button sizes
    const sizes = {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2 text-md",
      large: "px-6 py-3 text-lg",
    };

    const containerClasses = computed(() => {
      return [
        variants[props.variant].container,
        props.btnClass,
        "inline-flex hover:shadow-lg p-1",
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Compute dynamic button classes
    const buttonClasses = computed(() => {
      return [
        "flex justify-center items-center w-full h-full text-center transition duration-300", // Base styles
        sizes[props.size], // Size based on props
        variants[props.variant].background, // Variant based on props
        props.btnClass, // Custom class
      ]
        .filter(Boolean)
        .join(" ");
    });

    return {
      buttonClasses,
      containerClasses,
    };
  },
});
</script>

<style scoped>
.btnShadow:hover {
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
}

.btnShadowwithIcon:hover {
  box-shadow: 0 0 8px 0 rgba(66, 174, 255, 0.8); /* Shadow effect */
  background-filter: blur(60px);
}
</style>
