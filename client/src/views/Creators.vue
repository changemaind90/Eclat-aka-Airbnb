<template>
  <div class="tech-visualization">
    <div class="images-container">
      <div class="image-card frontend-card" @mouseover="handleFrontendHover(true)"
           @mouseleave="handleFrontendHover(false)">
        <div class="card-inner">
          <div class="card-face front-face">
            <img src="@/assets/frontend-icon.png" alt="Frontend" class="card-icon">
            <h2>Frontend</h2>
          </div>
          <div class="card-face back-face">
            <h3 class="frontend-title">Frontend</h3>
            <div class="tech-list">
              <div class="tech-item" v-for="(item, index) in frontendSteps" :key="index"
                   :style="{ transitionDelay: `${index * 0.1}s` }">
                <span class="tech-icon">{{ item.icon }}</span>
                <span class="tech-name">{{ item.tech }}</span>
              </div></div></div></div></div>
      
      <div class="image-card backend-card" @mouseover="handleBackendHover(true)"
           @mouseleave="handleBackendHover(false)">
        <div class="card-inner">
          <div class="card-face front-face">
            <img src="@/assets/backend-icon.png" alt="Backend" class="card-icon">
            <h2>Backend</h2>
          </div>
          <div class="card-face back-face">
            <h3 class="backend-title">Backend</h3>
            <div class="tech-list">
              <div class="tech-item" v-for="(item, index) in backendCode" :key="index"
                   :style="{ transitionDelay: `${index * 0.1}s` }">
                <span class="tech-icon">{{ item.icon }}</span>
                <span class="tech-name">{{ item.tech }}</span>
              </div></div></div></div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isFrontendHover = ref<boolean>(false)
const isBackendHover = ref<boolean>(false)
const handleFrontendHover = (state: boolean): void => {
  isFrontendHover.value = state
  if (!state) isBackendHover.value = false }
const handleBackendHover = (state: boolean): void => {
  isBackendHover.value = state
  if (!state) isFrontendHover.value = false }
const frontendSteps = ref([
  { tech: 'HTML5, CSS3, JS', icon: '🛠️' },
  { tech: 'TypeScript', icon: '🧰' },
  { tech: 'Vue 3 Composition API', icon: '⚡' },
  { tech: 'Pinia, Vue, Router', icon: '📦' },
  { tech: 'Vite, ESLint', icon: '⚙️' }
])
const backendCode = ref([
  { tech: 'TypeScript', icon: '🧰' },
  { tech: 'Nest.js', icon: '🟢' },
  { tech: 'PostgreSQL, Prisma', icon: '🗄️' },
  { tech: 'Passport.js', icon: '🐳' }
])
</script>

<style scoped>
.tech-visualization {
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
  min-height: 100vh;
  max-width: 100%;
  max-height: 100%;
  height: 50vh;
  margin: 0 auto;
  padding: 40px 20px;
  background: #181818;
}

.images-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  perspective: 1000px;
}

.image-card {
  width: 300px;
  height: 400px;
  perspective: 1000px;
  position: relative;
}

.image-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 24px;
  background: linear-gradient(90deg, 
    #ff0000, #ff7300, #fffb00, #48ff00, 
    #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, 
               linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, 
        linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  background-size: 400% 400%;
  animation: gradientBorder 3s linear infinite;
}

@keyframes gradientBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.image-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
}

.front-face {
  color: white;
}

.back-face {
  color: white;
  transform: rotateY(180deg);
}

.card-icon {
  width: 300px;
  height: 300px;/* 
  margin-bottom: 20px; */
  object-fit: contain;
}

.frontend-title, .backend-title {
  margin: 20px 0 10px;
  font-size: 24px;
  align-self: flex-start;
}

.tech-list {
  width: 100%;
  padding-left: 20px;
  margin-top: 30px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}

.image-card:hover .tech-item {
  opacity: 1;
  transform: translateX(0);
}

.tech-icon {
  font-size: 1.5em;
}

.tech-name {
  color: white;
  font-size: 1.1em;
}

.frontend-title {
  font-family: 'Jacquard 24', sans-serif;
  font-weight: bold;
}

.backend-title {
  font-family: 'Neucha', cursive;
}

@media (max-width: 768px) {
  .images-container {
    grid-template-columns: 1fr;
  }
}
</style>