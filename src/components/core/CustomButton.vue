<script setup>

const emit = defineEmits(["click"]); // Define emit for click event

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
      ].includes(value),
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
  target: {
    type: String,
    required: false,
  },
});

const sizes = {
  small: "px-3 md:px-5 py-2 text-xs",
  medium: "px-8 py-3 text-sm",
  large: "px-10 py-4 text-md",
};

const buttonSize = sizes[props.size];

const variants = {
  primary: "primary-button",
  secondary: "secondary-button",
};

const containerClass =
  "flex uppercase text-nowrap text-center justify-center items-center";

const buttonVariant = variants[props.variant];

// Function to handle click event
const onClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event); // Emit the click event
  }
};
</script>

<template>
  <component
    :is="buttonLink ? 'a' : 'button'"
    :class="[containerClass, buttonSize, buttonVariant,btnClass]"
    @click="onClick"
    :disabled="disabled || loading"
    :href="buttonLink"
    :target="target"
    :type="!buttonLink ? type : null"
    v-bind="buttonProps"
  >
    <span class="items-center">
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
<style scoped>
.primary-button {
  position: relative;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: var(--color-vibrant-red);
  /* Creates a 2px border that matches the button color initially */
  border: 1px solid transparent;
}

.primary-button:hover {
  /* Only change the border gradient on hover */
  background-color: #0077ff;
}

/* Active state */
.primary-button:active {
  background-image:
    linear-gradient(180deg, #0088ff 0%, #0077ff 100%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(64, 169, 255, 0.7) 40%,
      rgba(0, 106, 255, 0.6) 100%);
  /* Slightly reduced shadow when pressed */
  box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
}

/* Focus state for accessibility */
.primary-button:focus {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(0, 136, 255, 0.3),
    0 0 10px rgba(0, 136, 255, 0.4);
}

/* Disabled state */
.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}

.secondary-button {
  position: relative;
  color: black;
  cursor: pointer;
  border-radius: 100px;
  background: transparent;
  /* Transparent background */
  border: 1px solid black;
  /* White border */
  transition: all;
}

/* Hover state */
.secondary-button:hover{
  border: 1px solid white;
  /* Transparent border to show gradient */
  background-color: rgb(37,99,235);
  color: white;

}

/* Disabled state */
.secondary-button:disabled{
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #cccccc;
  /* Light gray border for disabled state */
  background: transparent;
  box-shadow: none;
}

/* Icon and text */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  /* Space between icon and text */
  font-size: 1.2em;
}

.text {
  display: inline-block;
}

/* Icon and text */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  /* Space between icon and text */
  font-size: 1.2em;
}

.text {
  display: inline-block;
}


</style>
