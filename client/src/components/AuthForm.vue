<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <div v-if="!isLoginView" class="form-group">
        <h1 class="register-title">Зарегистрироваться</h1>
        <input v-model="form.name" type="text" required placeholder=" " />
        <label>Имя</label>
      </div>
      <div class="form-group">
        <input v-model="form.email" type="email" required placeholder=" " />
        <label>Email</label>
      </div>
      <div class="form-group">
        <input
          v-model="form.password"
          type="password"
          required
          placeholder=" "
        />
        <label>Пароль</label>
      </div>
      <div class="socials" v-if="socialProviders.length > 0">
        <p class="socials-title">Или войти через:</p>
        <ul class="socials-list">
          <li v-for="provider in socialProviders"
            :key="provider.id" class="socials-item"
            @click="handleSocialLogin(provider.id)"
            :title="`Войти через ${provider.name}`">
          >
            {{ provider.name.substring(0, 2) }}
          </li>
        </ul>
      </div>
      <div class="btn-container">
        <div class="form-group remember-me">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Запомнить меня</label>
        </div>
        <button type="submit" class="register-button">
          {{ isLoginView ? "Войти" : "Зарегистрироваться" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface Props {
  isLoginView?: boolean
}

const rememberMe = ref(false)

const props = withDefaults(defineProps<Props>(), { isLoginView: true });

interface Emits {
  (
    e: "submit",
    value: {
      email: string;
      password: string;
      name?: string;
      rememberMe?: boolean;
    }
  ): void
  (
    e: "register",
    value: { name: string; email: string; password: string }
  ): void
  (e: "social-login", provider: string): void
}

const emit = defineEmits<Emits>()

const form = ref({ name: "", email: "", password: "" })

const handleSubmit = () => {
  console.log("Отправка формы, rememberMe:", rememberMe.value)
  if (props.isLoginView) {
    emit("submit", {
      email: form.value.email,
      password: form.value.password,
      rememberMe: rememberMe.value,
    })
  } else {
    emit("register", {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    })
  }
}

interface SocialProvider {
  id: string;
  name: string;
  color: string;
}

const socialProviders = ref<SocialProvider[]>([
  { id: "google", name: "Google", color: "#4285f4" },
])

const handleSocialLogin = (providerId: string) => {
  emit("social-login", providerId);
  window.location.href = `/api/auth/${providerId}`
}

console.log(socialProviders)
</script>

<style>
.wrapper {
  width: 400px;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.register-title {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 700;
  text-transform: capitalize;
}
form {
  display: flex;
  flex-direction: column;
}
.form-group {
  position: relative;
  border-bottom: 2px solid #ccc;
  margin: 25px 0;
}
.form-group label {
  position: absolute;
  top: 20px;
  left: 0;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease;
  transform-origin: left center;
}
.form-group input {
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0;
  color: #fff;
  background: transparent;
}
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  font-size: 0.8rem;
  top: -25px;
  font-size: 18px;
  transform: scale(0.9);
  color: #aaa;
}
.wrapper a {
  color: #efefef;
  text-decoration: none;
}
.wrapper a:hover {
  text-decoration: underline;
}
button {
  background: #fff;
  color: #000;
  font-weight: 600;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 16px;
  border: 2px solid transparent;
  transition: 0.3s ease;
}
button:hover {
  color: #fff;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.15);
}
.socials-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
}
.socials-list {
  display: flex;
  justify-content: center; /* Центрируем кнопки */
  padding: 0;
  margin: 20px 0;
}

.socials-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(27, 17, 222, 0.5);
}

.socials-item:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Стиль для Google */

.socials-item[title*="Google"] {
  background-color: #4285f4;
  position: relative;
  overflow: hidden;
}

.socials-item[title*="Google"]::before {
  content: "G";
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: "Roboto", sans-serif;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    #ea4335 0deg 90deg,
    #fbbc05 90deg 180deg,
    #34a853 180deg 270deg,
    #4285f4 270deg 360deg
  );
}
.socials-item[title*="Google"]::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    #ea4335 0deg 90deg,
    #fbbc05 90deg 180deg,
    #34a853 180deg 270deg,
    #4285f4 270deg 360deg
  );
  opacity: 0.7;
  z-index: 1;
}
</style>
