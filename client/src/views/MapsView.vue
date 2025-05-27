<template>
  <div class="map-section">
    <h1>Карта</h1>
    <div class="map-info">
      <p>Если из РФ - Яндекс-карта</p>
      <p>Если не из РФ - Гугл-карта</p>
    </div>

    <div class="map-container">
      <div v-if="showYandexMap" id="yandex-map" ref="yandexMap"></div>
      <iframe 
        v-else
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373789135737!2d37.618423!3d55.751633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d506f52711!2z0JrRgNCw0YHQvdCw0Y8g0J_Qu9C-0YnQsNC00Yw!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sen!2sru"
        class="google-map"
        allowfullscreen loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Состояние для определения типа карты
const showYandexMap = ref(false);
const yandexMap = ref<HTMLElement | null>(null);

// Проверка геолокации и страны
const checkGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Здесь можно добавить API для определения страны по координатам
        // Для примера просто показываем Яндекс.Карты
        showYandexMap.value = true;
        initYandexMap(position.coords);
      },
      () => {
        // Если пользователь отказался или произошла ошибка
        showYandexMap.value = false;
      }
    );
  } else {
    // Браузер не поддерживает геолокацию
    showYandexMap.value = false;
  }
};

// Инициализация Яндекс.Карт
const initYandexMap = (coords: GeolocationCoordinates) => {
  // Динамическая загрузка API Яндекс.Карт
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  script.onload = () => {
    // @ts-ignore
    ymaps.ready(() => {
      // @ts-ignore
      new ymaps.Map(yandexMap.value, {
        center: [coords.latitude, coords.longitude],
        zoom: 15,
        controls: ['zoomControl']
      });
    });
  };
  document.head.appendChild(script);
};

onMounted(() => {
  checkGeoLocation();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Clicker+Script&family=Marck+Script&display=swap');

.map-section {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 64px;
  margin-bottom: 20px;
}

.map-info {
  font-family: Arial, Helvetica, sans-serif;
  font-size: inherit;
  font-weight: 500;
  color: inherit;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.map-container {
  width: 70%;
  height: 400px;
  border: 2px solid #5a4a42;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#yandex-map,
.google-map {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .contact-info {
    font-size: 1.4rem;
  }
  
  .map-container {
    height: 300px;
  }
}
</style>