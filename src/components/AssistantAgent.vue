<template>
  <div v-if="store.assistant.isVisible" 
       class="assistant-container" 
       :class="[store.assistant.state, { 'has-message': store.assistant.message, 'in-header': inHeader }]">
    
    <!-- Speech Bubble -->
    <transition name="pop">
      <div v-if="store.assistant.message" class="speech-bubble">
        <div class="message-content">{{ store.assistant.message }}</div>
        
        <!-- Action Button -->
        <div v-if="store.assistant.actionLabel" class="action-box mt-2">
          <button @click.stop="store.assistant.actionCallback" class="btn btn-action btn-sm w-100 rounded-pill fw-bold">
            {{ store.assistant.actionLabel }}
          </button>
        </div>

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
const thinkAndSpeak = (message, state = 'idle', duration = 6000, action = null) => {
  store.setAssistantState('processing'); // 變更為思考狀態
  setTimeout(() => {
    store.showAssistantMessage(message, state, duration, action);
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
    const total = store.cartTotal;
    const nextDiscountGoal = (Math.floor(total / 1000) + 1) * 1000;
    const gapDiscount = nextDiscountGoal - total;
    const gapShipping = 1200 - total;
    
    // 推薦商品資料 (精選幾件好湊的小物)
    const items = [
      { id: 2, name: "棉質素面T", price: 350, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200' },
      { id: 5, name: "大容量水瓶", price: 280, image: 'https://images.unsplash.com/photo-1602143399827-7034e34cb180?q=80&w=200' },
      { id: 4, name: "透氣編織帽", price: 420, image: 'https://images.unsplash.com/photo-1514859541629-278a9037c3f5?q=80&w=200' }
    ];

    // 根據金額區間給予不同建議
    if (total < 1000) {
      const rec = items[0];
      thinkAndSpeak(
        `報個好康：目前還差 $${gapDiscount} 就能「現折 $100」💰，離免運門檻也只差 $${gapShipping} 唷！要不要帶件「${rec.name}」來湊呢？`,
        'success',
        10000,
        {
          label: `我也要「${rec.name}」($${rec.price})`,
          callback: () => {
            store.addToCart(rec);
            setTimeout(() => store.showAssistantMessage("聰明！離下一個優惠更近一步了！🦊✨", 'success', 4000), 500);
          }
        }
      );
    } else if (total < 1200) {
      const rec = items[1];
      thinkAndSpeak(
        `太讚了！您已享有 $${store.appliedDiscount} 的折扣！🎉 目前離「免運優惠」只剩最後一哩路 ($${gapShipping})，推薦您帶個「${rec.name}」就免運囉！`,
        'success',
        10000,
        {
          label: `帶個「${rec.name}」湊免運！`,
          callback: () => {
            store.addToCart(rec);
            setTimeout(() => store.showAssistantMessage("恭喜！免運門檻達成，我幫您把運費弄消失了！🦊🪄", 'success', 5000), 500);
          }
        }
      );
    } else {
      thinkAndSpeak(
        `完美！訂單已疊加「${store.appliedDiscount} 元折扣」與「免運優惠」！✨ 我敢說您是今日的購物王！`,
        'success',
        6000
      );
    }
    return;
  }

  // 3. 訂購紀錄頁面狀態
  if (route.path.includes('order')) {
    const orders = store.orders || [];
    const pendingCount = orders.filter(o => o.status === '待付款').length;
    const processingCount = orders.filter(o => o.status === '處理中' || o.status === '待出貨' || o.status === '已出貨').length;

    if (pendingCount > 0) {
      thinkAndSpeak(
        `主人！您目前有 ${pendingCount} 筆訂單尚未付款喔！💰 匯款完成後記得透過『匯款回報』告訴我，我會立刻催促賣家處理！🦊✨`,
        'idle',
        10000,
        {
          label: "立刻去匯款回報 📝",
          callback: () => {
            router.push('/money-transfer');
            store.showAssistantMessage("好的！我們去回報頁面，記得準備好帳號後五碼喔！🦊", 'idle', 5000);
          }
        }
      );
    } else if (processingCount > 0) {
      thinkAndSpeak(
        `您的訂單正在精心準備中！🚚 點擊訂單可以展開查看長長的「物流日誌」，我也在幫您盯著進度呢，請放心！🦊📦`,
        'success',
        8000
      );
    } else if (orders.length === 0) {
      thinkAndSpeak(
        "訂購紀錄空空的耶？要去賣場逛逛，把心儀的商品帶回家嗎？現在還有免運好康喔！🦊🛍️",
        'idle',
        8000,
        {
          label: "前往逛逛賣場 🛒",
          callback: () => router.push('/products')
        }
      );
    } else {
      thinkAndSpeak("歡迎回來！這裡記錄了您的所有購物回憶，有任何問題隨時找我喔！🦊✨", 'idle', 5000);
    }
    return;
  }

  // 4. 首頁狀態
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
  left: 20px;
}

.assistant-container:not(.in-header) .speech-bubble {
  margin-bottom: 10px;
}

.assistant-container:not(.in-header) .bubble-arrow {
  bottom: -8px;
  left: 20px;
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
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .foxy-mascot {
    width: 70px;
    height: 70px;
  }
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
  max-width: 250px;
}

@media (max-width: 768px) {
  .speech-bubble {
    max-width: 200px;
    font-size: 13px;
    padding: 10px 14px;
  }
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
