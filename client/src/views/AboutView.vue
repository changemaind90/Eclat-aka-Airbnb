<template>
  <div class="page-wrapper">
    <div class="about">
      <h1>О приложении</h1>
      <p>Это приложение для аренды квартир</p>
      <p>Дизайн/верстка <a href="">changemaind90</a></p>
      <p>Бэкенд <a href="">AlanKerry1</a></p>
      <hr class="hr">
      <div class="tech-visualization">
        <div class="images-container">
          <!-- Frontend Card -->
          <div class="image-card frontend-card" @mouseover="handleFrontendHover(true)"
            @mouseleave="handleFrontendHover(false)">
            <div class="card-face front-face">
              <img src="@/assets/frontend-icon.png" alt="Frontend" class="card-icon">
            </div>
            <div class="card-face back-face">
              <h3 class="frontend-title">Frontend</h3>
              <div class="tech-list">
                <div class="tech-item" v-for="(item, index) in frontendSteps" :key="index"
                  :style="{ transitionDelay: `${index * 0.1}s` }">
                  <span class="tech-icon">{{ item.icon }}</span>
                  <span class="tech-name">{{ item.tech }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Backend Card -->
          <div class="image-card backend-card" @mouseover="handleBackendHover(true)"
            @mouseleave="handleBackendHover(false)">
            <div class="card-face front-face">
              <img src="@/assets/backend-icon.png" alt="Backend" class="card-icon">
            </div>
            <div class="card-face back-face">
              <h3 class="backend-title">Backend</h3>
              <div class="tech-list">
                <div class="tech-item" v-for="(item, index) in backendCode" :key="index"
                  :style="{ transitionDelay: `${index * 0.1}s` }">
                  <span class="tech-icon">{{ item.icon }}</span>
                  <span class="tech-name">{{ item.tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
//смена цвета фона страницы
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
@import url('https://fonts.googleapis.com/css2?family=Jacquard+24&family=Neucha&display=swap');
.page-wrapper {
  min-height: 100vh;
  transition: background-color 0.5s ease;
}
.about {
  min-height: 100vh;
  padding: 40px;
  transition: background-color 0.5s ease;
}
.tech-visualization {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
.images-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  perspective: 1000px;
}
.image-card {
  border-radius: 20px;
  height: 500px;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.image-card:hover {
  transform: rotateY(180deg);
}
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.front-face {
  background-size: cover;
  background-position: center;
}
.back-face {
  transform: rotateY(180deg);
}
.frontend-card .front-face {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.frontend-card .back-face {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.backend-card .front-face {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.backend-card .back-face {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.card-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 22px;
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
  font-size: 2.5em;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  margin-left: 20px;
}
.backend-title {
  font-family: 'Neucha', cursive;
  font-size: 2.5em;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  margin-left: 20px;
}
</style>