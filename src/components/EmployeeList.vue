<template>
  <div class="employee-list">
<!--     Список сотрудников -->
    <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @openBitrix="$emit('openBitrix', employee.id)"
    />
<!--     Сообщение, если сотрудников нет -->
    <div v-if="employees.length === 0" class="empty-state">
      Сотрудники не найдены
    </div>
  </div>
</template>

<script setup>
import EmployeeCard from './EmployeeCard.vue'

// Пропсы: список сотрудников
defineProps({
  employees: { type: Array, required: true }
})

// Событие: открыть Битрикс24
defineEmits(['openBitrix'])
</script>

<style scoped>
.employee-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.empty-state {
  padding: 40px;
  text-align: center;
  background: #FFFFFF;
  border-radius: 10px;
  color: #666;
}
</style>