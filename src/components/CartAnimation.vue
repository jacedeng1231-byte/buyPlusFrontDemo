<template>
  <div class="cart-animation-container">
    <div 
      v-for="anim in store.cartAnimations" 
      :key="anim.id" 
      class="flying-item"
      :style="{ 
        '--start-x': anim.x + 'px', 
        '--start-y': anim.y + 'px',
        '--end-x': targetX + 'px',
        '--end-y': targetY + 'px'
      }"
    >
      <img v-if="anim.image" :src="anim.image" class="particle-image" />
      <div v-else class="particle-dot"></div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CartAnimation',
  data() {
    return {
      store,
      targetX: 0,
      targetY: 0
    };
  },
  mounted() {
    this.updateTargetPosition();
    window.addEventListener('resize', this.updateTargetPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateTargetPosition);
  },
  methods: {
    updateTargetPosition() {
      const cartIcon = document.getElementById('global-cart-icon');
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        this.targetX = rect.left + rect.width / 2;
        this.targetY = rect.top + rect.height / 2;
      }
    }
  }
};
</script>

<style scoped>
.cart-animation-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.flying-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  z-index: 10000;
  animation: flyToCart 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards;
}

.particle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.particle-dot {
  width: 20px;
  height: 20px;
  background-color: var(--bs-primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--bs-primary);
}

@keyframes flyToCart {
  0% {
    transform: translate(var(--start-x), var(--start-y)) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(calc(var(--start-x) * 0.8 + var(--end-x) * 0.2), calc(var(--start-y) * 0.7 + var(--end-y) * 0.3 - 100px)) scale(1.2);
  }
  100% {
    transform: translate(var(--end-x), var(--end-y)) scale(0.2);
    opacity: 0;
  }
}
</style>
