<template>
  <div class="card h-full rounded-2xl">
    <div class="flex flex-col h-full">
      <div class="h-[50%] p-6">
        <img
          :src="card.image"
          :alt="card.title"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div class="h-[50%] p-6 flex flex-col">
        <div>
          <h3 class="text-[#BEC0C2] text-2xl font-bold mb-3">{{ card.title }}</h3>
          <p class="text-white text-base card-description">{{ card.description }}</p>
        </div>
        <a
          :href="card.link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#80B9FF] font-bold text-xs mt-4"
        >
          {{ card.btnTitle }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftCard",
  props: {
  card: {
    type: Object, // The `card` prop is expected to be a single object
    required: true, // This prop is mandatory
    default: () => ({
      image: "",
      title: "",
      description: "",
      btnTitle: "",
      link: "#",
    }),
  },
},
};
</script>
