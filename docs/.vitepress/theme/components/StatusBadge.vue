<template>
  <span :class="['status-badge', type]">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: String,
  type: {
    default: 'info', // info, success, warning, danger
    type: String
  }
})
</script>

<style scoped>
.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}
.info { background: #EDEDFF; color: #2E2B9E; }
.success { background: #dcfce7; color: #15803d; }
.warning { background: #fef9c3; color: #a16207; }
.danger { background: #fee2e2; color: #b91c1c; }
</style>