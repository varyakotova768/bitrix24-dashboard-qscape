<template>
  <div class="employee-card">
<!--     Основная информация -->
    <div class="employee-main">
      <div class="employee-info">
        <div class="employee-avatar" :style="{ backgroundImage: `url(${employee.avatar})` }"></div>
        <div class="employee-details">
          <div class="employee-name">{{ employee.name }}</div>
          <div class="employee-position">{{ employee.position }}</div>
        </div>
      </div>

<!--       Список задач сотрудника -->
      <div class="employee-tasks">
        <TaskBadge
            v-for="task in employee.tasks"
            :key="task.id"
            :task="task"
        />
        <div v-if="employee.tasks.length === 0" class="no-tasks">Нет активных задач</div>
      </div>
    </div>

<!--     Боковая панель: загруженность + Битрикс24 -->
    <div class="employee-sidebar">
      <div class="workload-indicator" :class="workloadClass">
        <span class="workload-label">Запланировано</span>
        <strong class="workload-hours">{{ employee.plannedHours }}/{{ employee.capacity }}</strong>
      </div>
      <button class="bitrix-link" @click="$emit('openBitrix')">
        <svg class="bitrix-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="#3D3D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 3H21V9" stroke="#3D3D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 14L21 3" stroke="#3D3D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Битрикс24
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskBadge from './TaskBadge.vue'

// Пропсы: данные сотрудника
const props = defineProps({
  employee: { type: Object, required: true }
})

// Событие: открыть Битрикс24
defineEmits(['openBitrix'])

// Класс загруженности в зависимости от статуса
const workloadClass = computed(() => {
  switch (props.employee.loadStatus) {
    case 'overload': return 'workload-overload'
    case 'free': return 'workload-free'
    default: return 'workload-normal'
  }
})
</script>

<style scoped>
.employee-card {
  display: flex;
  padding: 14px;
  gap: 8px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D5D4CE;
  border-radius: 10px;
}

.employee-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.employee-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #ddd;
  flex-shrink: 0;
}

.employee-details {
  display: flex;
  flex-direction: column;
}

.employee-name {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #141413;
}

.employee-position {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #3D3D3A;
}

.employee-tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.no-tasks {
  font-size: 14px;
  color: #999;
}

.employee-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.workload-indicator {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 8px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
}

.workload-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
}

.workload-hours {
  font-size: 20px;
  font-weight: 500;
  line-height: 22px;
}

.workload-overload {
  background: #FAECE7;
  color: #E24B4A;
}

.workload-free {
  background: #EAF3DE;
  color: #416517;
}

.workload-normal {
  background: #EEEDFE;
  color: #3C3489;
}

.bitrix-link {
  display: flex;
  align-items: center;
  padding: 4px 6px 4px 4px;
  gap: 6px;
  border: 1px solid #B6B6B5;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #3D3D3A;
  transition: 0.2s;
}

.bitrix-link:hover {
  background: #f0f0ee;
}

.bitrix-icon {
  flex-shrink: 0;
}
</style>