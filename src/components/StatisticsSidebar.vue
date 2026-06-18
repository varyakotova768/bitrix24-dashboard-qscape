<template>
  <div class="statistics-sidebar">
<!--     Блок распределения по команде -->
    <div class="distribution-block">
      <h3 class="sidebar-title">Распределение по команде</h3>

<!--       Кольцевая диаграмма -->
      <div class="pie-chart">
        <svg width="180" height="180" viewBox="0 0 40 40">
<!--           Фоновый круг -->
          <circle cx="20" cy="20" r="16" fill="none" stroke="#F5F4ED" stroke-width="6"/>

<!--           Перегружены (красный) -->
          <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#E24B4A"
              stroke-width="6"
              :stroke-dasharray="overloadDasharray"
              stroke-dashoffset="0"
              transform="rotate(-90 20 20)"
          />

<!--           Норма (фиолетовый) -->
          <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#3C3489"
              stroke-width="6"
              :stroke-dasharray="normalDasharray"
              :stroke-dashoffset="normalDashoffset"
              transform="rotate(-90 20 20)"
          />

<!--           Свободны (зелёный) -->
          <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#416517"
              stroke-width="6"
              :stroke-dasharray="freeDasharray"
              :stroke-dashoffset="freeDashoffset"
              transform="rotate(-90 20 20)"
          />

<!--           Центральный белый круг -->
          <circle cx="20" cy="20" r="11" fill="white"/>
        </svg>
      </div>

<!--       Легенда -->
      <div class="distribution-legend">
        <div class="legend-item">
          <div class="legend-color" style="background: #E24B4A"></div>
          <span class="legend-text">Перегружены — {{ distribution.overload }}</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #3C3489"></div>
          <span class="legend-text">Норма — {{ distribution.normal }}</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #416517"></div>
          <span class="legend-text">Свободны — {{ distribution.free }}</span>
        </div>
      </div>
    </div>

    <hr class="sidebar-divider" />

<!--     Блок статусов задач -->
    <div class="task-status-block">
      <h3 class="sidebar-title">Статусы задач</h3>
      <div class="task-status-list">
        <StatusBadge
            v-for="status in taskStatuses"
            :key="status.type"
            :status="status"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'
import { computed } from 'vue'

// Пропсы: распределение и статусы задач
const props = defineProps({
  distribution: { type: Object, required: true },
  taskStatuses: { type: Array, required: true }
})

// Общее количество сотрудников
const totalEmployees = computed(() => {
  return props.distribution.overload + props.distribution.normal + props.distribution.free
})

// Длина окружности
const CIRCUMFERENCE = 100.53

// Dasharray для сегмента "Перегружены"
const overloadDasharray = computed(() => {
  if (totalEmployees.value === 0) return '0 100.53'
  const percent = props.distribution.overload / totalEmployees.value
  const length = CIRCUMFERENCE * percent
  return `${length} ${CIRCUMFERENCE}`
})

// Dasharray для сегмента "Норма"
const normalDasharray = computed(() => {
  if (totalEmployees.value === 0) return '0 100.53'
  const percent = props.distribution.normal / totalEmployees.value
  const length = CIRCUMFERENCE * percent
  return `${length} ${CIRCUMFERENCE}`
})

// Dasharray для сегмента "Свободны"
const freeDasharray = computed(() => {
  if (totalEmployees.value === 0) return '0 100.53'
  const percent = props.distribution.free / totalEmployees.value
  const length = CIRCUMFERENCE * percent
  return `${length} ${CIRCUMFERENCE}`
})

// Смещение для сегмента "Норма" (после перегруженных)
const normalDashoffset = computed(() => {
  if (totalEmployees.value === 0) return 0
  const overloadPercent = props.distribution.overload / totalEmployees.value
  return -(CIRCUMFERENCE * overloadPercent)
})

// Смещение для сегмента "Свободны" (после перегруженных + норма)
const freeDashoffset = computed(() => {
  if (totalEmployees.value === 0) return 0
  const overloadPercent = props.distribution.overload / totalEmployees.value
  const normalPercent = props.distribution.normal / totalEmployees.value
  return -(CIRCUMFERENCE * (overloadPercent + normalPercent))
})
</script>

<style scoped>
.statistics-sidebar {
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 20px;
  width: 32%;
  flex-shrink: 0;
  background: #FFFFFF;
  border: 1px solid #D5D4CE;
  border-radius: 10px;
}

.distribution-block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.sidebar-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #141413;
}

.pie-chart {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.distribution-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sidebar-divider {
  width: 100%;
  border: 1px solid #D5D4CE;
}

.task-status-block {
  width: 100%;
}

.task-status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}
</style>