<template>
  <div class="dashboard-header">
    <div class="header-title-block">
      <h1 class="header-title">Загруженность команды</h1>
    </div>
    <div class="header-sync-block">
      <span class="last-update">Последнее обновление: {{ formattedTime }}</span>
      <button class="sync-button" :disabled="isLoading" @click="$emit('sync')">
        <span class="sync-text">{{ isLoading ? 'Загрузка...' : 'Синхронизировать' }}</span>
        <span class="sync-icon" :class="{ 'rotating': isLoading }">⟳</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lastUpdate: { type: Date, default: () => new Date() },
  isLoading: { type: Boolean, default: false }
})

defineEmits(['sync'])

const formattedTime = computed(() => {
  const d = props.lastUpdate
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
})
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
}

.header-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
  margin: 0;
}

.header-sync-block {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.last-update {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #141413;
}

.sync-button {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;
  border: 1px solid #B6B6B5;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: 0.2s;
}

.sync-button:hover:not(:disabled) {
  background: #e9e8e0;
}

.sync-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sync-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #141413;
}

.sync-icon {
  font-size: 18px;
  display: inline-block;
}

.rotating {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .header-title {
    font-size: 28px;
    line-height: 34px;
  }
  
  .last-update {
    font-size: 14px;
  }
  
  .sync-text {
    font-size: 14px;
  }
  
  .header-sync-block {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 22px;
    line-height: 28px;
  }
  
  .sync-button {
    padding: 4px 8px;
  }
}
</style>