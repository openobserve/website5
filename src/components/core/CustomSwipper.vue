<template>
  <div class="relative overflow-hidden bg-black">
    <!-- Scrolling container -->
    <div class="flex items-center gap-8" ref="swiperTrack">
      <!-- Main logos -->
      <img
        v-for="(logo, index) in logos"
        :key="index"
        :src="logo"
        alt="Company Logo"
        class="logo"
      />
      <!-- Duplicate logos for seamless looping -->
      <img
        v-for="(logo, index) in logos"
        :key="'dup-' + index"
        :src="logo"
        alt="Company Logo"
        class="logo"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        "/public/Logo place holder (2).svg",
        "/public/Logo place holder (3).svg",
        "/public/Logo place holder (4).svg",
        "/public/Logo place holder (5).svg",
      ],
    };
  },
  mounted() {
    this.startScrolling();
  },
  methods: {
    startScrolling() {
      const track = this.$refs.swiperTrack;
      const trackWidth = track.scrollWidth / 2; // Half (for seamless scroll logic)
      const speed = 0.5; // Adjust speed for smoother motion

      let scrollPos = 0;
      function step() {
        scrollPos += speed;

        if (scrollPos >= trackWidth) {
          // Reset scroll position for seamless infinite scroll
          scrollPos = 0;
        }

        track.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(step);
      }
      step();
    },
  },
};
</script>

<style scoped>
/* Styling */
.relative {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: flex-start;
}

.logo {
  height: 80px; /* Consistent height for all logos */
  object-fit: contain; /* Ensure logo scaling fits the container */
  filter: brightness(0) invert(1); /* White logo appearance on black */
  margin-right: 20px;
}

.flex {
  display: flex;
  /* Ensures seamless loop: include padding for start/end gaps if needed */
}

.will-change-transform {
  will-change: transform;
}
</style>
