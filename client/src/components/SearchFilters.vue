<template>
  <div class="search-filters">
    <input v-model="searchQuery" type="text"
      placeholder="Поиск по названию" @input="handleInput">
    <select v-model="selectedType">
      <option value="">Все типы</option>
      <option value="apartment">Квартира</option>
      <option value="house">Дом</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const searchQuery = ref('')
const selectedType = ref('')
const emit = defineEmits(['search'])
const handleInput = () => {
  emit('search', {
    query: searchQuery.value,
    type: selectedType.value
  })
}
</script>
<style scoped>
.search-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input, select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>