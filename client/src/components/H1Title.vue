<template>
  <header class="title-header">
    <!-- Видео-фон -->
    <div class="video-background">
      <video
        ref="videoRef"
        :src="videoSrc"
        autoplay
        loop
        muted
        playsinline
      ></video>
    </div>

    <div class="content-overlay">
      <div class="title-container">
        <h1 class="title">
          <span class="title-line">Добро пожаловать!</span>
          <span class="title-line">Мы подберем лучший вариант!</span>
        </h1>
      
        <div class="filters-container">
          <SearchFilters @search="handleSearch" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchFilters from './SearchFilters.vue'

const videoSrc = '/videos/background.mp4'
const videoRef = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(e => {
      console.error('Video autoplay error:', e) })}})

const handleSearch = (filters: { query: string; type: string }) => {
  console.log('Search filters:', filters)
  // Здесь можно обработать фильтры или передать их выше
}
</script>

<style scoped>
.title-header {
  position: relative;
  height: 100vh; 
  min-height: 650px; 
  overflow: hidden;
}

/* - Видос на фоне -  */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.video-background video {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.content-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Дальше стили текста*/

.title-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', 'Arial', sans-serif;
  font-weight: 300;
  color: #fff;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
}

.title-line {
  display: block;
  font-size: clamp(2rem, 5vw, 3.5rem);
  background: linear-gradient(90deg, #ffffff, #f0e6d2);
  -webkit-background-clip: text;
  background-clip: text;
}

/*Стили фильтров/поиска */

filters-container {
  /* background-color: rgba(216, 201, 184, 1); */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin: 0 auto;
  max-width: 1200px;
  backdrop-filter: blur(4px); /* Эффект размытия */
}

</style>