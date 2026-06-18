<template>
  <div class="dashboard-header">
<!--     Заголовок -->
    <div class="header-title-block">
      <h1 class="header-title">Загруженность команды</h1>
    </div>
<!--     Блок синхронизации -->
    <div class="header-sync-block">
      <span class="last-update">Последнее обновление: {{ formattedTime }}</span>
      <button class="sync-button" @click="$emit('sync')">
        <span class="sync-text">Синхронизировать</span>
        <span class="sync-icon">⟳</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Пропсы: время последнего обновления
const props = defineProps({
  lastUpdate: { type: Date, default: () => new Date() }
})

// Событие: синхронизация
defineEmits(['sync'])

// Форматирование времени
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
}

.header-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
}

.header-sync-block {
  display: flex;
  align-items: center;
  gap: 12px;
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

.sync-button:hover {
  background: #e9e8e0;
}

.sync-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #141413;
}

.sync-icon {
  font-size: 16px;
}
</style>