<script setup>
  // const { origin } = useRequestURL();
  const { $pwa } = useNuxtApp();
  const installationPromptIsShown = ref(!$pwa?.isPWAInstalled);

  const installPwa = async () => {
    await $pwa?.install();
  };
</script>

<template>
  <NuxtPwaManifest/>
  <div>
    <div
      class="max-w-screen-sm absolute bottom-4 bg-white/20 backdrop-blur-md mx-6 p-4 rounded-2xl border-2 border-gray-100"
      v-if="installationPromptIsShown"
    >
      <p class="text-xs font-medium">
        Install this app on your device for quick and easy access even when
        you're offline.
      </p>
      <div class="flex justify-between mt-4">
        <button
          class="px-6 text-xs bg-[#031187] rounded-md text-white font-semibold"
          @click="installPwa()"
        >
          Install Now
        </button>
        <button
          class="flex-1 text-xs rounded-md p-2 text-gray-400 font-semibold"
          @click="installationPromptIsShown = false"
        >
          Some other time
        </button>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>