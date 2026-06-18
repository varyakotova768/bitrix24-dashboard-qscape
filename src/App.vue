<template>
  <div class="app-wrapper">
    <div class="employees">
      <div class="main">
<!--        Шапка: заголовок + синхронизация-->
        <DashboardHeader :lastUpdate="lastUpdate" @sync="handleSync" />

<!--         5 карточек статистики -->
        <StatisticsCards :stats="statistics" />

<!--         Основной контент: фильтры + список / сайдбар -->
        <div class="dashboard-content">
          <div class="dashboard-left">
<!--             Фильтры (вкладки, поиск, сортировка) -->
            <EmployeeFilters
                v-model:search="searchQuery"
                v-model:workloadFilter="workloadFilter"
                v-model:activeTab="activeTab"
                v-model:taskSearch="taskSearch"
            />
<!--             Список сотрудников (только на вкладке "Сотрудники") -->
            <EmployeeList
                v-if="activeTab === 'employees'"
                :employees="filteredEmployees"
                @openBitrix="openBitrix"
            />
          </div>
<!--           Правый сайдбар: диаграмма + статусы задач -->
          <StatisticsSidebar :distribution="distributionData" :taskStatuses="taskStatusList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardHeader from './components/DashboardHeader.vue'
import StatisticsCards from './components/StatisticsCards.vue'
import EmployeeFilters from './components/EmployeeFilters.vue'
import EmployeeList from './components/EmployeeList.vue'
import StatisticsSidebar from './components/StatisticsSidebar.vue'

// данные сотрудников
const employees = ref([
  {
    id: 1, name: 'Петр Федоров', position: 'Backend Developer', avatar: '',
    plannedHours: 9, capacity: 8, loadStatus: 'overload',
    tasks: [
      { id: 101, title: 'Задача 1', status: 'pending', spentHours: 0, estimate: 2 },
      { id: 102, title: 'Задача 2', status: 'pending', spentHours: 1.2, estimate: 2 },
      { id: 103, title: 'Задача 3', status: 'pending', spentHours: 2.2, estimate: 1 },
      { id: 104, title: 'Задача 4', status: 'waiting', spentHours: 2.7, estimate: 2 },
      { id: 105, title: 'Задача 5', status: 'completed', spentHours: 2.7, estimate: 3 }
    ]
  },
  {
    id: 2, name: 'Иван Иванов', position: 'QA Engeneer', avatar: '',
    plannedHours: 6, capacity: 8, loadStatus: 'free',
    tasks: [
      { id: 201, title: 'Задача 6', status: 'inProgress', spentHours: 0.2, estimate: 1 },
      { id: 202, title: 'Задача 7', status: 'waiting', spentHours: 4.8, estimate: 5 }
    ]
  },
  {
    id: 3, name: 'Василиса Васильева', position: 'Android Developer', avatar: '',
    plannedHours: 6, capacity: 8, loadStatus: 'free',
    tasks: [
      { id: 301, title: 'Задача 8', status: 'pending', spentHours: 0, estimate: 1 },
      { id: 302, title: 'Задача 9', status: 'pending', spentHours: 0, estimate: 2 },
      { id: 303, title: 'Задача 10', status: 'inProgress', spentHours: 2.2, estimate: 2 }
    ]
  },
  {
    id: 4, name: 'Мария Ромашкова', position: 'Frontend Developer', avatar: '',
    plannedHours: 8, capacity: 8, loadStatus: 'normal',
    tasks: [
      { id: 401, title: 'Задача 11', status: 'pending', spentHours: 0, estimate: 1 },
      { id: 402, title: 'Задача 12', status: 'inProgress', spentHours: 1.2, estimate: 2 },
      { id: 403, title: 'Задача 13', status: 'waiting', spentHours: 2.2, estimate: 2 },
      { id: 404, title: 'Задача 14', status: 'completed', spentHours: 2.7, estimate: 3 }
    ]
  }
])

// Состояние фильтров
const searchQuery = ref('') // Поиск по сотрудникам
const workloadFilter = ref('all') // all overload normal free
const taskSearch = ref('') // Поиск по задачам
const activeTab = ref('employees') // employees tasks
const lastUpdate = ref(new Date()) // Время синхронизации

// Статистика
const statistics = computed(() => {
  const allTasks = employees.value.flatMap(e => e.tasks)
  const completedTasks = allTasks.filter(t => t.status === 'completed').length
  return {
    totalEmployees: employees.value.length,
    overloadCount: employees.value.filter(e => e.loadStatus === 'overload').length,
    freeCount: employees.value.filter(e => e.loadStatus === 'free').length,
    normalCount: employees.value.filter(e => e.loadStatus === 'normal').length,
    totalTasks: allTasks.filter(t => t.status !== 'completed').length,
    completedPercent: allTasks.length ? Math.round((completedTasks / allTasks.length) * 100) : 0
  }
})

// Данные для диаграммы
const distributionData = computed(() => ({
  overload: statistics.value.overloadCount,
  normal: statistics.value.normalCount,
  free: statistics.value.freeCount
}))

// Статусы задач для сайдбара
const taskStatusList = computed(() => {
  const tasks = employees.value.flatMap(e => e.tasks)
  return [
    { type: 'inProgress', label: 'Выполняется', count: tasks.filter(t => t.status === 'inProgress').length, color: 'blue' },
    { type: 'waiting', label: 'Ждет контроля', count: tasks.filter(t => t.status === 'waiting').length, color: 'red' },
    { type: 'pending', label: 'Ожидает выполнения', count: tasks.filter(t => t.status === 'pending').length, color: 'orange' },
    { type: 'completed', label: 'Завершена', count: tasks.filter(t => t.status === 'completed').length, color: 'green' }
  ]
})

// Фильтрация сотрудников
const filteredEmployees = computed(() => {
  let filtered = employees.value
  if (workloadFilter.value !== 'all') {
    filtered = filtered.filter(e => e.loadStatus === workloadFilter.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(e => e.name.toLowerCase().includes(q) || e.position.toLowerCase().includes(q))
  }
  return filtered
})

// Методы
const handleSync = () => { lastUpdate.value = new Date() }
const openBitrix = (id) => { alert(`Открыть карточку сотрудника в Битрикс24 (ID: ${id})`) }
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.app-wrapper {
  background: #E6E4D8;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.employees {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 1440px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 52px;
  gap: 34px;
  width: 1410px;
  background: #F8F8F6;
  border-width: 0px 1px;
  border-style: solid;
  border-color: #D5D4CE;
}

.dashboard-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 34px;
  width: 100%;
}

.dashboard-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}
</style>