<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="!isLoginView" class="form-group">
      <label>Имя</label><input v-model="form.name" type="text" required />
    </div>
    <div class="form-group">
      <label class="btn-desc">Email</label>
      <input v-model="form.email" type="email" required />
    </div>
    <div class="form-group">
      <label class="btn-desc">Пароль</label>
      <input v-model="form.password" type="password" required />
    </div>

    <div class="socials" v-if="socialProviders.length > 0">
      <p class="socials-title">Или войти через:</p>
      <ul class="socials-list">
        <li
          v-for="provider in socialProviders"
          :key="provider.id"
          class="socials-item"
          @click="handleSocialLogin(provider.id)"
          :title="`Войти через ${provider.name}`"
          :style="{ backgroundColor: provider.color }" >
          {{ provider.name.substring(0, 2) }}
        </li>
      </ul>
    </div>

    <div class="btn-container">
      <button type="submit" class="register-button">
        {{ isLoginView ? "Войти" : "Зарегистрироваться" }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  isLoginView?: boolean;
}
const props = withDefaults(defineProps<Props>(), { isLoginView: true });
interface Emits {
  (
    e: "submit",
    value: { email: string; password: string; name?: string }
  ): void;
  (e: "social-login", provider: string): void;
  (
    e: "register",
    value: { name: string; email: string; password: string }
  ): void;
}
const emit = defineEmits<Emits>();
const form = ref({ name: "", email: "", password: "" });
const handleSubmit = () => {
  if (props.isLoginView) {
    emit("submit", {
      email: form.value.email,
      password: form.value.password,
    });
  } else {
    emit("register", {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });
  }
};
interface SocialProvider {
  id: string;
  name: string;
  color: string;
}
const socialProviders = ref<SocialProvider[]>([
  { id: "google", name: "Google", color: "#4285f4" },
]);
const handleSocialLogin = (providerId: string) => {
  emit("social-login", providerId);
  // window.location.href = `/api/auth/${providerId}`
};
console.log(socialProviders);
</script>

<style>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Сама форма */
.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #d2b48c; /* светло-коричневая рамка */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Группы полей формы */
.form-group {
  margin-bottom: 20px;
}

.btn-desc {
  font-family: Arial, Helvetica, sans-serif;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #000000;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #d2b48c;
}

/* Кнопка входа */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #000000;
  border: 1px solid #d2b48c; /* светло-коричневая рамка */
  border-radius: 15px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.login-button:hover {
  background-color: #f8f8f8;
}

.login-button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* Социальные кнопки */
.socials {
  margin-top: 20px;
  margin-bottom: 20px;
}

.socials-title {
  text-align: center;
  margin-bottom: 15px;
  color: #000000;
  font-weight: 500;
}

.socials-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 0;
  list-style: none;
}

.socials-item {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  color: white;
  font-weight: bold;
}

.socials-item:hover {
  transform: translateY(-2px);
}

.socials-item:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.socials-item svg {
  width: 24px;
  height: 24px;
}

.btn-container {
  display: flex;
  align-items: center;
  margin-left: 13px;
}
.register-button {
  width: 100%;
  max-width: 200px;
  height: 55px;
  border: 2px solid #ffffff;
  border-radius: 16px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
}
</style>
