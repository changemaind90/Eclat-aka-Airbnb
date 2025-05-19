<template>
  <form @submit.prevent="handleSubmit" class="create-listing-form">
    <h3>Добавить новое объявление</h3>
    <div class="form-group">
      <label for="title">Название*</label>
      <input v-model="formData.title" type="text" id="title" required placeholder="Укажите название">
    </div>
    <div class="form-group">
      <label for="price">Цена (₽)*</label>
      <input v-model.number="formData.price" type="number" id="price" min="1000" required >
    </div>
    <div class="form-group"><label for="description">Описание</label>
      <textarea v-model="formData.description" id="description" rows="3"></textarea>
    </div>
    <div class="form-group"><label for="images">Фото</label>
      <input type="file" id="images" multiple @change="handleImageUpload">
    </div>
    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Отправка...' : 'Создать' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useListingsStore } from '@/stores/listings'

interface FormData {
  title: string;
  price: number;
  description: string;
  images: File[]; }

const emit = defineEmits<{ (e: 'submit', formData: FormData): void }>()

const listingsStore = useListingsStore()
const formData = ref<FormData>({
  title: '',
  price: 0,
  description: '',
  images: [], })
const isSubmitting = ref(false)
const error = ref('')

const handleImageUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) formData.value.images = Array.from(files) }

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    error.value = ''
    // Валидация
    if (!formData.value.title.trim() || formData.value.price <= 0) {
      throw new Error('Заполните обязательные поля (название и цена)')
    }
    // Создаем FormData для отправки файлов
    const form = new FormData()
    form.append('title', formData.value.title)
    form.append('price', String(formData.value.price))
    form.append('description', formData.value.description)
    formData.value.images.forEach(file => form.append('images', file))

    // Отправка данных
    await listingsStore.createNewListing(form);
    emit('submit', formData.value); // Уведомляем родителя об успехе
    // Сброс формы
    formData.value = { title: '', price: 0, description: '', images: [] };
  } catch (err) { error.value = err instanceof Error ? err.message : 'Ошибка создания';
  } finally {isSubmitting.value = false } }
</script>

<style scoped>
.create-listing-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background: #ccc;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>