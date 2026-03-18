<template>
  <div class="h-100 d-flex flex-column p-0 animate-fade-in">
    <!-- Header 標頭區塊 (與 OrderView 一致) -->
    <div class="d-flex align-items-center mb-4 px-3 py-3 bg-white rounded-4 border shadow-sm flex-shrink-0">
      <h2 class="fw-bolder mb-0 text-dark" style="letter-spacing: 2px;">匯款回報</h2>
      <span class="text-primary fw-bold ms-3 mt-1 text-uppercase" style="font-size: 1rem; letter-spacing: 1px;">Money Transfer</span>
    </div>

    <!-- 內容區與左側選單 (雙欄位佈局) -->
    <div class="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden gap-4">
      
      <!-- 左側/上方 標籤列 -->
      <div class="flex-shrink-0 p-3 rounded-4" style="min-width: 200px; background-color: rgba(102, 102, 102, 0.03);">
        <ul class="nav flex-row flex-md-column gap-3" id="transferTab" role="tablist">
          <li class="nav-item">
            <button @click="activeTab = 'pending'" class="nav-link w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none fw-bold" :class="{ 'active custom-active': activeTab === 'pending' }">
              代付款
              <span v-if="pendingOrders.length" class="badge rounded-pill bg-danger ms-1">{{ pendingOrders.length }}</span>
            </button>
          </li>
          <li class="nav-item">
            <button @click="activeTab = 'processing'" class="nav-link w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none fw-bold" :class="{ 'active custom-active': activeTab === 'processing' }">
              處理中
            </button>
          </li>
          <li class="nav-item">
            <button @click="activeTab = 'all'" class="nav-link w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none fw-bold" :class="{ 'active custom-active': activeTab === 'all' }">
              所有訂單
            </button>
          </li>
          <li class="nav-item">
            <button @click="activeTab = 'search'" class="nav-link w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none fw-bold" :class="{ 'active custom-active': activeTab === 'search' }">
              <i class="bi bi-search me-1"></i>搜尋
            </button>
          </li>
        </ul>
      </div>

      <!-- 右側/下方 詳細內容區塊 -->
      <div class="flex-grow-1 overflow-auto bg-white p-4 p-md-5 rounded-4 border-0 position-relative scroll-hidden">
        
        <!-- 子分頁標題 -->
        <div class="d-flex align-items-baseline mb-4">
          <h3 class="fw-bolder mb-0 me-3 text-dark">{{ tabTitle }}</h3>
          <span class="text-secondary small fw-bold">{{ tabSubtitle }}</span>
        </div>

        <!-- 搜尋區域 (僅在搜尋分頁顯示，照抄 OrderView) -->
        <div v-if="activeTab === 'search'" class="animate-fade-in mb-5">
           <div class="row g-4 border rounded-4 p-4 bg-light mx-0 mb-4">
             <div class="col-12 border-bottom border-light pb-2 mb-2">
                 <h6 class="fw-bold text-primary mb-0"><i class="bi bi-search me-2"></i>基本條件</h6>
             </div>
             
             <!-- 訂單編號 -->
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂單編號</label>
               <input type="text" v-model="searchQuery" class="form-control border-0 py-2 shadow-sm rounded-3" placeholder="輸入訂單編號 (例如: ORD-001)">
             </div>
             
             <!-- 商品名稱 -->
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">商品名稱</label>
               <input type="text" class="form-control border-0 py-2 shadow-sm rounded-3" placeholder="輸入商品名稱關鍵字">
             </div>
             
             <!-- 訂貨日期 -->
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂貨開始日期</label>
               <input type="date" class="form-control border-0 py-2 shadow-sm rounded-3">
             </div>
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂貨結束日期</label>
               <input type="date" class="form-control border-0 py-2 shadow-sm rounded-3">
             </div>
           </div>

           <!-- 進階條件 -->
           <h6 class="fw-bold border-bottom border-light pb-2 mb-4 text-dark d-flex align-items-center text-start">
               <i class="bi bi-sliders me-2 text-secondary"></i> 進階條件
           </h6>
           <div class="bg-white p-4 rounded-4 border text-start">
               <div class="form-check form-check-inline me-4 mb-3 mb-md-0">
                 <input class="form-check-input bg-light border-secondary" type="checkbox" id="outofstockCheck">
                 <label class="form-check-label text-dark fw-bold" for="outofstockCheck">
                   包含已斷貨商品
                 </label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input bg-light border-secondary" type="checkbox" id="onlyMatchCheck" checked>
                 <label class="form-check-label text-dark fw-bold" for="onlyMatchCheck">
                   只顯示完全符合的商品
                 </label>
               </div>
           </div>
           
           <div class="d-flex justify-content-end mt-4 gap-3">
             <button @click="searchQuery = ''" class="btn btn-light px-4 py-2 fw-bold text-dark rounded-pill border shadow-none">清除重填</button>
             <button class="btn btn-primary px-5 py-2 fw-bold borderSet rounded-pill border-primary shadow-none">
                <i class="bi bi-search me-2"></i> 開始搜尋
             </button>
           </div>
        </div>

        <!-- 訂單列表 (手風琴樣式，對齊 OrderView) -->
        <div class="accordion d-flex flex-column gap-4" id="transferAccordion">
          
          <!-- 1. 賣家匯款資訊 (僅在代付款且有內容時顯示) -->
          <div v-if="activeTab === 'pending' && pendingOrders.length > 0" class="alert alert-warning border-0 rounded-4 shadow-sm mb-2 p-4 text-start animate-slide-up">
            <h6 class="fw-bold mb-3 text-dark"><i class="bi bi-bank me-2"></i>賣家轉帳資訊</h6>
            <div class="row g-3">
              <div class="col-sm-6"><div class="small text-secondary mb-1">銀行名稱</div><div class="fw-bold text-dark">822 中國信託銀行</div></div>
              <div class="col-sm-6"><div class="small text-secondary mb-1">戶名</div><div class="fw-bold text-dark">買加加數位科技有限公司</div></div>
              <div class="col-sm-6"><div class="small text-secondary mb-1">分行</div><div class="fw-bold text-dark">敦南分行</div></div>
              <div class="col-sm-6"><div class="small text-secondary mb-1">帳號</div><div class="fw-bold text-dark fs-5 letter-spacing-1">123-456-789012</div></div>
            </div>
          </div>

          <div v-if="displayOrders.length > 0" class="d-flex flex-column gap-3">
             <div class="accordion-item border rounded-4 shadow-sm overflow-hidden animate-slide-up" v-for="(order, index) in displayOrders" :key="order.id">
                
                <!-- 標題列 -->
                <div class="accordion-header" :id="'heading' + index">
                  <button class="accordion-button bg-light py-3 px-4 shadow-none border-0 collapsed" 
                          type="button" 
                          data-bs-toggle="collapse" 
                          :data-bs-target="'#collapse' + index" 
                          aria-expanded="false" 
                          :aria-controls="'collapse' + index">
                    <div class="d-flex w-100 justify-content-between align-items-center pe-3 flex-wrap gap-2">
                      <div>
                        <span class="fw-bold text-secondary me-3">訂單編號：<span class="text-dark">{{ order.id }}</span></span>
                        <span class="text-muted small d-none d-md-inline-block">日期：{{ order.date }}</span>
                      </div>
                      <span class="badge px-3 py-2 rounded-pill shadow-sm" :class="getStatusBadgeClass(order.status)">
                        {{ order.status }}
                      </span>
                    </div>
                  </button>
                </div>
                
                <!-- 折疊內容 -->
                <div :id="'collapse' + index" 
                     class="accordion-collapse collapse" 
                     :aria-labelledby="'heading' + index" 
                     data-bs-parent="#transferAccordion">
                  <div class="accordion-body p-0">
                    
                    <!-- 商品明細表格 -->
                    <div class="table-responsive">
                      <table class="table table-hover align-middle mb-0 text-nowrap border-bottom border-light">
                        <thead class="bg-white text-secondary small">
                          <tr>
                            <th class="py-3 px-4 fw-normal border-bottom-0" style="width: 80px;">圖片</th>
                            <th class="py-3 fw-normal border-bottom-0">商品名稱</th>
                            <th class="py-3 fw-normal border-bottom-0 text-center">數量</th>
                            <th class="py-3 fw-normal border-bottom-0 text-end">單價</th>
                            <th class="py-3 px-4 fw-normal border-bottom-0 text-end">小計</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in order.items" :key="item.name">
                            <td class="px-4 py-3">
                              <div class="ratio ratio-1x1 bg-light rounded border" style="width: 50px; height: 50px;">
                                 <img :src="item.image" class="object-fit-cover rounded" />
                              </div>
                            </td>
                            <td class="fw-bold text-dark">{{ item.name }}</td>
                            <td class="fw-bold text-center">{{ item.qty }}</td>
                            <td class="text-secondary text-end">${{ item.price.toLocaleString() }}</td>
                            <td class="text-end fw-bold text-dark px-4">${{ (item.price * item.qty).toLocaleString() }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- 下方資訊區塊 -->
                    <div class="bg-white p-4">
                      <div class="row g-4 border-bottom border-light pb-4 mb-4">
                        <!-- 收件與配送 -->
                        <div class="col-md-7 border-end border-light pe-4 text-start">
                          <h6 class="fw-bold text-secondary mb-3 small"><i class="bi bi-truck me-2"></i>收件資訊</h6>
                          <div class="bg-light p-3 rounded-3 small">
                            <div class="mb-1"><span class="text-muted me-2">收件人:</span>{{ order.shipping.name }} ({{ order.shipping.phone }})</div>
                            <div><span class="text-muted me-2">地址:</span>{{ order.shipping.address }}</div>
                          </div>
                        </div>
                        <!-- 金額 -->
                        <div class="col-md-5 ps-md-4 text-end">
                           <div class="d-flex justify-content-between mb-2 small">
                             <span class="text-muted">付款方式</span>
                             <span class="fw-bold">{{ order.paymentMethod }}</span>
                           </div>
                           <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-light">
                             <span class="fw-bold text-dark">應付總額</span>
                             <span class="fs-4 fw-bolder text-danger">${{ order.total.toLocaleString() }}</span>
                           </div>
                        </div>
                      </div>

                      <!-- 歷史紀錄 -->
                      <div class="text-start mb-4">
                        <h6 class="fw-bold text-secondary small mb-3 text-uppercase"><i class="bi bi-clock-history me-2"></i>歷史紀錄</h6>
                        <div class="list-group list-group-flush border rounded-4 overflow-hidden">
                           <div v-for="(log, idx) in order.logs" :key="idx" class="list-group-item bg-light text-start py-3 border-bottom-0">
                             <div class="d-flex justify-content-between mb-1">
                               <span class="fw-bold text-dark small">{{ log.action }}</span>
                               <span class="text-muted smaller" style="font-size: 0.7rem;">{{ log.date }}</span>
                             </div>
                             <div class="text-secondary small">{{ log.note }}</div>
                           </div>
                        </div>
                      </div>

                      <!-- 操作按鈕 -->
                      <div class="d-flex justify-content-end gap-2">
                        <button v-if="order.status === '待付款'" @click="openReportModal(order)" class="btn btn-primary px-5 py-2 rounded-pill fw-bold borderSet shadow-sm">
                          下一步：匯款回報
                        </button>
                        <div v-else-if="order.status === '處理中'" class="p-2 px-4 border border-info rounded-pill text-info small fw-bold bg-info-subtle">
                          已收到回報，處理中...
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
             </div>
          </div>

          <!-- 空狀態 -->
          <div v-else class="text-center py-5">
            <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4 border" style="width: 100px; height: 100px;">
              <i class="bi bi-clipboard-x text-muted fs-1"></i>
            </div>
            <h5 class="text-secondary fw-bold">目前沒有符合此分類的訂單紀錄</h5>
            <router-link to="/products" class="btn btn-primary rounded-pill mt-3 px-4 fw-bold borderSet">去逛逛商品</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 匯款回報 Modal -->
    <div class="modal fade" id="reportModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg" v-if="currentOrder">
          <div class="modal-header bg-white border-bottom p-4">
            <h5 class="modal-title fw-bold text-dark"><i class="bi bi-megaphone me-2 text-primary"></i>通知賣家已匯款</h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" @click="closeModal"></button>
          </div>
          <div class="modal-body p-4 text-start">
            <form @submit.prevent="submitReport">
              <div class="mb-3 p-3 bg-light rounded-3 border">
                <div class="small text-secondary mb-1">訂單編號</div>
                <div class="fw-bold text-dark">{{ currentOrder.id }}</div>
              </div>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label small fw-bold text-secondary">匯款後 5 碼</label><input type="text" v-model="reportForm.lastFiveDigits" class="form-control rounded-3 py-2 border shadow-none" placeholder="12345" required maxlength="5"></div>
                <div class="col-md-6"><label class="form-label small fw-bold text-secondary">匯款金額</label><input type="number" v-model.number="reportForm.amount" class="form-control rounded-3 py-2 border shadow-none" required></div>
                <div class="col-12"><label class="form-label small fw-bold text-secondary">匯款日期</label><input type="date" v-model="reportForm.date" class="form-control rounded-3 py-2 border shadow-none" required></div>
                <div class="col-12"><label class="form-label small fw-bold text-secondary">備註 (選填)</label><textarea v-model="reportForm.note" class="form-control rounded-3 py-2 border shadow-none" rows="3"></textarea></div>
              </div>
              <div class="mt-4 pt-3 border-top d-flex gap-2">
                <button type="button" class="btn btn-light rounded-pill flex-grow-1 py-2 fw-bold" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary rounded-pill flex-grow-1 py-2 fw-bold borderSet shadow-sm">通知賣家</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import { store } from '../store.js';

export default {
  name: 'MoneyTransferView',
  data() {
    return {
      store,
      activeTab: 'pending',
      searchQuery: '',
      currentOrder: null,
      reportModal: null,
      reportForm: {
        lastFiveDigits: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        note: ''
      }
    };
  },
  computed: {
    tabTitle() {
      const titles = { pending: '待付款', processing: '處理中', all: '所有訂單', search: '搜尋訂單' };
      return titles[this.activeTab];
    },
    tabSubtitle() {
       switch(this.activeTab) {
         case 'pending': return `您有 ${this.pendingOrders.length} 筆訂單等待匯款`;
         case 'processing': return '賣家正在處理您已回報的訂單';
         case 'all': return '所有匯款轉帳訂單紀錄';
         default: return '輸入條件篩選您的歷史紀錄';
       }
    },
    pendingOrders() {
      return this.store.orders.filter(o => o.status === '待付款' && o.paymentMethod === '銀行轉帳');
    },
    displayOrders() {
      switch (this.activeTab) {
        case 'pending': return this.pendingOrders;
        case 'processing': return this.store.orders.filter(o => o.status === '處理中');
        case 'all': return this.store.orders.filter(o => o.paymentMethod === '銀行轉帳');
        case 'search':
          if (!this.searchQuery) return [];
          const q = this.searchQuery.toLowerCase();
          return this.store.orders.filter(o => o.id.toLowerCase().includes(q) && o.paymentMethod === '銀行轉帳');
        default: return [];
      }
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      if (status === '待付款') return 'bg-danger-subtle text-danger border border-danger-subtle';
      if (status === '處理中') return 'bg-info-subtle text-info border border-info-subtle';
      return 'bg-success-subtle text-success border border-success-subtle';
    },
    openReportModal(order) {
      this.currentOrder = order;
      this.reportForm.amount = order.total;
      if (!this.reportModal) {
        this.reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
      }
      this.reportModal.show();
    },
    closeModal() {
      if (this.reportModal) this.reportModal.hide();
    },
    submitReport() {
      if (this.currentOrder) {
        this.store.reportTransfer(this.currentOrder.id, { ...this.reportForm });
        this.closeModal();
        this.activeTab = 'processing';
        this.reportForm = { lastFiveDigits: '', amount: 0, date: new Date().toISOString().split('T')[0], note: '' };
      }
    }
  }
};
</script>

<style scoped>
#transferTab .nav-link { color: #6c757d; }
#transferTab .nav-link:hover { color: #212529; }

.smaller { font-size: 0.75rem; }
.scroll-hidden::-webkit-scrollbar { width: 6px; }
.scroll-hidden::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 4px; }

.animate-fade-in { animation: fadeIn 0.5s ease-out; }
.animate-slide-up { animation: slideUp 0.4s ease-out; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* 輸入框美化 (同步 OrderView) */
.form-control:focus, .form-check-input:focus {
  box-shadow: none;
  border-color: #8bb9fe !important;
}

/* 特殊的 checkbox 顏色 */
.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.accordion-button:not(.collapsed) { background-color: #f8f9fa; color: var(--bs-primary); }
.accordion-button::after { background-size: 0.8rem; }

.table th { font-weight: 600; background-color: #f8f9fa; border-bottom-width: 1px; }
.letter-spacing-1 { letter-spacing: 1px; }
</style>