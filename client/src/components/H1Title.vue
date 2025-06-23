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
  	max-width: 100vw;
	width: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-height: 400px;
  height: 45vh;
  overflow: hidden;
  margin-bottom: 40px;
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
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(14px);
}

.title {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Montserrat', 'Arial', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #fff;
  margin: 0 0 0 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
}

.title-line {
  font-size: clamp(2rem, 5vw, 3.5rem);
  -webkit-background-clip: text;
  background-clip: text;
}

/*Стили фильтров/поиска */

.filters-container {
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin: 0 auto;
}

</style>