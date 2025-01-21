<script>
import TextGradient from "../HeaderComponents/TextWithGradient.vue";
export default {
  name: "Footer",
  props: {
    footerData: {
      type: Object,
      required: true,
      validator(value) {
        return (
          value.sections && value.copyright && value.githubStats && value.socialLinks
        );
      },
    },
  },
};
</script>

<style scoped>
.gradient-hover {
  display: inline-block;
}
.gradient-hover:hover {
  background: linear-gradient(to left, rgb(var(--blue-light)), rgb(var(--blue-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<template>
  <div class="bg-[#14181B] w-full">
    <div class="container mx-auto p-4">
      <!-- Main Footer Content -->
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <div
          v-for="section in footerData.sections"
          :key="section.title"
          class="min-w-0"
        >
          <h3 class="text-[#929A9E] font-medium text-base mb-4">{{ section.title }}</h3>

          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item.name">
              <a
                :href="item.link"
                class="gradient-hover text-[#BEC0C2] text-sm"
              >
                <TextGradient textGradientColor="" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
     
      <div class="flex flex-col md:flex-row justify-between mb-5">
          <!-- Pricing Section -->
          <div class="rounded-lg w-full mb-4 md:mb-0">
            <h3 class="text-[#929A9E] font-medium text-base mb-4">Pricing</h3>
            <ul>
              <li>
                <a href="/" class="gradient-hover text-[#BEC0C2] font-normal text-sm">
                  <TextGradient textGradientColor="" /> View Plans
                </a>
              </li>
            </ul>
          </div>

          <!-- GitHub Stats Section -->
          <div class="flex items-center space-x-4 w-full md:w-auto">
            <a
              v-for="stat in footerData.githubStats"
              :key="stat.label"
              :href="stat.link"
              class="flex items-center space-x-2 bg-[#353B40] rounded border border-[#595D62]"
            >
              <div class="flex flex-row items-center p-2 gap-2">
                <img :src="stat.icon" :alt="stat.label" class="w-4 h-4 text-white" />
                <span class="text-sm text-[#FFFFFF] mr-1">{{ stat.label }}</span>
              </div>
              <span
                class="text-sm text-[#FFFFFF] bg-[#14181B] w-1/2 h-full p-2 rounded-r"
              >
                {{ stat.count }}
              </span>
            </a>
          </div>
        </div>


      <!-- Bottom Section -->
      <div
        class="border-t border-gray-700 pt-5 flex flex-col-reverse gap-4 md:flex-row justify-between items-center text-[#FFFFFF]"
      >
        <!-- Copyright -->
        <div class="flex items-center">
          <div class="flex flex-row items-center space-x-4 md:mb-0 font-normal text-sm">
            <p class="text-sm">
              <TextGradient textGradientColor="" />{{ footerData.copyright.text }}
            </p>
          </div>
        </div>
        <div class='flex items-center gap-6'>
          <p class="text-sm gradient-hover">
              <TextGradient textGradientColor="" />{{ footerData.tos.text }}
            </p>
            <p class="text-sm gradient-hover">
              <TextGradient textGradientColor="" />{{ footerData.pp.text }}
            </p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Social Links -->
          <div class="social-links flex space-x-4">
            <div
              class="flex items-center space-x-4"
            >
              <a href="/" class="flex items-center shadow-[inset_0_0_15px_2px_rgba(255,223,0,0.3)] hover:shadow-[inset_0_0_5px_2px_rgba(255,223,0,0.3)] rounded-md p-2">
                <img src="/slack.svg" class="w-6 h-6" />
                
              </a>
              <a href="/" class="flex items-center shadow-[inset_0_0_20px_3px_rgba(255,223,0,0.3)] hover:shadow-[inset_0_0_30px_10px_rgba(255,223,0,0.6)] p-2 rounded-md">
                <img src="/twitter.svg" class="w-6 h-6" />
              </a>  
              <a href="/" class="flex items-center shadow-[inset_0_0_20px_3px_rgba(255,223,0,0.3)] hover:shadow-[inset_0_0_30px_10px_rgba(255,223,0,0.6)] p-2 rounded-md ">
                <img src="/linked-in.svg" class="w-6 h-6" />
              </a>  
              <a href="/" class="flex items-center shadow-[inset_0_0_20px_3px_rgba(255,223,0,0.3)] hover:shadow-[inset_0_0_30px_10px_rgba(255,223,0,0.6)] p-2 rounded-md ">
                <img src="/git.svg" class="w-6 h-6" />
              </a> 
              <a href="/" class="flex items-center shadow-[inset_0_0_20px_3px_rgba(255,223,0,0.3)] hover:shadow-[inset_0_0_30px_10px_rgba(255,223,0,0.6)] p-2 rounded-md ">
                <img src="/youtube.svg" class="w-6 h-6" />
              </a>                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
