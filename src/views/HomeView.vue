<template>
  <!-- 外層容器：確保高度控制在視窗內，無 Y 軸 -->
  <div class="vh-100 d-flex flex-column gap-3 overflow-hidden text-start">
    <!-- 0. 跑馬燈公告列 -->
    <div
      class="flex-shrink-0 bg-primary text-white rounded-pill px-3 py-1 d-flex align-items-center shadow-sm mx-auto w-100"
      style="font-size: 0.85rem"
    >
      <i class="bi bi-megaphone-fill me-2 text-warning"></i>
      <div
        class="overflow-hidden w-100 position-relative"
        style="height: 1.25rem"
      >
        <div
          class="marquee-text position-absolute d-flex align-items-center h-100 w-100 fw-bold"
          style="white-space: nowrap"
        >
          <span class="me-5"
            >🎉 慶祝新版上線，結帳輸入【BUYPLUS2026】即享全館 9 折優惠！</span
          >
          <span
            >⚠️ 提醒：本週五適逢連假停止出貨，有急用的客人請提早下單喔。</span
          >
        </div>
      </div>
    </div>

    <!-- 1. 上半部：Swiper 廣告輪播 -->
    <div
      class="swiper-wrapper-box flex-shrink-0 mx-auto position-relative rounded-4 overflow-hidden shadow-sm"
    >
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :effect="'fade'"
        class="h-100 w-100"
      >
        <swiper-slide>
          <div
            class="h-100 w-100 d-flex flex-column justify-content-center px-4 px-md-5 slide-bg"
            style="
              background-image: linear-gradient(
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0.3)
                ),
                url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop');
            "
          >
            <h2 class="text-white fw-bolder text-shadow slide-title">
              探索質感生活
            </h2>
            <p class="text-white fs-5 mt-2 text-shadow slide-subtitle">
              簡約設計，豐富日常。
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="h-100 w-100 d-flex flex-column justify-content-center px-4 px-md-5 slide-bg"
            style="
              background-image: linear-gradient(
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0.3)
                ),
                url('https://images.unsplash.com/photo-1434389678369-1225586617fb?q=80&w=2070&auto=format&fit=crop');
            "
          >
            <h2 class="text-white fw-bolder text-shadow slide-title">
              春季限時優惠
            </h2>
            <p class="text-white fs-5 mt-2 text-shadow slide-subtitle">
              全面 8 折起，打造全新自我！
            </p>
          </div>
        </swiper-slide>
      </swiper>

      <!-- 促銷標籤 (期間限定 / 免運)放在 Swiper 右下角 -->
      <div
        class="position-absolute bottom-0 end-0 m-2 m-md-3 z-3 floating-badge rounded-circle bg-danger text-white d-flex flex-column align-items-center justify-content-center shadow"
        style="width: 70px; height: 70px; border: 3px solid white"
      >
        <span class="fw-bold lh-1 mb-1" style="font-size: 0.7rem"
          >期間限定</span
        >
        <span class="fs-6 fw-bolder lh-1">免運</span>
      </div>
    </div>

    <div
      class="flex-shrink-0 mx-auto w-100 px-1 py-1"
      style="max-width: 1000px"
    >
      <div class="row row-cols-4 g-2 text-center">
        <div class="col">
          <router-link
            :to="{ path: '/products', query: { category: '新品上市' } }"
            class="text-decoration-none text-dark d-flex flex-column align-items-center quick-link-block"
          >
            <div
              class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-1 icon-box border border-2 borderSet-light"
            >
              <i class="bi bi-stars fs-4 text-warning"></i>
            </div>
            <span class="small fw-bolder text-secondary">新品上市</span>
          </router-link>
        </div>
        <div class="col">
          <router-link
            :to="{ path: '/products', query: { category: '熱銷排行' } }"
            class="text-decoration-none text-dark d-flex flex-column align-items-center quick-link-block"
          >
            <div
              class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-1 icon-box border border-2 borderSet-light"
            >
              <i class="bi bi-fire fs-4 text-danger"></i>
            </div>
            <span class="small fw-bolder text-secondary">熱銷排行</span>
          </router-link>
        </div>
        <div class="col">
          <router-link
            :to="{ path: '/products', query: { category: '全部商品' } }"
            class="text-decoration-none text-dark d-flex flex-column align-items-center quick-link-block"
          >
            <div
              class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-1 icon-box border border-2 borderSet-light"
            >
              <i
                class="bi bi-ticket-perforated fs-4"
                style="color: var(--bs-primary)"
              ></i>
            </div>
            <span class="small fw-bolder text-secondary">領折價券</span>
          </router-link>
        </div>
        <div class="col">
          <router-link
            :to="{ path: '/products', query: { category: '全部商品' } }"
            class="text-decoration-none text-dark d-flex flex-column align-items-center quick-link-block"
          >
            <div
              class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-1 icon-box border border-2 borderSet-light"
            >
              <i class="bi bi-truck fs-4 text-info"></i>
            </div>
            <span class="small fw-bolder text-secondary">免運專區</span>
          </router-link>
        </div>
      </div>
    </div>



    <!-- 1.6 & 2. 下半部：並列佈局 (Desktop) -->
    <div class="flex-grow-1 d-flex flex-column flex-md-row gap-md-4 mx-0 overflow-visible mt-1 pb-1">
      <!-- 左側/上方：熱銷精選 -->
      <div class="col-12 col-md-4 col-xl-3 d-flex flex-column h-md-100 mb-2 mb-md-0" :style="isMobile ? 'height: auto;' : ''">
        <div class="d-flex flex-md-column justify-content-md-between gap-2 overflow-auto overflow-x-hidden pb-2 scroll-hide h-md-100 shadow-none border-0">
          <div v-for="(p, index) in hotPicks.slice(0, 3)" :key="p.id" class="flex-shrink-0" :style="isMobile ? 'width: 110px;' : 'width: 100%;'">
            <div class="card border-0 shadow-sm rounded-4 overflow-visible bg-white border borderSet-light h-auto position-relative">
              <!-- 排名獎牌 (浮誇發光版) -->
              <div class="position-absolute bottom-0 end-0 z-3">
                <div class="medal-badge d-flex align-items-center justify-content-center shadow-sm medal-glow" :class="'medal-' + (index + 1)">
                  <i class="bi bi-award-fill"></i>
                </div>
              </div>
              
              <div class="d-flex" :class="isMobile ? 'flex-column' : 'flex-row align-items-center p-2'">
                <div :class="isMobile ? 'ratio ratio-1x1' : '' " :style="isMobile ? '' : 'width: 50px; height: 50px; flex-shrink:0;'">
                  <img :src="p.image" class="object-fit-cover w-100 h-100 rounded-3" :class="{ 'card-img-top': isMobile }">
                </div>
                <div class="card-body p-2 text-center" :class="{ 'text-start ps-3 py-0': !isMobile }">
                  <div class="text-truncate x-small fw-bold text-dark mb-0">{{ p.name }}</div>
                  <div class="text-primary fw-bolder small">${{ p.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側/下方：動態氣泡遊樂場 -->
      <div class="col-12 col-md-7 col-xl-8 flex-grow-1 h-md-100">
        <div class="position-relative bubbles-area h-100 overflow-hidden rounded-4 border">
          <!-- [遠景層] 模糊、較小、偏淡的背景留言 -->
          <div
            class="feedback-bubble bubble-far bubble-f1 float-anim-bg"
            style="animation-delay: 0s"
          >
            <div class="text-muted fw-bold" style="font-size: 0.75rem">
              品質超出預期！
            </div>
          </div>
          <div
            class="feedback-bubble bubble-far bubble-f2 float-anim-bg"
            style="animation-delay: 3s"
          >
            <div class="text-muted fw-bold" style="font-size: 0.75rem">
              寄件包裝防護做得很好。
            </div>
          </div>
          <div
            class="feedback-bubble bubble-far bubble-f3 float-anim-bg"
            style="animation-delay: 1.5s"
          >
            <div class="text-muted fw-bold" style="font-size: 0.75rem">
              客服回應很親切～
            </div>
          </div>

          <!-- [中景層] 一般大小的常規留言 -->
          <div
            class="feedback-bubble bubble-mid bubble-m1 float-anim-pop"
            style="animation-delay: 0.5s"
          >
            <div class="small fw-bold text-dark">出貨超快，包裝很精緻！讚 👍</div>
          </div>
          <div
            class="feedback-bubble bubble-mid bubble-m2 float-anim-pop"
            style="animation-delay: 4.5s"
          >
            <div class="small fw-bold text-dark">材質超舒服，已推薦給朋友～</div>
          </div>
          <div
            class="feedback-bubble bubble-mid bubble-m3 float-anim-pop"
            style="animation-delay: 2.5s"
          >
            <div class="small fw-bold text-dark">會無限回購！😍 價格太甜</div>
          </div>
          <div
            class="feedback-bubble bubble-mid bubble-m4 float-anim-pop"
            style="animation-delay: 6s"
          >
            <div class="small fw-bold text-dark">比實體店面買還便宜！</div>
          </div>

          <!-- [近景層] 放大、聚焦的主留言 (正中央) -->
          <div
            class="feedback-bubble bubble-near bubble-main float-anim-hero shadow-lg bg-white border border-primary z-3"
            style="animation-delay: 1s"
          >
            <div class="d-flex justify-content-center align-items-center mb-1">
              <div class="text-warning small me-2">★★★★★</div>
              <span class="small text-secondary fw-bold">林*珊</span>
            </div>
            <div class="fw-bolder text-dark fs-6 mt-1">
              「這是我今年買過最滿意的一件！」
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isMobile: window.innerWidth < 768
    };
  },
  setup() {
    const hotPicks = [
      { id: 1, name: '韓系牛仔褲', price: 890, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=200' },
      { id: 2, name: '棉質素面T', price: 350, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200' },
      { id: 3, name: '防潑水包裹', price: 590, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200' },
      { id: 4, name: '透氣編織帽', price: 420, image: 'https://images.unsplash.com/photo-1514859541629-278a9037c3f5?q=80&w=200' },
      { id: 5, name: '大容量水瓶', price: 280, image: 'https://images.unsplash.com/photo-1602143399827-7034e34cb180?q=80&w=200' },
    ];
    return {
      modules: [Autoplay, Pagination, EffectFade],
      hotPicks
    };
  },
  mounted() {
    window.addEventListener('resize', this.updateIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth < 768;
    }
  }
};
</script>

<style scoped>
/* ======== 第一部分：排版與 Banner ======== */
.swiper-wrapper-box {
  width: 100%;
  aspect-ratio: 21 / 9;
  max-height: 50vh;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .swiper-wrapper-box {
    aspect-ratio: 16 / 9;
  }
}

.slide-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text-shadow {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
}
.slide-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
.slide-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
}



/* 跑馬燈動畫 */
.marquee-text {
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* 快捷圖示按鈕 */
.icon-box {
  width: 50px;
  height: 50px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.quick-link-block:hover .icon-box {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
  border-color: var(--bs-primary) !important;
}
.quick-link-block:hover span {
  color: var(--bs-primary) !important;
}

/* ======== 第二部分：氣泡評價 ======== */
.bubbles-area {
  background: radial-gradient(circle at center, #fdfdfd 0%, #f1f3f5 100%);
}

/* ======== 第三部分：景深與浮動動畫 ======== */
/* 動畫：出現並淡出 (背景遠景層：小而淡) */
@keyframes bgFadeInOut {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.7);
    filter: blur(1px);
  }
  20% {
    opacity: 0.5;
    transform: translateY(0px) scale(0.75);
    filter: blur(0px);
  }
  80% {
    opacity: 0.5;
    transform: translateY(-3px) scale(0.78);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(0.8);
    filter: blur(1px);
  }
}

/* 動畫：出現並淡出 (中景層：一般大小) */
@keyframes popFadeInOut {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.9);
  }
  15% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  85% {
    opacity: 1;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px) scale(0.95);
  }
}

/* 動畫：主打星 (近景層：特別大、特別久) */
@keyframes heroFadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, 15px) scale(1.05);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1.15);
  }
  90% {
    opacity: 1;
    transform: translate(-50%, -4px) scale(1.18);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -15px) scale(1.1);
  }
}

.feedback-bubble {
  position: absolute;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 220px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  opacity: 0; /* 預設完全透明，由動畫掌握顯隱 */
  animation-fill-mode: both;
}

/* 氣泡小尾巴 (統一向下指) */
.feedback-bubble::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
}

/* ======== 各氣泡的絕對定位位置與背景色 ======== */

/* [遠景] 偏清淡的樣式 */
.bubble-far {
  background-color: #f8f9fa;
  color: #6c757d;
  z-index: 0;
}
.bubble-far::after {
  border-color: #f8f9fa transparent transparent transparent;
}

.bubble-f1 {
  top: 8%;
  left: 35%;
}
.bubble-f2 {
  top: 60%;
  right: 10%;
}
.bubble-f3 {
  bottom: 10%;
  left: 8%;
}

/* [中景] 有溫度的顏色 */
.bubble-mid {
  z-index: 1;
}

.bubble-m1 {
  top: 15%;
  left: 5%;
  background-color: #fce8cc;
}
.bubble-m1::after {
  border-color: #fce8cc transparent transparent transparent;
}

.bubble-m2 {
  top: 20%;
  right: 5%;
  background-color: #e6f2f0;
}
.bubble-m2::after {
  border-color: #e6f2f0 transparent transparent transparent;
  left: auto;
  right: 20px;
}

.bubble-m3 {
  bottom: 15%;
  left: 20%;
  background-color: #ffeaea;
}
.bubble-m3::after {
  border-color: #ffeaea transparent transparent transparent;
}

.bubble-m4 {
  bottom: 20%;
  right: 28%;
  background-color: #f3e5f5;
}
.bubble-m4::after {
  border-color: #f3e5f5 transparent transparent transparent;
  left: auto;
  right: 20px;
}

/* [近景主打] 置中且最大 */
.bubble-near {
  top: 40%;
  left: 50%;
  padding: 1rem 1.25rem;
  max-width: 280px;
}
.bubble-near::after {
  border-color: #fff transparent transparent transparent;
  left: 50%;
  transform: translateX(-50%);
}

/* ======== 套用動畫週期 ======== */
/* 背景播放得慢一點(10s)，中景節奏輕快一點(7~8s)，近景主打存在感高(9s) */
.float-anim-bg {
  animation: bgFadeInOut 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.float-anim-pop {
  animation: popFadeInOut 7.5s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
}
.float-anim-hero {
  animation: heroFadeInOut 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}



/* Swiper 小圓點顏色覆蓋 */
:deep(.swiper-pagination-bullet) {
  background-color: #fff;
  opacity: 0.6;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background-color: var(--bs-primary);
  border-radius: 4px;
}

/* 排名獎牌樣式 (極致閃爍版) */
.medal-badge {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 1.4rem;
  color: white;
  border: 3px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 閃閃發光的流動效果 (Shimmer) */
.medal-badge::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -150%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    115deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(25deg);
  animation: shimmer 4s infinite linear;
}

@keyframes shimmer {
  0% { left: -150%; }
  100% { left: 100%; }
}

.medal-glow {
  animation: medal-pulse 2.5s infinite ease-in-out;
}

@keyframes medal-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); transform: translate(-30%, -30%) scale(1); filter: brightness(1); }
  50% { box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.2); transform: translate(-30%, -30%) scale(1.08); filter: brightness(1.2); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); transform: translate(-30%, -30%) scale(1); filter: brightness(1); }
}

.medal-1 {
  background: linear-gradient(135deg, #ffd700 0%, #ffac00 100%); /* 冠軍：金色 */
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
}
.medal-1.medal-glow {
  animation: medal-pulse-gold 2s infinite ease-in-out;
}
@keyframes medal-pulse-gold {
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); transform: translate(-30%, -30%) scale(1); filter: brightness(1); }
  50% { box-shadow: 0 0 20px 8px rgba(255, 215, 0, 0.3); transform: translate(-30%, -30%) scale(1.12); filter: brightness(1.15); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); transform: translate(-30%, -30%) scale(1); filter: brightness(1); }
}

.medal-2 {
  background: linear-gradient(135deg, #e0e0e0 0%, #9e9e9e 100%); /* 亞軍：銀色 */
  box-shadow: 0 0 12px rgba(192, 192, 192, 0.6);
}

.medal-3 {
  background: linear-gradient(135deg, #cd7f32 0%, #a0522d 100%); /* 季軍：銅色 */
  box-shadow: 0 0 12px rgba(205, 127, 50, 0.5);
}

@media (max-width: 768px) {
  .medal-badge {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
    border-width: 2px;
  }
}
</style>
