<template>
  <div class="container border border-red-400 mx-auto p-4">
    <div class="flex flex-col lg:flex-row gap-3 justify-center">
      <!-- First Card - Left Side -->
      <div v-if="cards.length > 0" class="lg:w-[50%]">
        <div class="card h-full rounded-2xl">
          <div class="flex flex-col h-full">
            <!-- Top image section -->
            <div class="h-[50%] p-6">
              <img
                :src="cards[0].image"
                :alt="cards[0].title"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
            <!-- Bottom content section -->
            <div class="h-[50%] p-6 flex flex-col">
              <div>
                <h3 class="text-[#BEC0C2] text-2xl font-bold mb-3">
                  {{ cards[0].title }}
                </h3>
                <p class="text-white text-base card-description">
                  {{ cards[0].description }}
                </p>
              </div>
              <a
                :href="cards[0].link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#80B9FF] font-bold text-xs mt-4"
              >
                {{ cards[0].btnTitle }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 w-[50% ]">
        <div
          v-for="(item, index) in remainingCards"
          :key="index"
          class="card rounded-2xl"
        >
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
                <p class="text-white text-base card-description">
                  {{ item.description }}
                </p>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "CardWithImage",
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    remainingCards() {
      return this.cards.slice(1);
    },
  },
};
</script>

<style scoped>
.card {
  background: #23282c;
  border-radius: ;
  border-image: linear-gradient(rgb(208, 251, 255), rgb(119, 139, 255)) 1;
}
/* .card:hover{
  background-image:linear-gradient(to right, rgb(208,251,254), rgb(119,139,255));
} */
.card-description {
  line-height: 1.4;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-text {
  text: 24px;
}
</style>
