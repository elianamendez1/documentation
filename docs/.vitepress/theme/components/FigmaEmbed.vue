<template>
  <div class="figma-embed-container">
    <iframe
      class="figma-iframe"
      :src="embedUrl"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: '500'
  }
})

// Esta función formatea la URL normal de Figma para que funcione en un iframe
const embedUrl = computed(() => {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(props.url)}`
})
</script>

<style scoped>
.figma-embed-container {
  margin: 20px 0;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.figma-iframe {
  width: 100%;
  height: v-bind('height + "px"');
  border: none;
  background: var(--vp-c-bg-soft);
}
</style>