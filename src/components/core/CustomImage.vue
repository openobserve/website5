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
function generateSrcset(source) {
  if (!source || typeof source === "string") return "";

  const sizes = [
    { key: "thumbnail", width: "245w" },
    { key: "small", width: "500w" },
    { key: "medium", width: "750w" },
    { key: "large", width: "1000w" },
  ];

  const srcset = sizes
    .map(({ key, width }) => {
      const url = getImageUrl(source, key);
      return url ? `${url} ${width}` : null;
    })
    .filter(Boolean);

  const original = getImageUrl(source);
  if (original && !original.includes("default_project_image.png")) {
    srcset.push(`${original} 3024w`);
  }

  return srcset.join(",\n");
}

// Return the correct URL from string or object
function getImageUrl(source, size = null) {
  if (!source) return "/img/default_project_image.png";

  if (typeof source === "string") return source;

  if (size && source.formats?.[size]?.url) {
    return source.formats[size].url;
  }

  if (source.url) return source.url;

  return "/img/default_project_image.png";
}
// function getImageDimensions(source, size = "medium") {
//   if (!source || typeof source === "string") return { width: null, height: null };

//   if (size && source.formats?.[size]) {
//     return {
//       width: source.formats[size].width,
//       height: source.formats[size].height,
//     };
//   }

//   if (source.width && source.height) {
//     return {
//       width: source.width,
//       height: source.height,
//     };
//   }

//   return { width: null, height: null };
// }
// 🟡 REACTIVE WIDTH & HEIGHT
const dimensions = computed(() => {
  const source = props.image;
  const size = 'medium';

  if (!source || typeof source === "string") return { width: null, height: null };

  if (size && source.formats?.[size]) {
    return {
      width: source.formats[size].width,
      height: source.formats[size].height,
    };
  }

  if (source.width && source.height) {
    return {
      width: source.width,
      height: source.height,
    };
  }

  return { width: null, height: null };
});
</script>

<template>
  <!-- <img
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
/> -->
  <img
    :src="getImageUrl(image, 'medium')"
    :srcset="generateSrcset(image)"
    sizes="(max-width: 480px) 90vw,
           (max-width: 768px) 100vw,
           (max-width: 1024px) 750px,
           1000px"
    :alt="altText || 'Image'"
    :loading="loading"
    :class="cssClass"
    :width="dimensions.width"
    :height="dimensions.height"
  />
</template>
