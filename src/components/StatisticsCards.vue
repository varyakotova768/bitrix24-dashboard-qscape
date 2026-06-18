<template>
  <div class="statistics-cards">
<!--     Карточка: Сотрудников -->
    <div class="stat-card">
      <div class="stat-card-row">
        <span class="stat-label">Сотрудников</span>
      </div>
      <div class="stat-card-row stat-value-row">
        <span class="stat-number">{{ stats.totalEmployees }}</span>
      </div>
      <div class="stat-card-row stat-unit-row">
        <span class="stat-unit">в команде</span>
      </div>
    </div>

<!--     Карточка: Перегружены -->
    <div class="stat-card stat-card-red">
      <div class="stat-card-row">
        <span class="stat-label">Перегружены</span>
      </div>
      <div class="stat-card-row stat-value-row">
        <span class="stat-number">{{ stats.overloadCount }}</span>
      </div>
      <div class="stat-card-row stat-unit-row">
        <span class="stat-unit">требуют внимания</span>
      </div>
    </div>

<!--     Карточка: Свободны -->
    <div class="stat-card stat-card-green">
      <div class="stat-card-row">
        <span class="stat-label">Свободны</span>
      </div>
      <div class="stat-card-row stat-value-row">
        <span class="stat-number">{{ stats.freeCount }}</span>
      </div>
      <div class="stat-card-row stat-unit-row">
        <span class="stat-unit">требуют внимания</span>
      </div>
    </div>

<!--     Карточка: Задач всего -->
    <div class="stat-card">
      <div class="stat-card-row">
        <span class="stat-label">Задач всего</span>
      </div>
      <div class="stat-card-row stat-value-row">
        <span class="stat-number">{{ stats.totalTasks }}</span>
      </div>
      <div class="stat-card-row stat-unit-row">
        <span class="stat-unit">активных</span>
      </div>
    </div>

<!--     Карточка: Задач закрыто -->
    <div class="stat-card">
      <div class="stat-card-row">
        <span class="stat-label">Задач закрыто</span>
      </div>
      <div class="stat-card-row stat-value-row">
        <span class="stat-number">{{ stats.completedPercent }}%</span>
      </div>
      <div class="stat-card-row stat-unit-row">
        <span class="stat-unit">на сегодня</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Пропсы: объект со статистикой
defineProps({
  stats: { type: Object, required: true }
})
</script>

<style scoped>
.statistics-cards {
  display: flex;
  gap: 2.1%;
  width: 100%;
}

.stat-card {
  display: flex;
  flex-direction: column;
  padding: 14px 1% 16px;
  gap: 6px;
  background: #F5F4ED;
  border-radius: 10px;
  flex: 1;
  min-width: 0;
}

.stat-card-red { background: #FAECE7; }
.stat-card-green { background: #EAF3DE; }

.stat-card-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.stat-value-row,
.stat-unit-row {
  justify-content: flex-start;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  margin-top: 2px;
  color: #000000;
}

.stat-card-red .stat-number { color: #E24B4A; }
.stat-card-green .stat-number { color: #416517; }

.stat-unit {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}
</style>