<template>
  <div class="auth-page">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <AuthForm
      @submit="handleLogin"
      @register="handleRegister"
      @social-login="handleSocialLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AuthForm from '@/components/AuthForm.vue';

const router = useRouter();
const authStore = useAuthStore();
const errorMessage = ref<string | null>(null);

const handleLogin = async (credentials: { 
  email: string; 
  password: string; 
  rememberMe?: boolean 
}) => {
  try {
    errorMessage.value = null;
    await authStore.login(credentials);
    router.push('/profile');
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed. Please try again.';
  }
};

const handleRegister = async (credentials: { 
  name: string; 
  email: string; 
  password: string 
}) => {
  try {
    errorMessage.value = null;
    await authStore.register(credentials);
    router.push('/profile');
  } catch (error: any) {
    errorMessage.value = error.message || 'Registration failed. Please try again.';
  }
};

const handleSocialLogin = (provider: string) => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
};
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f0e6, #e8d9c5);
}

.error-message {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 99, 71, 0.2);
  border: 2px solid rgba(255, 99, 71, 0.4);
  border-radius: 8px;
  color: #ff6347;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  text-align: center;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
</style>


