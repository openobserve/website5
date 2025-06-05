<script setup>
const props = defineProps({
  image: {
    type: [Object, String],
    required: false,
    default: () => null,
  },
  altText: {
    type: String,
    required: false,
    default: "",
  },
  cssClass: {
    type: String,
    required: false,
    default: "",
  },
  loading: {
    type: String,
    required: false,
    default: "lazy",
  },
});

// Return the correct URL from string or object
function getImageUrl(source, size = null) {
  if (!source) return "/img/default_project_image.png";

  if (typeof source === "string") return source;

  if (size && source.formats?.[size]?.url) {
    return source.formats[size].url;
  }

  // if (source.url) return source.url;

  return "/img/default_project_image.png";
}
</script>

<template>
  <img
  :src="getImageUrl(image, 'medium')"
  :srcset="`
    ${getImageUrl(image, 'thumbnail')} 245w,
    ${getImageUrl(image, 'small')} 500w,
    ${getImageUrl(image, 'medium')} 750w,
    ${getImageUrl(image, 'large')} 1000w,
    ${getImageUrl(image)} 3024w
  `"
  sizes="(max-width: 480px) 90vw,
         (max-width: 768px) 100vw,
         (max-width: 1024px) 750px,
         1000px"
  :alt="altText || 'Image'"
  :loading="loading"
  :class="cssClass"
/>
</template>
