<template>
  <div class="create-listing-form">
    <h2>{{ isEditing ? 'Редактировать объявление' : 'Создать новое объявление' }}</h2>
    <form @submit.prevent="handleSubmit">

      <div v-if="authStore.user">
      User ID: {{ authStore.user.id }}
      Auth status: {{ authStore.isAuthenticated }}
      </div>
      <div v-else>
        Пользователь не авторизован
      </div>

      <!-- Основные поля -->
      <div class="form-group">
        <input v-model="formData.title" required type="text" maxlength="100" placeholder="Название: ">
      </div>

      <div class="form-group">
        <textarea
			placeholder="Описание (до 2000 символов):"
          v-model="formData.description" 
          required 
          maxlength="2000"
          @input="checkDescriptionLength"
        ></textarea>
        <div class="char-counter">{{ formData.description.length }}/2000</div>
      </div>

      <div class="form-group">
        <input 
          v-model="formData.address" 
          required 
          type="text"
          placeholder="Адресс, Например: Россия, Москва, ул. Ленина, 1/4"
        >
      </div>

      <div class="form-group">
		  <div> Цена за ночь: </div>
        <input
          v-model.number="formData.pricePerNight" 
          required 
          type="number" 
          min="0" 
          max="10000000"
          step="1000"
        >
      </div>

      <div class="form-group">
		  <div> Введите число гостей:</div>
        <input 
          v-model.number="formData.numberOfGuests" 
          required 
          type="number" 
          min="1" 
          max="10"
        >
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Отправка...' : (isEditing ? 'Обновить' : 'Создать') }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const listingsStore = useListingsStore()
const loading = ref(false)
const error = ref<string | null>(null)
const props = defineProps({
  listingToEdit: {
    type: Object,
    default: null
  }
})

const isEditing = computed(() => !!props.listingToEdit)

type FormData = {
  title: string
  description: string
  address: string
  pricePerNight: number
  numberOfGuests: number
  userId?: number
}

const formData = ref<FormData>({
  title: '',
  description: '',
  address: '',
  pricePerNight: 0,
  numberOfGuests: 1
})

// Инициализация формы при редактировании
onMounted(() => {
  if (props.listingToEdit) {
    formData.value = {
      title: props.listingToEdit.title,
      description: props.listingToEdit.description,
      address: props.listingToEdit.address,
      pricePerNight: props.listingToEdit.pricePerNight,
      numberOfGuests: props.listingToEdit.numberOfGuests
    }
  }
})

const checkDescriptionLength = () => {
  if (formData.value.description.length > 2000) {
    formData.value.description = formData.value.description.slice(0, 2000)
  }
}

const validateFields = (): boolean => {
  // Проверка обязательных полей
  if (!formData.value.title || 
      !formData.value.description || 
      !formData.value.address || 
      formData.value.pricePerNight <= 0 || 
      formData.value.numberOfGuests <= 0) {
    error.value = 'Заполните все обязательные поля'
    return false
  }

  if (formData.value.pricePerNight > 10000000) {
    error.value = 'Цена за ночь не может превышать 10,000,000 ₽'
    return false
  }

  if (formData.value.numberOfGuests < 1 || formData.value.numberOfGuests > 10) {
    error.value = 'Количество гостей должно быть от 1 до 10'
    return false
  }

  if (formData.value.description.length > 2000) {
    error.value = 'Описание не может превышать 2000 символов'
    return false
  }

  return true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    if (!validateFields() || !authStore.user?.id) {
      error.value = 'Заполните все поля и авторизуйтесь'
      return
    }
    
    const payload = {
      title: formData.value.title.trim(),
      description: formData.value.description.trim(),
      address: formData.value.address.trim(),
      pricePerNight: Number(formData.value.pricePerNight),
      numberOfGuests: Number(formData.value.numberOfGuests)
    }

    if (isEditing.value && props.listingToEdit?.id) {
      await listingsStore.updateListing(props.listingToEdit.id.toString(), payload)
    } else {
      await listingsStore.createNewListing(payload)
    }

    // Сброс формы после успешного создания
    if (!isEditing.value) {
      formData.value = {
        title: '',
        description: '',
        address: '',
        pricePerNight: 0,
        numberOfGuests: 1,
      }
    }

  } catch (err) {
    error.value = isEditing.value 
      ? 'Ошибка при обновлении объявления' 
      : 'Ошибка при создании объявления'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Inter:400,600&display=swap');

.create-listing-form {
  font-family: 'Inter', Arial, sans-serif;
  background: #23272f;
  color: #fff;
  max-width: 700px;
  margin: 2vw auto;
  padding: 2vw 6vw;
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.25);
  width: 90vw;
  min-width: 320px;
}

.create-listing-form h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
}

.form-group, .form-row {
  margin-bottom: 2rem;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 0.7rem;
  color: #e3e7ef;
  font-weight: 500;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
}

.form-row {
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1 1 180px;
  margin-bottom: 0;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 1.1rem 1rem;
  background: #2d313a;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  outline: none;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}

input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus {
  background: #353a45;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

.char-counter {
  font-size: 0.95rem;
  color: #c8c8c8;
  text-align: right;
  margin-top: 0.3rem;
}

button[type="submit"] {
  width: 100%;
  padding: 1.2rem 0;
  background: linear-gradient(90deg, #7db4ff 0%, #3c6fd8 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 16px rgba(60,111,216,0.13);
}

button[type="submit"]:hover:not(:disabled) {
  background: linear-gradient(90deg, #3c6fd8 0%, #7db4ff 100%);
  transform: translateY(-2px) scale(1.02);
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ff4d4f;
  background: #2d1f1f;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-top: 1rem;
  font-size: 1.05rem;
  text-align: center;
}

@media (max-width: 600px) {
  .create-listing-form {
    padding: 5vw 3vw;
    min-width: 0;
  }
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
}

.char-counter {
  font-size: 0.8rem;
  color: #666;
  text-align: right;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>

