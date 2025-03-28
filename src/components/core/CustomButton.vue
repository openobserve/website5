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
        "tertiary",
        "pricing",
        "ghost",
        "heroButton",
        "bannerPrimary",
        "bannerSecondary",
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
  tertiary: "tertiary-button",
  ghost: "button-with-icon",
  pricing: "button-white",
  heroButton: "hero-button",
  bannerPrimary: "banner-button-primary",
  bannerSecondary: "banner-button-secondary",
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
  border-radius: 100px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;

  /* Base gradient for button fill with matching border in normal state */
  background-image: linear-gradient(180deg, #0095ff 0%, #0088ff 100%);
  /* linear-gradient(180deg, #0095ff 0%, #0088ff 100%); */

  /* Creates a 2px border that matches the button color initially */
  border: 2px solid transparent;
}

.primary-button:hover {
  /* Only change the border gradient on hover */
  background-image:
    linear-gradient(90deg, #0079dd -10.28%, #3bb3ff 92.55%, #76dbff 109.08%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(128, 200, 255, 0.9) 20%,
      rgba(64, 169, 255, 0.85) 40%,
      rgba(0, 136, 255, 0.8) 60%,
      rgba(0, 106, 255, 0.75) 80%,
      rgba(0, 68, 255, 0.7) 100%);

  /* More uniform shadow spread */
  box-shadow:
    0 0 15px rgba(0, 136, 255, 0.4),
    0 0 20px rgba(0, 106, 255, 0.2);
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

.tertiary-button {
  position: relative;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 100px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background: transparent;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.hero-button {
  position: relative;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 100px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background: black;
  border: 2px solid transparent;
}

.tertiary-button:hover,
.hero-button:hover {
  border: 2px solid transparent;
  /* Transparent border to show gradient */
  background-image:
    linear-gradient(272deg,
      rgba(0, 139, 255, 0.8) 4.81%,
      rgba(53, 160, 252, 0.8) 39.26%,
      rgba(153, 202, 233, 0.8) 94.28%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(128, 200, 255, 0.9) 20%,
      rgba(64, 169, 255, 0.85) 40%,
      rgba(0, 136, 255, 0.8) 60%,
      rgba(0, 106, 255, 0.75) 80%,
      rgba(0, 68, 255, 0.7) 100%);
  /* Gradient background */
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    0 0 15px rgba(0, 136, 255, 0.4),
    0 0 20px rgba(0, 106, 255, 0.2);
  /* Glow effect */
}

.tertiary-button:active,
.hero-button:active {
  background-image:
    linear-gradient(180deg, #0088ff 0%, #0077ff 100%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(64, 169, 255, 0.7) 40%,
      rgba(0, 106, 255, 0.6) 100%);
  box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
}

/* .tertiary-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.3), 0 0 10px rgba(0, 136, 255, 0.4);
} */

.tertiary-button:disabled,
.hero-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}

.secondary-button {
  position: relative;
  color: white;
  cursor: pointer;
  border-radius: 100px;
  background: transparent;
  /* Transparent background */
  border: 2px solid white;
  /* White border */
  transition: all 0.3s ease;
}

.button-white {
  position: relative;
  cursor: pointer;
  border-radius: 100px;
  background: white;
  width: fit-content;
  /* Transparent background */
  border: 2px solid transparent;
  /* White border */
  transition: all 0.3s ease;
}

/* Hover state */
.secondary-button:hover,
.button-white:hover {
  border: 2px solid transparent;
  /* Transparent border to show gradient */
  background-image:
    linear-gradient(272deg,
      rgba(0, 139, 255, 0.8) 4.81%,
      rgba(53, 160, 252, 0.8) 39.26%,
      rgba(153, 202, 233, 0.8) 94.28%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(128, 200, 255, 0.9) 20%,
      rgba(64, 169, 255, 0.85) 40%,
      rgba(0, 136, 255, 0.8) 60%,
      rgba(0, 106, 255, 0.75) 80%,
      rgba(0, 68, 255, 0.7) 100%);
  /* Gradient background */
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    0 0 15px rgba(0, 136, 255, 0.4),
    0 0 20px rgba(0, 106, 255, 0.2);
  /* Glow effect */
}

/* Active state */
.secondary-button:active,
.button-white:active {
  background-image:
    linear-gradient(180deg, #0088ff 0%, #0077ff 100%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(64, 169, 255, 0.7) 40%,
      rgba(0, 106, 255, 0.6) 100%);
  box-shadow: 0 0 10px rgba(0, 136, 255, 0.3);
  /* Subtle shadow */
}

/* Focus state for accessibility */
/* .secondary-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.3), 0 0 10px rgba(0, 136, 255, 0.4);
} */

/* Disabled state */
.secondary-button:disabled,
.button-white:disabled {
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

.button-with-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  color: white;
  isolation: isolate;
  background: transparent;
  z-index: 1;
}

.button-with-icon::before {
  content: "";
  position: absolute;
  inset: -2px;
  border: 1px solid white;
  border-radius: 100px;
  z-index: -1;
  opacity: 0.8;
  transition: background 0.3s ease;
}

.button-with-icon:hover::before {
  background: linear-gradient(180deg,
      rgba(156, 164, 169, 0.2) 0%,
      rgba(62, 65, 67, 0.2) 100%);
}

.button-with-icon:hover::after {
  content: "";
  position: absolute;
  inset: -2px;
  padding: 2px;
  background: linear-gradient(180deg,
      rgba(173, 216, 230, 0.95) 0%,
      /* Light blue at the top */
      rgba(100, 149, 237, 0.9) 25%,
      /* Cornflower blue */
      rgba(65, 105, 225, 0.85) 50%,
      /* Royal blue in the middle */
      rgba(0, 0, 205, 0.8) 75%,
      /* Medium blue towards the bottom */
      rgba(0, 0, 139, 0.75) 100%
      /* Navy blue at the bottom */
    );

  border-radius: 100px;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
  opacity: 0.9;
}

.button-with-icon:hover {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(0, 136, 255, 0.3),
    0 0 10px rgba(0, 136, 255, 0.4);
}

.button-with-icon:hover {
  box-shadow:
    /* Inner glow */
    0 0 20px rgba(0, 136, 255, 0.3),
    /* Middle layer */
    0 5px 20px rgba(0, 106, 255, 0.3),
    /* Outer glow */
    0 5px 10px rgba(0, 68, 255, 0.3);
}

/* Banner Button Base Styles */
.banner-button-primary,
.banner-button-secondary {
  position: relative;
  font-weight: 600;
  cursor: pointer;
  border-radius: 50px;
  transition: all;
  animation-duration: 100ms;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  overflow: hidden;
}

/* Primary Button with Gradient Shift */
.banner-button-primary {
  color: white;
  background-image: linear-gradient(45deg,
      #000000 0%,
      #1a1a1a 50%,
      #000000 100%);
  background-size: 100% 100%;
  border: 2px solid transparent;
}

.banner-button-primary:hover {
  background-position: 100% 100%;
}

/* Animated gradient border on hover */
.banner-button-primary::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  background: linear-gradient(90deg, #4a4a4a, #2a2a2a, #4a4a4a);
  background-size: 200% 100%;
  opacity: 0;
  transition: all 0.3s ease;
}

.banner-button-primary:hover::before {
  opacity: 1;
}

/* Secondary Button with Smooth Gradient Transition */
.banner-button-secondary {
  color: black;
  background: transparent;
  border: 1px solid black;
  transition: all 0.5s ease;
}

.banner-button-secondary:hover {
  border-color: transparent;
  color: white;
  background-image: linear-gradient(135deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(51, 51, 51, 0.9) 50%,
      rgba(0, 0, 0, 0.9) 100%);
}

/* Gradient overlay effect */
.banner-button-secondary::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg,
      transparent 25%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 75%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.banner-button-secondary:hover::before {
  opacity: 1;
}

/* Shared hover glow effect */
.banner-button-primary:hover,
.banner-button-secondary:hover {
  transform: translateY(0px);
}

/* Active state */
.banner-button-primary:active,
.banner-button-secondary:active {
  transform: translateY(0px);
}

/* Gradient border animation */
@keyframes gradientBorder {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* Focus states */
.banner-button-primary:focus,
.banner-button-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
}

/* Disabled states */
.banner-button-primary:disabled,
.banner-button-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: #cccccc;
  border-color: #999999;
  box-shadow: none;
}

/* Remove hover effects for disabled state */
.banner-button-primary:disabled::before,
.banner-button-secondary:disabled::before {
  display: none;
}
</style>
