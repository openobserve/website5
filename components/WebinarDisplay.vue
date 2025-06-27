<template>
  <div>
    <!-- Show subscription form if live or upcoming -->
    <div v-if="isWebinarLive(currentWebinar) || isWebinarUpcoming(currentWebinar)">
      <!-- ...existing subscription form code... -->
    </div>

    <!-- Show video thumbnail if past -->
    <div v-else-if="isWebinarPast(currentWebinar)"
      class="border border-gray-200 rounded-lg p-0 h-full flex flex-col relative overflow-hidden"
      style="aspect-ratio: 16/9;">

      <!-- Layer 1: YouTube Video Embed -->
      <div class="absolute inset-0 z-10 pointer-events-none">
        <iframe class="w-full h-full rounded-lg pointer-events-none"
          :src="`https://www.youtube.com/embed/${currentWebinar.youtubeId}?si=sQl7Un-qZ4aqUJEg`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </div>

      <!-- Layer 2: Background gradient overlay -->
      <div
        class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#6A76E3] via-blue-900/60 via-blue-800/25 to-transparent z-20 rounded-lg pointer-events-none">
      </div>

      <!-- Layer 3: Content overlay -->
      <div class="absolute inset-0 z-30 flex flex-col justify-between p-2 pointer-events-none">
        <div class="self-end">
          <span class="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
            {{ currentWebinar.duration }}
          </span>
        </div>
        <div class="self-start w-full">
          <div class="bg-opacity-50 rounded p-1">
            <h3 class="text-base font-semibold mb-0 line-clamp-2 text-white">
              {{ currentWebinar.title }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Layer 4: Clickable overlay -->
      <a :href="`https://www.youtube.com/watch?v=${currentWebinar.youtubeId}`" target="_blank" rel="noopener noreferrer"
        class="absolute inset-0 z-40" style="display: block; pointer-events: auto;" aria-label="Watch on YouTube"></a>
    </div>
  </div>
</template>

<script setup>
// ...existing code...
// Assume currentWebinar is the webinar to display (live, upcoming, or past)
// and has properties: youtubeId, duration, title, etc.
// Also assume isWebinarLive, isWebinarUpcoming, isWebinarPast are available
// ...existing code...
</script>