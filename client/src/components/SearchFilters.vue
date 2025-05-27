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
  justify-content: center;
  width: 100%;
  max-width: 800px;
  gap: 10px;
  margin-bottom: 20px;
}
input, select {
  font-family: Arial, Helvetica, sans-serif;
  padding: 8px 12px;
  border: 1px solid #fff;
  border-radius: 8px;
  color: #fff;
  background: transparent;
  &::placeholder{
    color: #fff;
  }
  & option {
    background: #f5f5dc;
    color: #333; 
  }
  &:focus {
     outline: none;
    border-color: white;
    box-shadow: 0 0 0 1px white;
  }
}
</style>