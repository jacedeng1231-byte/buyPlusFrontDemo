<template>
  <div class="h-100 d-flex flex-column overflow-hidden p-0">
    
    <!-- 1. 購物車與結帳主區塊 -->
    <div v-if="currentStep < 3" class="h-100 d-flex flex-column scroll-area overflow-auto">
      
      <!-- 進度導覽條 (Progress Bar) -->
      <div class="px-5 py-3 bg-white border-bottom sticky-top z-3">
        <div class="position-relative mx-auto" style="max-width: 600px; margin: 2rem auto;">
          <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 2px;">
            <div class="progress-bar transition-all" :style="'width: ' + ((currentStep - 1) * 50) + '%'"></div>
          </div>
          <!-- 階段 1 -->
          <button @click="goToStep(1)" type="button" 
            class="position-absolute top-0 start-0 translate-middle btn btn-sm rounded-pill transition-all d-flex align-items-center justify-content-center" 
            :class="currentStep >= 1 ? 'btn-primary shadow' : 'btn-secondary'"
            style="width: 2.2rem; height:2.2rem; z-index: 4;">
            <i v-if="currentStep > 1" class="bi bi-check-lg"></i>
            <span v-else>1</span>
          </button>
          <div class="position-absolute start-0 translate-middle-x mt-4 small fw-bold text-nowrap" :class="currentStep === 1 ? 'text-primary' : 'text-muted'" style="top: 100%;">購物車</div>

          <!-- 階段 2 -->
          <button @click="goToStep(2)" type="button" 
            class="position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill transition-all d-flex align-items-center justify-content-center" 
            :class="currentStep >= 2 ? 'btn-primary shadow' : 'btn-secondary'"
            style="width: 2.2rem; height:2.2rem; z-index: 4;">
            <i v-if="currentStep > 2" class="bi bi-check-lg"></i>
            <span v-else>2</span>
          </button>
          <div class="position-absolute start-50 translate-middle-x mt-4 small fw-bold text-nowrap" :class="currentStep === 2 ? 'text-primary' : 'text-muted'" style="top: 100%;">填寫資料</div>

          <!-- 階段 3 -->
          <button type="button" 
            class="position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill transition-all d-flex align-items-center justify-content-center" 
            :class="currentStep >= 3 ? 'btn-primary shadow' : 'btn-secondary'"
            style="width: 2.2rem; height:2.2rem; z-index: 4;">
            <span>3</span>
          </button>
          <div class="position-absolute start-100 translate-middle-x mt-4 small fw-bold text-muted text-nowrap" style="top: 100%;">完成購買</div>
        </div>
      </div>

      <!-- 內容區 -->
      <div class="flex-grow-1 p-3 p-md-4">
        
        <!-- 狀態 0: 購物車為空 -->
        <div v-if="store.cartCount === 0" class="h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center animate-fade-in">
          <div class="bg-light rounded-circle d-flex align-items-center justify-content-center mb-4 border" style="width: 120px; height: 120px;">
            <i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i>
          </div>
          <h3 class="fw-bold text-dark mb-2">您的購物車是空的</h3>
          <p class="text-secondary mb-4">快去賣場逛逛，把心儀的商品帶回家吧！</p>
          <router-link to="/products" class="btn btn-primary rounded-pill px-5 py-3 fw-bold borderSet shadow-sm fs-5">
            前往商品列表
          </router-link>
        </div>

        <!-- 階段 1: 購物車明細 (可調整) -->
        <div v-else-if="currentStep === 1" class="animate-fade-in" style="max-width: 1000px; margin: 0 auto;">
          <div class="bg-white rounded-4 border shadow-sm overflow-hidden mb-4">
            <div class="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
              <h5 class="fw-bold mb-0"><i class="bi bi-cart3 me-2 text-primary"></i>確認購物清單</h5>
              <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">共 {{ store.cartCount }} 件商品</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light text-secondary small">
                  <tr>
                    <th class="py-3 px-4 border-0">商品</th>
                    <th class="py-3 border-0 text-center">單價</th>
                    <th class="py-3 border-0 text-center">規格/數量</th>
                    <th class="py-3 px-4 border-0 text-end">小計</th>
                    <th class="py-3 px-3 border-0 text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in store.cart" :key="item.id + (item.spec ? JSON.stringify(item.spec) : '')">
                    <td class="px-4 py-4">
                      <div class="d-flex align-items-center">
                        <div class="ratio ratio-1x1 bg-light rounded-3 me-3 shadow-sm border overflow-hidden" style="width: 60px; flex-shrink:0;">
                          <img :src="item.image" class="object-fit-cover w-100 h-100" />
                        </div>
                        <div style="min-width: 0;">
                          <div class="fw-bold text-dark text-truncate mb-1">{{ item.name }}</div>
                          <div v-if="item.spec" class="small text-muted d-inline-block bg-light px-2 py-1 rounded">
                            {{ Object.values(item.spec).join(' / ') }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-center text-muted">${{ item.price.toLocaleString() }}</td>
                    <td class="text-center">
                      <div class="d-inline-flex align-items-center border rounded-pill bg-light p-1">
                        <button @click="store.updateQuantity(item.id, item.quantity - 1, item.spec)" 
                          class="btn btn-sm btn-white border-0 shadow-none rounded-circle" style="width: 28px; height: 28px;">-</button>
                        <input type="number" v-model.number="item.quantity" @change="store.updateQuantity(item.id, item.quantity, item.spec)"
                          class="form-control form-control-sm border-0 bg-transparent text-center fw-bold p-0 shadow-none" style="width: 40px;">
                        <button @click="store.updateQuantity(item.id, item.quantity + 1, item.spec)" 
                          class="btn btn-sm btn-white border-0 shadow-none rounded-circle" style="width: 28px; height: 28px;">+</button>
                      </div>
                    </td>
                    <td class="px-4 text-end fw-bolder text-primary">${{ (item.price * item.quantity).toLocaleString() }}</td>
                    <td class="px-3 text-center">
                      <button @click="store.removeFromCart(item.id, item.spec)" class="btn btn-link text-danger p-0 border-0">
                        <i class="bi bi-trash3 fs-5"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-4 bg-light-subtle border-top text-end">
              <div class="mb-3">
                <span class="text-secondary me-3">商品總計</span>
                <span class="fs-4 fw-bolder text-dark">${{ store.cartTotal.toLocaleString() }}</span>
              </div>
              <button @click="goToStep(2)" class="btn btn-primary rounded-pill px-5 py-3 fw-bold borderSet shadow-sm fs-5">
                下一步：填寫結帳資料 <i class="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 階段 2: 真正結帳 (不可修改商品) -->
        <div v-else-if="currentStep === 2" class="animate-fade-in" style="max-width: 1100px; margin: 0 auto;">
          <div class="row g-4">
            <!-- 左欄：結帳資訊 -->
            <div class="col-lg-7">
              <!-- 配送方式 -->
              <div class="bg-white p-4 rounded-4 border shadow-sm mb-4 text-start">
                <h5 class="fw-bold mb-4 d-flex align-items-center">
                  <i class="bi bi-truck me-2 text-primary"></i> 配送資訊
                </h5>
                <div class="d-flex flex-column gap-3 mb-4">
                  <label v-for="method in [{id:'home', name:'宅配到府', price:100}, {id:'711', name:'7-11 店到店', price:60}, {id:'family', name:'全家 店到店', price:60}]" 
                    :key="method.id"
                    class="d-flex align-items-center p-3 rounded-4 bg-white border borderSet-link cursor-pointer transition-all" 
                    :class="{'custom-active shadow-sm': shippingMethod === method.id}">
                    <input type="radio" v-model="shippingMethod" :value="method.id" class="form-check-input me-3 mt-0 shadow-none">
                    <span class="fw-bold">{{ method.name }}</span>
                    <span class="ms-auto text-primary fw-bold">${{ method.price }}</span>
                  </label>
                </div>
                <div class="mb-2 text-secondary small px-1">收件地址 / 門市名稱</div>
                <input type="text" v-model="address" class="form-control py-3 rounded-4 border shadow-sm" :placeholder="shippingPlaceholder">
              </div>

              <!-- 付款方式 -->
              <div class="bg-white p-4 rounded-4 border shadow-sm mb-4 text-start">
                <h5 class="fw-bold mb-4 d-flex align-items-center">
                  <i class="bi bi-credit-card me-2 text-primary"></i> 付款方式
                </h5>
                <div class="d-flex flex-column gap-3">
                  <label v-for="method in [{id:'transfer', name:'ATM 轉帳'}, {id:'cod', name:'貨到付款'}, {id:'face', name:'面交付款'}]" 
                    :key="method.id"
                    class="d-flex align-items-center p-3 rounded-4 bg-white border borderSet-link cursor-pointer transition-all" 
                    :class="{'custom-active shadow-sm': paymentMethod === method.id}">
                    <input type="radio" v-model="paymentMethod" :value="method.id" class="form-check-input me-3 mt-0 shadow-none">
                    <span class="fw-bold">{{ method.name }}</span>
                  </label>
                </div>
              </div>

              <!-- 備註 -->
              <div class="bg-white p-4 rounded-4 border shadow-sm mb-4 text-start">
                <h5 class="fw-bold mb-3 d-flex align-items-center">
                  <i class="bi bi-chat-dots me-2 text-primary"></i> 給店家的話
                </h5>
                <textarea class="form-control border shadow-sm rounded-4 p-3" rows="3" placeholder="關於此筆訂單的特別需求..."></textarea>
              </div>
            </div>

            <!-- 右欄：訂單內容彙整 -->
            <div class="col-lg-5">
              <div class="bg-light p-4 rounded-4 border sticky-top shadow-sm" style="top: 100px;">
                <h5 class="fw-bold mb-4 border-bottom pb-3 text-dark">訂單摘要</h5>
                
                <!-- 優惠碼輸入區 (Moved here) -->
                <div class="mb-4 p-3 bg-white rounded-4 border borderSet-light text-start shadow-sm">
                  <label class="form-label small fw-bold text-secondary mb-2">我有優惠碼</label>
                  <div class="input-group input-group-sm">
                    <input 
                      type="text" 
                      v-model="couponCode"
                      @focus="onCouponFocus"
                      class="form-control border shadow-none px-3 py-2 rounded-pill-start bg-light" 
                      placeholder="輸入代碼..."
                      :disabled="store.coupon.isApplied"
                    >
                    <button 
                      v-if="!store.coupon.isApplied"
                      @click="handleApplyCoupon"
                      class="btn btn-primary rounded-pill-end px-3 fw-bold"
                      :disabled="!couponCode"
                    >使用</button>
                    <button 
                      v-else
                      @click="handleRemoveCoupon"
                      class="btn btn-outline-danger rounded-pill-end px-3 fw-bold"
                    >移除</button>
                  </div>
                  <div v-if="store.coupon.isApplied" class="mt-2 text-success x-small fw-bold animate-fade-in">
                    <i class="bi bi-check-circle-fill me-1"></i> 已套用 9 折惠碼
                  </div>
                </div>

                <!-- 簡約商品列表 (不可修改) -->
                <div class="flex-column gap-3 mb-4 overflow-auto scroll-hide text-start" style="max-height: 250px;">
                  <div v-for="item in store.cart" :key="item.id" class="d-flex align-items-center mb-3 bg-white p-2 rounded-3 border-bottom-0 border shadow-xs">
                    <img :src="item.image" class="rounded object-fit-cover me-3 border" style="width: 50px; height: 50px;">
                    <div class="flex-grow-1" style="min-width: 0;">
                      <div class="small fw-bold text-dark text-truncate">{{ item.name }}</div>
                      <div class="x-small text-muted">x {{ item.quantity }}</div>
                    </div>
                    <div class="fw-bold text-dark ms-2">${{ (item.price * item.quantity).toLocaleString() }}</div>
                  </div>
                </div>

                <!-- 結算資訊 -->
                <div class="bg-white p-4 rounded-4 border shadow-sm mb-4 text-start">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary small">商品總計</span>
                    <span class="fw-bold text-dark small">${{ store.cartTotal.toLocaleString() }}</span>
                  </div>
                  
                  <!-- 滿額折抵 -->
                  <div v-if="store.appliedDiscount > 0" class="d-flex justify-content-between mb-2 animate-fade-in">
                    <span class="text-danger small fw-bold">行銷活動折抵</span>
                    <span class="fw-bold text-danger small">- ${{ store.appliedDiscount.toLocaleString() }}</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary small">運費</span>
                    <div v-if="store.isFreeShipping" class="text-end">
                      <span class="text-decoration-line-through text-muted small me-2">${{ shippingFee }}</span>
                      <span class="fw-bold text-success small">已免運 ($0)</span>
                    </div>
                    <span v-else class="fw-bold text-dark small">${{ shippingFee.toLocaleString() }}</span>
                  </div>

                  <hr class="my-3 border-light opacity-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bolder fs-5 text-dark">帳單總計</span>
                    <span class="fw-bolder fs-3 text-danger shadow-text">${{ (store.cartTotal - store.appliedDiscount + (store.isFreeShipping ? 0 : shippingFee)).toLocaleString() }}</span>
                  </div>
                </div>

                <div class="d-flex flex-column gap-2">
                  <button @click="submitOrder" class="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-5 borderSet shadow-sm">
                    確認送出訂單
                  </button>
                  <button @click="goToStep(1)" class="btn btn-link text-secondary text-decoration-none fw-bold small">
                    <i class="bi bi-chevron-left me-1"></i> 返回購物車修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 購買成功頁面 -->
    <div v-else class="h-100 overflow-auto d-flex flex-column align-items-center p-4 p-md-5 text-center is-success bg-white rounded-4 border-0 animate-fade-in scroll-area">
       <div class="w-100 my-auto" style="max-width: 580px;">
          <!-- 成功狀態圖示 (沿用現有) -->
          <div class="mb-4 d-flex justify-content-center">
             <div class="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100px; height: 100px; background-color: rgba(var(--bs-primary-rgb), 0.1) !important;">
                <i class="bi bi-check-lg" style="font-size: 4rem;"></i>
             </div>
          </div>

          <h1 class="fw-bolder mb-3 text-dark" style="letter-spacing: 2px;">購買成功</h1>
          <p class="text-secondary fs-5 mb-5 fw-medium">感謝您的支持，您的訂單已成功送出！</p>
          
          <div class="bg-light rounded-4 p-4 mb-5 border shadow-sm text-start borderSet-light">
             <div class="row g-3">
                <div class="col-6">
                   <div class="text-muted small mb-1">付款方式</div>
                   <div class="fw-bold text-dark fs-5">{{ paymentMethodName }}</div>
                </div>
                <div class="col-6 border-start text-end">
                   <div class="text-muted small mb-1">訂單狀態</div>
                   <div class="fw-bold text-primary fs-5">處理中</div>
                </div>
             </div>
          </div>

          <div class="text-start px-2 mb-5">
             <p class="text-secondary mb-0" style="line-height: 1.8;">
                我們會在第一時間為您處理訂單。如有任何問題，歡迎隨時透過客服與我們聯繫。<br>
                您可以至 <router-link to="/order" class="text-primary fw-bold text-decoration-none border-bottom border-primary border-2">訂購紀錄</router-link> 查看詳細資訊。
             </p>
          </div>

          <button @click="goHome" class="btn btn-primary w-100 py-3 fw-bold fs-5 rounded-pill borderSet mb-5 shadow-sm">
             回到首頁繼續購物
          </button>

          <!-- APP 下載區塊 (保持) -->
          <div class="card border rounded-4 p-4 shadow-sm bg-white borderSet-light">
             <div class="d-flex align-items-center text-start gap-4">
                <div class="p-1 bg-white rounded-4 shadow-sm border" style="width: 90px; height: 90px;">
                   <div class="h-100 w-100 rounded-3 d-flex align-items-center justify-content-center text-white" 
                      style="background: var(--bs-primary);">
                      <i class="bi bi-bag-plus-fill" style="font-size: 3rem;"></i>
                   </div>
                </div>
                <div class="flex-grow-1">
                   <h5 class="fw-bolder mb-1 text-dark">想即時接收訊息通知嗎？</h5>
                   <div class="text-secondary small mb-0">立即下載「擺擺會員」APP，隨時掌握訂單狀態</div>
                </div>
             </div>
             <!-- 商店按鈕 -->
             <div class="row g-2 mt-4">
                <div class="col-6"><div class="bg-dark rounded-3 py-2 px-3 d-flex align-items-center justify-content-center cursor-pointer hover-scale border border-secondary shadow-sm"><i class="bi bi-google-play text-white fs-4 me-2"></i><div class="text-start"><div class="text-white-50" style="font-size: 0.5rem; line-height: 1;">GET IT ON</div><div class="text-white fw-bold" style="font-size: 0.8rem;">Google Play</div></div></div></div>
                <div class="col-6"><div class="bg-dark rounded-3 py-2 px-3 d-flex align-items-center justify-content-center cursor-pointer hover-scale border border-secondary shadow-sm"><i class="bi bi-apple text-white fs-4 me-2"></i><div class="text-start"><div class="text-white-50" style="font-size: 0.5rem; line-height: 1;">Download on the</div><div class="text-white fw-bold" style="font-size: 0.8rem;">App Store</div></div></div></div>
             </div>
          </div>
       </div>
    </div>

  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CheckoutView',
  data() {
    return {
      store,
      currentStep: 1, // 1: 購物車, 2: 填寫資料, 3: 完成
      couponCode: '',
      shippingMethod: 'home',
      paymentMethod: 'transfer',
      address: '',
    };
  },
  computed: {
    shippingFee() {
      return this.shippingMethod === 'home' ? 100 : 60;
    },
    shippingPlaceholder() {
      if (this.shippingMethod === 'home') return '請輸入收件地址 (含縣市、道路名稱、門牌)';
      return '請輸入取貨門市名稱或門市店號 (例如：台東門市)';
    },
    paymentMethodName() {
      const names = {
        transfer: 'ATM 轉帳',
        cod: '貨到付款',
        face: '面交付款'
      };
      return names[this.paymentMethod];
    }
  },
  methods: {
    goToStep(step) {
      if (step === 2) {
        if (this.store.cartCount === 0) return;
        if (!this.store.isLoggedIn) {
          this.store.showAssistantMessage("等一下下！結帳前需要先登入才能紀錄您的配送資訊喔！內選單已為您開啟，請選擇登入方式 擺擺 🔒", 'idle', 6000);
          this.store.openMobileMenu();
          return;
        }
      }
      if (step === 1 && this.currentStep === 3) return; // 成功後不回跳
      this.currentStep = step;
      this.scrollToTop();
    },
    submitOrder() {
      if (this.store.cartCount === 0) return;
      
      // 呼叫 store 建立真實訂單
      this.store.createOrder({
        shippingFee: this.shippingFee,
        address: this.address
      });
      
      this.currentStep = 3;
    },
    goHome() {
      this.$router.push('/');
    },
    onCouponFocus() {
      if (this.store.coupon.isApplied) return;
      this.store.showAssistantMessage("需要優惠碼嗎？擺擺 幫您找出了專屬折扣喔！🦊✨", 'processing', 6000, {
        label: "套用折扣碼：BUYPLUS2026",
        callback: () => {
          this.couponCode = 'BUYPLUS2026';
          this.handleApplyCoupon();
          this.store.showAssistantMessage("已為您自動帶入折扣碼！結帳省錢就是這麼簡單！擺擺 💰", 'success', 4000);
        }
      });
    },
    handleApplyCoupon() {
      const result = this.store.applyCoupon(this.couponCode);
      if (result.success) {
        this.store.showAssistantMessage(result.message, 'success', 5000);
      } else {
        this.store.showAssistantMessage(result.message, 'error', 5000);
      }
    },
    handleRemoveCoupon() {
      this.store.removeCoupon();
      this.couponCode = '';
      this.store.showAssistantMessage("已移除優惠碼，您可以嘗試輸入其他的喔！🦊", 'idle', 3000);
    },
    scrollToTop() {
      const scrollArea = this.$el.querySelector('.scroll-area');
      if (scrollArea) scrollArea.scrollTop = 0;
    }
  }
}
</script>

<style scoped>
.scroll-area::-webkit-scrollbar {
  width: 6px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}

.cursor-pointer {
  cursor: pointer;
}

.shadow-text {
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.shadow-xs {
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.borderSet-link {
   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.active.borderSet-link,
.custom-active.borderSet-link {
   color: var(--bs-primary) !important;
   background-color: rgba(var(--bs-primary-rgb), 0.08) !important;
   border-color: var(--bs-primary) !important;
   box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.12) !important;
   font-weight: 700 !important;
}

/* 讓選中的 radio 在背景下清晰 */
.custom-active.borderSet-link .form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.hover-scale {
   transition: transform 0.2s ease;
}
.hover-scale:hover {
   transform: scale(1.05);
}

.transition-all {
  transition: all 0.3s ease;
}

.btn-white {
  background-color: white;
  color: #333;
}
.btn-white:hover {
  background-color: #f8f9fa;
}

/* 進度條按鈕效果 */
button.rounded-pill:not(.btn-primary) {
  border: 4px solid white;
}
button.rounded-pill.btn-primary {
  border: 4px solid white;
}

/* 動畫 */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.x-small {
  font-size: 0.75rem;
}

.is-success .card {
   animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
   from { transform: translateY(50px); opacity: 0; }
   to { transform: translateY(0); opacity: 1; }
}
</style>