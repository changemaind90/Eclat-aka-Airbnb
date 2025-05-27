<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import NavBar from '@/components/layout/NavBar.vue'
import NotificationContainer from '@/components/ui/NotificationContainer.vue'
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.main-content {
  flex: 1;
  padding-bottom: 200px;
}
</style>