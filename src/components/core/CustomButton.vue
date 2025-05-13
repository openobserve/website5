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
        "outline",
        "tertiary",
        "orange",
        "black-primary",
        "black-secondary",
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
      type: [String, Array],  // Can accept both String or Array of strings
      default: () => []        // Default is an empty array
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
  outline: "outline-button",
  tertiary: "tertiary-button",
  orange: "orange-button",
  "black-primary": "black-primary-button",
  "black-secondary": "black-secondary-button",
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
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: var(--color-primary-blue);
  background-color: var(--color-primary-blue);
  /* Creates a 2px border that matches the button color initially */
  border: 1px solid transparent;
}

.primary-button:hover {
  background-color: var(--color-hover-card);
}
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
  border: none;
  color: #5764d9 ;
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: white;
  border: 1px solid transparent;
}
.secondary-button:hover{
  /* Transparent border to show gradient */
  background-color:#f3f4f6;

}
.secondary-button:disabled{
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #cccccc;
  /* Light gray border for disabled state */
  background: transparent;
  box-shadow: none;
}

.outline-button {
  position: relative;
  color: black;
  cursor: pointer;
  border-radius: 12px;
  background: transparent;
  /* Transparent background */
  border: 1px solid black;
  /* White border */
  transition: all 0.3s ease;
}
.outline-button:hover{
  border: 1px solid white;
  /* Transparent border to show gradient */
  color: white;

}
.outline-button:disabled{
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #cccccc;
  /* Light gray border for disabled state */
  background: transparent;
  box-shadow: none;
}


.tertiary-button {
  position: relative;
  color: white;
  cursor: pointer;
  border-radius: 12px;
  background: transparent;
  /* Transparent background */
  border: 1px solid white;
  /* White border */
  transition: all;
}
.tertiary-button:hover{
  background: rgba(255, 255, 255, 0.1); 

}
.tertiary-button:disabled{
  opacity: 0.6;
  cursor: not-allowed;
  border-color: #cccccc;
  /* Light gray border for disabled state */
  background: transparent;
  box-shadow: none;
}


.orange-button {
  position: relative;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: #F45B49;
  /* Creates a 2px border that matches the button color initially */
  border: 1px solid transparent;
}

.orange-button:hover {
  /* Only change the border gradient on hover */
  background-color:#DE5444;
}
.orange-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}

.black-primary-button {
  position: relative;
  border: none;
  color: #6B76E3;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: black;
  /* Creates a 2px border that matches the button color initially */
  border: 1px solid #6B76E3 ;
}

.black-primary-button:hover {
  background-color: #1e1d1d;
  color:white
}
.black-primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
  box-shadow: none;
}

.black-secondary-button {
  position: relative;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all 0.3s ease;
  background-color: black;
  /* Creates a 2px border that matches the button color initially */
  border: 1px solid transparent;
}

.black-secondary-button:hover {
  background-color: #1e1d1d;
  color:#6B76E3
}
.black-secondary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-image:
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%),
    linear-gradient(180deg, #8cc7ff 0%, #7ab7ff 100%);
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

</style>
