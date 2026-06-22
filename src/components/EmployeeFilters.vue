<template>
  <div class="employee-filters">
    <div class="filter-tabs">
      <div
        class="filter-tab"
        :class="{ active: activeTab === 'employees', disabled: isLoading }"
        @click="!isLoading && $emit('update:activeTab', 'employees')"
      >
        <span class="filter-tab-text">Сотрудники</span>
      </div>
      <div
        class="filter-tab"
        :class="{ active: activeTab === 'tasks', disabled: isLoading }"
        @click="!isLoading && $emit('update:activeTab', 'tasks')"
      >
        <span class="filter-tab-text">Задачи</span>
      </div>
    </div>

    <div v-if="activeTab === 'employees'" class="tab-content">
      <div class="period-filters">
        <div
          class="period-chip"
          :class="{ active: periodFilter === 'today' }"
          @click="setPeriod('today')"
        >Сегодня</div>
        <div
          class="period-chip"
          :class="{ active: periodFilter === 'week' }"
          @click="setPeriod('week')"
        >Неделя</div>
        <div
          class="period-chip"
          :class="{ active: periodFilter === 'month' }"
          @click="setPeriod('month')"
        >Месяц</div>
      </div>

      <div class="workload-filters">
        <div
          class="workload-chip"
          :class="{ active: workloadFilter === 'all' }"
          @click="!isLoading && $emit('update:workloadFilter', 'all')"
        >Все</div>
        <div
          class="workload-chip"
          :class="{ active: workloadFilter === 'overload' }"
          @click="!isLoading && $emit('update:workloadFilter', 'overload')"
        >Перегружены</div>
        <div
          class="workload-chip"
          :class="{ active: workloadFilter === 'normal' }"
          @click="!isLoading && $emit('update:workloadFilter', 'normal')"
        >Норма</div>
        <div
          class="workload-chip"
          :class="{ active: workloadFilter === 'free' }"
          @click="!isLoading && $emit('update:workloadFilter', 'free')"
        >Свободны</div>
      </div>

      <div class="search-field">
        <span class="search-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#3D3D3A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <input
          type="text"
          class="search-input"
          placeholder="Поиск..."
          :value="search"
          :disabled="isLoading"
          @input="$emit('update:search', $event.target.value)"
        />
      </div>
    </div>

    <div v-else-if="activeTab === 'tasks'" class="tab-content">
      <div class="task-filters">
        <div
          class="task-filter-chip"
          :class="{ active: taskStatusFilter === 'all' }"
          @click="taskStatusFilter = 'all'"
        >Все статусы</div>
        <div
          class="task-filter-chip"
          :class="{ active: taskStatusFilter === 'pending' }"
          @click="taskStatusFilter = 'pending'"
        >Ожидает выполнения</div>
        <div
          class="task-filter-chip"
          :class="{ active: taskStatusFilter === 'inProgress' }"
          @click="taskStatusFilter = 'inProgress'"
        >Выполняется</div>
        <div
          class="task-filter-chip"
          :class="{ active: taskStatusFilter === 'waiting' }"
          @click="taskStatusFilter = 'waiting'"
        >Ждет контроля</div>
        <div
          class="task-filter-chip"
          :class="{ active: taskStatusFilter === 'completed' }"
          @click="taskStatusFilter = 'completed'"
        >Завершена</div>
      </div>

      <div class="task-filters">
        <div
          class="task-filter-chip"
          :class="{ active: deadlineFilter === 'all' }"
          @click="deadlineFilter = 'all'"
        >Все дедлайны</div>
        <div
          class="task-filter-chip"
          :class="{ active: deadlineFilter === 'overdue' }"
          @click="deadlineFilter = 'overdue'"
        >Просрочено</div>
        <div
          class="task-filter-chip"
          :class="{ active: deadlineFilter === 'today' }"
          @click="deadlineFilter = 'today'"
        >Сегодня</div>
        <div
          class="task-filter-chip"
          :class="{ active: deadlineFilter === 'tomorrow' }"
          @click="deadlineFilter = 'tomorrow'"
        >Завтра</div>
      </div>

      <div class="search-field">
        <span class="search-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#3D3D3A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <input
          type="text"
          class="search-input"
          placeholder="Поиск..."
          :value="taskSearch"
          :disabled="isLoading"
          @input="$emit('update:taskSearch', $event.target.value)"
        />
      </div>

      <div class="empty-tasks">
        <span class="empty-text">Нет задач</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  search: { type: String, default: '' },
  workloadFilter: { type: String, default: 'all' },
  taskSearch: { type: String, default: '' },
  activeTab: { type: String, default: 'employees' },
  isLoading: { type: Boolean, default: false }
})

defineEmits(['update:search', 'update:workloadFilter', 'update:taskSearch', 'update:activeTab'])

const periodFilter = ref('today')
const taskStatusFilter = ref('all')
const deadlineFilter = ref('all')

const setPeriod = (period) => {
  periodFilter.value = period
}
</script>

<style scoped>
.employee-filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.filter-tabs {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 4px 8px;
  background: #F5F4ED;
  border: 1px solid #D5D4CE;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
}

.filter-tab.active {
  border: 1px solid #3D3D3A;
  background: #EBEAE2;
}

.filter-tab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-tab-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #3D3D3A;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.period-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.period-chip {
  padding: 4px 16px;
  background: #F5F4ED;
  border: 1px solid #D5D4CE;
  border-radius: 52px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3D3D3A;
  transition: 0.15s;
}

.period-chip.active {
  border: 1px solid #3D3D3A;
  background: #E2E1D9;
}

.period-chip:hover {
  background: #EBEAE2;
}

.workload-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.workload-chip {
  padding: 4px 12px;
  background: #F5F4ED;
  border: 1px solid #D5D4CE;
  border-radius: 52px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3D3D3A;
  transition: 0.15s;
}

.workload-chip.active {
  border: 1px solid #3D3D3A;
  background: #E2E1D9;
}

.workload-chip:hover {
  background: #EBEAE2;
}

.search-field {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D5D4CE;
  border-radius: 6px;
}

.search-icon {
  display: flex;
  align-items: center;
}

.search-input {
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  width: 100%;
  background: transparent;
  color: #3D3D3A;
}

.search-input::placeholder {
  color: #3D3D3A;
  opacity: 0.7;
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.task-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.task-filter-chip {
  padding: 4px 12px;
  background: #F5F4ED;
  border: 1px solid #D5D4CE;
  border-radius: 52px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3D3D3A;
  transition: 0.15s;
}

.task-filter-chip.active {
  border: 1px solid #3D3D3A;
  background: #E2E1D9;
}

.task-filter-chip:hover {
  background: #EBEAE2;
}

.empty-tasks {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D5D4CE;
  border-radius: 10px;
}

.empty-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #3D3D3A;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .filter-tab-text {
    font-size: 16px;
    line-height: 20px;
  }
  
  .period-chip,
  .workload-chip,
  .task-filter-chip {
    font-size: 14px;
    line-height: 17px;
  }
  
  .search-input {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    gap: 10px;
  }
  
  .filter-tab {
    padding: 2px 6px;
  }
  
  .filter-tab-text {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>