<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section logo-section">
        <div class="app-logo">
          <a href="#">
            <img src="@/assets/logo.svg" alt="Логотип приложения" class="logo-img">
            <span class="logo-text">Éclat</span>
          </a></div>
        <p class="copyright">© 2025 Éclat.</p>
      </div>

      <div class="footer-section menu-section">
        <ul class="footer-menu">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О приложении</router-link></li>
          <li><router-link to="/maps">Карты</router-link></li>
        </ul></div></div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
.app-footer {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #3a3229, #5a4a42);
  color: #f5f0e6;
  padding: 40px 0 0 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.logo-section {
  align-items: flex-start;
}

.app-logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8f4e9;
}

.copyright {
  margin-top: auto;
  color: #a39382;
  font-size: 0.9rem;
}

.footer-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-menu li {
  margin-bottom: 15px;
}

.footer-menu a {
  color: #d8c9b8;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 1.1rem;
}

.footer-menu a:hover {
  color: #f8f4e9;
}

.contact-block {
  margin-bottom: 30px;
}

.contact-block h4 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #d8c9b8;
}

.contact-link {
  display: block;
  color: #f5f0e6;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1rem;
}

.contact-link:hover {
  color: #a39382;
}

.contact-icon {
  margin-right: 10px;
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .app-footer {
    height: auto;
    padding: 40px 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .logo-section {
    align-items: center;
    text-align: center;
  }
  
  .copyright {
    margin-top: 20px;
  }
  
  .section-title {
    text-align: center;
  }
  
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .contact-block {
    text-align: center;
  }
}

@media (max-width: 640px) {
  .app-footer {
    padding: 30px 15px;
  }
  
  .footer-menu {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>