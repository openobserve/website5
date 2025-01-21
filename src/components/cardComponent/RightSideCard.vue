<template>
  <div class="flex flex-col gap-3">
    <div v-for="(item, index) in cards" :key="index" class="card rounded-2xl">
      <div class="flex h-full">
        <div class="w-[50%] p-6">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div class="p-6 flex flex-col">
          <div>
            <h3 class="text-[#BEC0C2] text-2xl font-bold mb-3">{{ item.title }}</h3>
            <p class="text-white text-base card-description">{{ item.description }}</p>
          </div>
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#80B9FF] font-bold text-xs mt-4"
          >
            {{ item.btnTitle }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightCard",
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
