<template>
  <div class="rule-card">
    <div class="rule-header">
      <span class="rule-icon">⚖️</span>
      <strong>Regla de Negocio: {{ id }}</strong>
    </div>
    <div class="rule-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(['id'])
</script>

<style scoped>
.rule-card {
  margin: 1rem 0;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #BD0D12;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
}
.rule-header {
  padding: 8px 16px;
  background: #FFF2F2;
  border-bottom: 1px solid #e2e8f0;
}
.rule-content {
  padding: 16px;
  font-style: italic;
}
</style>