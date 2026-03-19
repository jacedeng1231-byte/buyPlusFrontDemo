<template>
  <div v-if="store.assistant.isVisible" 
       class="assistant-container" 
       :class="[store.assistant.state, { 'has-message': store.assistant.message, 'in-header': inHeader }]">
    
    <!-- Speech Bubble -->
    <transition name="pop">
      <div v-if="store.assistant.message" class="speech-bubble">
        {{ store.assistant.message }}
        <div class="bubble-arrow"></div>
      </div>
    </transition>

    <!-- Foxy Mascot -->
    <div class="foxy-mascot" @click="handleMascotClick">
      <div class="mascot-image" :style="mascotStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, watch, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '../store';

const props = defineProps({
  inHeader: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const idleTimer = ref(null);

const mascotStyle = computed(() => {
  let position = '0% 0%'; // Default Idle
  switch (store.assistant.state) {
    case 'processing':
      position = '100% 0%';
      break;
    case 'success':
      position = '0% 100%';
      break;
    case 'error':
      position = '100% 100%';
      break;
  }
  return {
    backgroundPosition: position
  };
});

// 智慧型提示：模擬「思考」過程
const thinkAndSpeak = (message, state = 'idle', duration = 6000) => {
  store.setAssistantState('processing'); // 變更為思考狀態
  setTimeout(() => {
    store.showAssistantMessage(message, state, duration);
  }, 1000); // 思考一秒後說話
};

const handleMascotClick = () => {
  if (store.assistant.message) return; // 如果正在說話，先不干擾

  // 1. 未登入狀態
  if (!store.isLoggedIn) {
    thinkAndSpeak("想看更多專屬優惠嗎？點擊右上角登入吧！我們支援 LINE 快速登入，授權過程安全加密，絕不洩漏隱私，請放心使用！🔒🦊", 'idle', 8000);
    return;
  }

  // 2. 結帳頁面狀態
  if (route.path.includes('checkout')) {
    const threshold = 1200;
    const gap = threshold - store.cartTotal;
    if (gap > 0) {
      thinkAndSpeak(`報個好康：再湊 $${gap} 就能享免運優惠囉！🚚 要不要考慮帶件「棉質素面T」來湊滿額呢？`, 'success', 7000);
    } else {
      thinkAndSpeak("太強了！您的訂單已達免運門檻！省下的運費可以再多買一雙襪子呢～✨", 'success', 5000);
    }
    return;
  }

  // 3. 首頁狀態
  if (route.path === '/') {
    thinkAndSpeak("嘿！偷偷告訴您，下載「擺擺會員」APP 結帳更直覺，現在新註冊還送限時好禮喔！🎁✨", 'idle', 7000);
    return;
  }

  thinkAndSpeak("需要幫忙嗎？我是您的購物小助理 Foxy！🦊", 'idle', 3000);
};

// 監控路由變化：自動打招呼
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    setTimeout(() => thinkAndSpeak("歡迎回到首頁！今天想找點什麼好物呢？🏠✨"), 1500);
  } else if (newPath.includes('checkout')) {
    setTimeout(() => thinkAndSpeak("準備結帳了嗎？我會幫您檢查所有優惠喔！📋"), 1000);
  }
});

// 閒置隨機提示功能
const startIdleTips = () => {
  const tips = [
    "對了！你知道全館滿 $1200 就免運嗎？🚚",
    "最近「韓系牛仔褲」超熱賣的，要不要去看看？🔥",
    "加入「擺擺會員」APP，可以隨時追蹤包裹進度喔！📱",
    "點擊我可以獲得當前頁面的小建議喔！🦊"
  ];
  
  idleTimer.value = setInterval(() => {
    if (!store.assistant.message && Math.random() > 0.7) { // 30% 機率觸發隨機提示
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      thinkAndSpeak(randomTip);
    }
  }, 45000); // 每 45 秒檢查一次
};

onMounted(() => {
  // 初次進場歡迎
  if (route.path === '/') {
    setTimeout(() => thinkAndSpeak("哈囉！我是 Foxy 🦊，今天由我來陪您逛街，有任何問題隨時點我喔！✨", 'idle', 5000), 2500);
  }
  startIdleTips();
});

onUnmounted(() => {
  if (idleTimer.value) clearInterval(idleTimer.value);
});
</script>

<style scoped>
.assistant-container {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Default / Mobile / Floating Mode */
.assistant-container:not(.in-header) {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.assistant-container:not(.in-header) .speech-bubble {
  margin-bottom: 10px;
}

.assistant-container:not(.in-header) .bubble-arrow {
  bottom: -8px;
  right: 20px;
  border-width: 8px 8px 0 8px;
  border-color: white transparent transparent transparent;
}

.assistant-container:not(.in-header) .foxy-mascot {
  animation: float 3s ease-in-out infinite;
}

/* Header Mode (Desktop) */
.assistant-container.in-header {
  position: relative;
  flex-direction: column-reverse; /* Bubble pops down */
}

.assistant-container.in-header .foxy-mascot {
  width: 50px; /* Smaller for header */
  height: 50px;
  animation: none; /* No floating in header */
}

.assistant-container.in-header .speech-bubble {
  position: absolute;
  top: 60px;
  left: 0;
  width: 200px;
  margin-top: 5px;
}

.assistant-container.in-header .bubble-arrow {
  top: -8px;
  left: 15px;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent white transparent;
}

/* General Styles */
.foxy-mascot {
  width: 100px;
  height: 100px;
  cursor: pointer;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.mascot-image {
  width: 100%;
  height: 100%;
  background-image: url('../assets/assistant-foxy.png');
  background-size: 200% 200%;
  border-radius: 12px;
  transition: background-position 0.3s ease-in-out;
}

.speech-bubble {
  background: white;
  border-radius: 15px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  position: relative;
  border: 2px solid #ff6b35;
  white-space: normal;
  z-index: 10000;
}

.bubble-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-leave-active {
  animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse;
}

@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

.processing .foxy-mascot {
  animation: pulse 1s infinite alternate !important;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}
</style>
