<script setup>
const props = defineProps({
  image: {
    type: Array,
    required: true,
  },
  title: {
    type: Array,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: false,
    default: 0,
  },
});

const bg = {
  0: "/Homepage/Tiles-F1-eclipse.svg",
  1: "/Homepage/Home-F2-Eclipse.svg",
  2: "/Homepage/Home-F3-Eclipse.svg",
};
</script>

<template>
  <div
    class="w-full border border-[#313539] h-auto p-6 flex flex-col items-center rounded-lg gap-4 bg-no-repeat"
    :class="bg[index]"
    :style="{ backgroundImage: `url(${bg[index]})` }"
  >
    <div class="rounded-full flex justify-center items-center mb-4">
      <img :src="props.image" alt="Card Image" class="w-full h-auto" />
    </div>
    <h3 class="title-color text-3xl font-semibold text-[#BEC0C2] text-center">
      {{ props.title }}
    </h3>
    <p class="text-sm text-[#DCDCDF] text-center">
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped>
.bg-color {
  background: linear-gradient(
    to right,
    rgba(0, 194, 255, 0),
    rgba(138, 41, 255, 0.3)
  );
}

.title-color {
  background: linear-gradient(270deg, #75cdd6 0%, #008cff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
