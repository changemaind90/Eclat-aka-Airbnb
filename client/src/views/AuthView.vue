<template>
  <div class="auth-page">
    <div class="parallax-bg"></div>
    <div v-if="authError" class="error-message">
      {{ authError }}
      <button
        v-if="isLoginView && authError.includes('не найден')"
        @click="switchToRegister"
        class="switch-button"
      >
        Зарегистрироваться
      </button>
    </div>
    <AuthForm
      :is-login-view="isLoginView"
      @submit="handleLogin"
      @register="handleRegister"
      @social-login="handleSocialLogin"
    />
    <div class="auth-switch">
      <button
        v-if="isLoginView"
        @click="switchToRegister"
        class="auth-switch-button"
      >
        Нет аккаунта? Зарегистрироваться
      </button>
      <button
        v-else
        @click="
          isLoginView = true;
          authError = null;
        "
        class="auth-switch-button"
      >
        Уже есть аккаунт? Войти
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AuthForm from "@/components/AuthForm.vue";

const router = useRouter();
const authStore = useAuthStore();
const isLoginView = ref(true);
const authError = ref<string | null>(null);

const handleLogin = async (credentials: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) => {
  try {
    authError.value = null;
    await authStore.login(credentials);
    router.push("/profile");
  } catch (error: any) {
    if (error.response?.status === 401) {
      authError.value = "Пользователь не найден. Зарегистрироваться?";
    } else {
      authError.value = error.message || "Ошибка авторизации";
    }
  }
};

const handleRegister = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    authError.value = null;
    const result = await authStore.register(credentials);
    console.log('Результат регистрации:', result)
    router.push("/profile");
  } catch (error: any) {
    authError.value = error.message || "Registration failed. Please try again.";
  }
};

const switchToRegister = () => {
  isLoginView.value = false;
  authError.value = null;
};

const handleSocialLogin = (provider: string) => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
};
</script>

<style scoped>
.auth-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/images/login-hero-bg.jpg"), #000;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  z-index: -1;
  transform: translateZ(0);
  will-change: transform;
}

.switch-button {
  background: none;
  border: none;
  color: #4285f4;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 10px;
}

.auth-switch {
  margin-top: 20px;
  text-align: center;
}

.auth-switch-button {
  background: none;
  border: none;
  color: #4285f4;
  cursor: pointer;
  font-size: 14px;
}

.error-message {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 99, 71, 0.2);
  border: 2px solid rgba(255, 99, 71, 0.4);
  border-radius: 8px;
  color: #ff4444;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  text-align: center;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-5px);
  }

  40%,
  80% {
    transform: translateX(5px);
  }
}
</style>
