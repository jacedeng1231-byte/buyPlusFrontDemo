<template>
  <section class="container-fluid p-3 p-md-4 vh-100 d-flex flex-column overflow-hidden" ref="lulu" style="background-color: rgba(102, 102, 102, 0.05);">
    
    <!-- 全域頂部導覽列 (Top Header) -->
    <header class="d-flex align-items-center justify-content-between mb-3 flex-shrink-0 px-1 px-md-3">
      <!-- 左：手機版漢堡選單 (只在小螢幕顯示) / 桌面版小助手 -->
      <button 
        class="btn bg-white borderSet shadow-sm d-md-none rounded-circle d-flex align-items-center justify-content-center" 
        style="width: 45px; height: 45px;" 
        type="button" 
        @click="toggleMobileMenu"
      >
        <i class="bi bi-list fs-4 text-dark"></i>
      </button>
      
      <!-- 桌面版：小助手整合進 Header (取代原本的 Spacer) -->
      <div class="d-none d-md-block" style="width: 60px;">
        <AssistantAgent inHeader />
      </div>

      <!-- 中：中央 Logo -->
      <router-link to="/" class="text-decoration-none text-dark fw-bolder fs-3" style="letter-spacing: 1px;">
        Jace<span class="text-primary">Store</span>
      </router-link>

      <!-- 右：購物車入口  -->
      <router-link to="/checkout" @click="hideMobileMenuOnlyIfOpen" class="btn bg-white borderSet shadow-sm position-relative rounded-circle d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;" id="global-cart-icon">
        <i class="bi bi-cart3 fs-5 text-dark" :class="{ 'animate-pulse': store.cartAnimations.length > 0 }"></i>
        <span v-if="store.cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white mt-1 ms-n1 cart-badge-update">
          {{ store.cartCount }}
          <span class="visually-hidden">購物車商品數量</span>
        </span>
      </router-link>
    </header>

    <div class="row text-center flex-grow-1 overflow-hidden g-3">
      <!-- 左側桌面版選單 -->
      <div 
        class="d-none d-md-block h-100 transition-all px-0"
        :class="store.isSidebarCollapsed ? 'col-md-1' : 'col-md-3'"
      >
        <div class="card h-100 border-0 rounded-4 overflow-hidden shadow-sm">
          <Menubar />
        </div>
      </div>

      <!-- 右側主內容區 -->
      <div 
        class="h-100 transition-all"
        :class="store.isSidebarCollapsed ? 'col-12 col-md-11' : 'col-12 col-md-9'"
      >
        <div
          class="card h-100 rounded-4 p-3 p-md-4 bg-body border-0 shadow-sm overflow-hidden"
        >
          <router-view />
        </div>
      </div>
    </div>
    
    <!-- 全域購物車動畫元件 -->
    <CartAnimation />

    <!-- 全域小助手元件 (手機版浮動) -->
    <AssistantAgent class="d-md-none" />

    <!-- 手機版隱藏菜單 Offcanvas -->
    <div class="offcanvas offcanvas-start border-0 rounded-end-4 shadow-lg" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel" style="width: 85vw; max-width: 400px;">
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title fw-bold text-dark" id="mobileMenuLabel">
          BUY<span class="text-primary">PLUS</span>
        </h5>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-3 overflow-hidden d-flex flex-column">
        <Menubar @close-menu="hideMobileMenu" />
      </div>
    </div>

  </section>
</template>

<script>
import { Offcanvas } from 'bootstrap';
import Menubar from './components/Navbar.vue';
import CartAnimation from './components/CartAnimation.vue';
import AssistantAgent from './components/AssistantAgent.vue';
import { store } from './store.js';

export default {
  components: {
    Menubar,
    CartAnimation,
    AssistantAgent
  },
  data() {
    return {
      store,
      mobileMenu: null
    };
  },
  mounted() {
    const el = document.getElementById('mobileMenu');
    if (el) {
      this.mobileMenu = new Offcanvas(el);
    }
  },
  watch: {
    'store.isMobileMenuOpen'(newVal) {
      if (newVal && this.mobileMenu) {
        this.mobileMenu.show();
      }
    }
  },
  methods: {
    toggleMobileMenu() {
      if (this.mobileMenu) {
        this.mobileMenu.toggle();
      }
    },
    hideMobileMenu() {
      if (this.mobileMenu) {
        this.mobileMenu.hide();
      }
    },
    hideMobileMenuOnlyIfOpen() {
      this.hideMobileMenu();
    }
  }
}
</script>

<style>
.animate-pulse {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

.cart-badge-update {
  animation: badgePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes badgePop {
  0% { transform: translate(50%, -50%) scale(0.5); opacity: 0; }
  100% { transform: translate(50%, -50%) scale(1); opacity: 1; }
}

.transition-all {
  transition: all 0.3s ease;
}
</style>