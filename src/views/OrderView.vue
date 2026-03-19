<template>
  <div class="h-100 d-flex flex-column p-0">
    <!-- Header 標頭區塊 -->
    <div class="d-flex align-items-center mb-4 px-3 py-3 bg-white rounded-4 border shadow-sm">
      <h2 class="fw-bolder mb-0 text-dark" style="letter-spacing: 2px;">訂購紀錄</h2>
      <span class="text-primary fw-bold ms-3 mt-1" style="font-size: 1rem; letter-spacing: 1px;">ORDER HISTORY</span>
    </div>

    <!-- 內容區與左側選單 -->
    <div class="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden gap-4">
      
      <!-- 左側/上方 標籤列 (使用自訂 BorderSet 按鈕) -->
      <div class="flex-shrink-0 p-3 bg-white-50 rounded-4" style="min-width: 200px; background-color: rgba(102, 102, 102, 0.03);">
        <ul class="nav flex-row flex-md-column gap-3" id="orderTab" role="tablist">
          <!-- 待付款 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold w-100 py-3 text-center borderSet bg-white rounded-4 shadow-none" id="pending-tab" data-bs-toggle="pill" data-bs-target="#pending" type="button" role="tab">待付款</button>
          </li>
          <!-- 處理中 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet bg-white rounded-4 shadow-none" id="processing-tab" data-bs-toggle="pill" data-bs-target="#processing" type="button" role="tab">處理中</button>
          </li>
          <!-- 所有訂單 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet bg-white rounded-4 shadow-none" id="all-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab">所有訂單</button>
          </li>
          <!-- 搜尋訂單 -->
           <li class="nav-item flex-sm-grow-1" role="presentation">
             <button @click="onSearchTabClick" class="nav-link w-100 rounded-pill-end borderSet-link py-2" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">
               <i class="bi bi-search me-1"></i>搜尋
             </button>
           </li>
        </ul>
      </div>

      <!-- 右側/下方 詳細內容區塊 -->
      <div class="tab-content flex-grow-1 overflow-auto bg-white p-4 p-md-5 rounded-4 border-0 position-relative" id="orderTabContent">
        
        <!-- ==================== 1. 待付款 ==================== -->
        <div class="tab-pane fade show active h-100" id="pending" role="tabpanel">
            <div class="d-flex align-items-baseline mb-4">
              <h3 class="fw-bolder mb-0 me-3 text-dark">待付款</h3>
              <span v-if="pendingOrders.length > 0" class="text-secondary small fw-bold">您有 {{ pendingOrders.length }} 筆訂單等待付款</span>
              <span v-else class="text-secondary small fw-bold">目前沒有待付款訂單</span>
            </div>
           
           <!-- 使用 v-for 產生可折疊的待付款清單 -->
           <div class="accordion d-flex flex-column gap-4" id="pendingAccordion">
             <div class="accordion-item border rounded-4 shadow-sm overflow-hidden" v-for="(order, index) in pendingOrders" :key="order.id">
               
               <!-- 標題列 -->
               <div class="accordion-header" :id="'pendingHeading' + index">
                 <button class="accordion-button bg-light py-3 px-4 shadow-none border-0 collapsed" 
                         type="button" 
                         data-bs-toggle="collapse" 
                         :data-bs-target="'#pendingCollapse' + index" 
                         aria-expanded="false" 
                         :aria-controls="'pendingCollapse' + index">
                   <div class="d-flex w-100 justify-content-between align-items-center pe-3 flex-wrap gap-2">
                     <div>
                       <span class="fw-bold text-secondary me-3">訂單編號：<span class="text-dark">{{ order.id }}</span></span>
                       <span class="text-muted small d-none d-md-inline-block">訂購日期：{{ order.date }}</span>
                     </div>
                     <span class="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">等待付款</span>
                   </div>
                 </button>
               </div>
               
               <!-- 折疊內容 (商品表格與結帳) -->
               <div :id="'pendingCollapse' + index" 
                    class="accordion-collapse collapse" 
                    :aria-labelledby="'pendingHeading' + index" 
                    data-bs-parent="#pendingAccordion">
                 <div class="accordion-body p-0">
                   
                   <!-- 商品表格 -->
                   <div class="table-responsive">
                     <table class="table table-hover align-middle mb-0 text-nowrap border-bottom border-light">
                       <thead class="bg-white text-secondary small">
                         <tr>
                           <th class="py-3 px-4 fw-normal border-bottom-0" style="width: 80px;">商品圖片</th>
                           <th class="py-3 fw-normal border-bottom-0">商品名稱</th>
                           <th class="py-3 fw-normal border-bottom-0 text-center">數量</th>
                           <th class="py-3 fw-normal border-bottom-0 text-end">單價</th>
                           <th class="py-3 px-4 fw-normal border-bottom-0 text-end">小計</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr v-for="item in order.items" :key="item.name">
                           <td class="px-4 py-3">
                             <div class="ratio ratio-1x1 bg-light rounded border border-light" style="width: 50px; height: 50px;">
                                <img v-if="item.image" :src="item.image" class="object-fit-cover rounded" />
                                <i v-else class="bi bi-image text-secondary m-auto fs-5"></i>
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

                   <!-- 收件與結算資訊塊 -->
                   <div class="bg-white p-4">
                     <div class="row g-4 align-items-end">
                       <!-- 收件資訊 -->
                       <div class="col-md-7 border-end border-light pe-4">
                         <h6 class="fw-bold text-secondary mb-3 small"><i class="bi bi-box-seam me-2"></i>收件資訊</h6>
                         <div class="d-flex flex-wrap gap-4 text-dark small bg-light p-3 rounded-3">
                           <div><span class="text-muted me-2">收件人:</span>{{ order.shipping.name }}</div>
                           <div><span class="text-muted me-2">電話:</span>{{ order.shipping.phone }}</div>
                           <div class="w-100 mt-1"><span class="text-muted me-2">地址:</span>{{ order.shipping.address }}</div>
                         </div>
                       </div>
                       <!-- 金額結算 -->
                       <div class="col-md-5 ps-md-4">
                          <div class="d-flex justify-content-between mb-2 small">
                            <span class="text-muted">商品小計</span>
                            <span class="fw-bold">${{ order.subtotal.toLocaleString() }}</span>
                          </div>
                          <div v-if="order.discount" class="d-flex justify-content-between mb-2 small">
                            <span class="text-muted">帳戶抵扣</span>
                            <span class="fw-bold text-danger">- ${{ order.discount.toLocaleString() }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2 small">
                            <span class="text-muted">運費</span>
                            <span class="fw-bold">${{ order.shippingFee.toLocaleString() }}</span>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-light">
                            <span class="fw-bold text-dark">訂單總計</span>
                            <span class="fs-4 fw-bolder text-danger">${{ order.total.toLocaleString() }}</span>
                          </div>
                          <button class="btn btn-primary w-100 py-2 mt-3 fw-bold rounded-pill borderSet shadow-none">
                            <i class="bi bi-credit-card me-2"></i> 前往付款
                          </button>
                       </div>
                     </div>
                   </div>

                 </div>
               </div>
             </div>
           </div>

        </div>

        <!-- ==================== 2. 處理中 ==================== -->
        <div class="tab-pane fade h-100" id="processing" role="tabpanel">
           <div class="d-flex align-items-baseline mb-4">
             <h3 class="fw-bolder mb-0 me-3 text-dark">處理中</h3>
             <span class="text-muted small">訂單已成立，我們正在為您準備商品</span>
           </div>
           
           <div class="table-responsive mb-4 border rounded-3">
             <table class="table table-hover align-middle mb-0 text-nowrap">
               <thead class="table-light text-secondary small">
                 <tr>
                   <th class="py-3 px-4">訂單編號</th>
                   <th class="py-3">商品圖片</th>
                   <th class="py-3">狀態</th>
                   <th class="py-3">數量</th>
                   <th class="py-3 px-4 text-end">總付金額</th>
                 </tr>
               </thead>
               <tbody v-if="processingOrders.length > 0">
                 <tr v-for="order in processingOrders" :key="order.id">
                   <td class="px-4 fw-bold text-primary">{{ order.id }}</td>
                   <td class="py-3" style="width: 100px;">
                     <div class="ratio ratio-1x1 bg-light rounded border border-light" style="width: 60px; height: 60px;">
                        <img v-if="order.items[0]?.image" :src="order.items[0].image" class="object-fit-cover rounded" />
                        <i v-else class="bi bi-image text-secondary m-auto fs-3"></i>
                     </div>
                   </td>
                   <td><span class="badge bg-secondary text-white px-3 py-2 rounded-pill">{{ order.status }}</span></td>
                   <td class="fw-bold text-dark">{{ order.items.length }}</td>
                   <td class="text-end fw-bold text-dark px-4">${{ order.total.toLocaleString() }}</td>
                 </tr>
               </tbody>
               <tbody v-else>
                 <tr>
                    <td colspan="5" class="text-center py-5 text-muted">目前沒有處理中的訂單</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        <!-- ==================== 3. 所有訂單 ==================== -->
        <div class="tab-pane fade h-100" id="all" role="tabpanel">
           <div class="d-flex align-items-baseline mb-4">
             <h3 class="fw-bolder mb-0 me-3 text-dark">所有訂單</h3>
             <span class="text-muted small">您過去的每一筆購買紀錄都能在此找到</span>
           </div>

           <div class="accordion d-flex flex-column gap-3" id="ordersAccordion">
             <!-- 使用 v-for 產生多筆有折疊效果的訂單卡片 -->
             <div class="accordion-item border rounded-4 shadow-sm overflow-hidden" 
                  v-for="(order, index) in allOrders" :key="order.id"
                  :class="{'opacity-75': order.status === '已取消'}">
               
               <!-- 點擊可折疊的標題列 -->
               <div class="accordion-header" :id="'heading' + index">
                 <button class="accordion-button bg-light py-3 px-4 shadow-none border-0 collapsed" 
                         type="button" 
                         data-bs-toggle="collapse" 
                         :data-bs-target="'#collapse' + index" 
                         aria-expanded="false" 
                         :aria-controls="'collapse' + index">
                   <div class="d-flex w-100 justify-content-between align-items-center pe-3 flex-wrap gap-2">
                     <div>
                       <span class="fw-bold text-secondary me-2">訂單編號：<span class="text-dark">{{ order.id }}</span></span>
                       <span class="small text-muted d-none d-md-inline-block">{{ order.date }}</span>
                     </div>
                     <span class="badge px-3 py-2 rounded-pill shadow-sm"
                           :class="{
                             'bg-success': order.status === '已完成' || order.status === '已出貨',
                             'bg-warning text-dark': order.status === '處理中' || order.status === '待出貨',
                             'bg-danger': order.status === '已取消',
                             'bg-secondary': order.status === '已退款'
                           }">
                       {{ order.status }}
                     </span>
                   </div>
                 </button>
               </div>

               <!-- 折疊內容區塊 (商品明細) -->
               <div :id="'collapse' + index" 
                    class="accordion-collapse collapse" 
                    :aria-labelledby="'heading' + index" 
                    data-bs-parent="#ordersAccordion">
                 <div class="accordion-body p-0">
                   <div class="list-group list-group-flush border-top border-light">
                      <!-- 每一項商品 -->
                      <div class="list-group-item p-4 d-flex align-items-center border-0" v-for="item in order.items" :key="item.name">
                        <div class="ratio ratio-1x1 bg-light rounded border border-light me-3 flex-shrink-0" style="width: 70px; height: 70px;">
                           <img v-if="item.image" :src="item.image" class="object-fit-cover rounded" />
                           <i v-else class="bi bi-image text-secondary m-auto fs-3"></i>
                        </div>
                        <div class="flex-grow-1">
                           <div class="fw-bold text-dark fs-6 mb-1">{{ item.name }}</div>
                           <div class="text-secondary small">數量: {{ item.qty }} | 單價: ${{ item.price }}</div>
                        </div>
                        <div class="text-end ps-3">
                           <div class="fw-bolder fs-5 text-dark" :class="{'text-decoration-line-through text-muted': order.status === '已取消'}">
                             ${{ item.qty * item.price }}
                           </div>
                        </div>
                      </div>
                   </div>
                   
                   <!-- 金額結算與動作按鈕 -->
                   <div class="bg-light p-3 px-4 d-flex justify-content-between align-items-center border-top border-light">
                     <div>
                       <span class="text-muted small me-2">訂單總計</span>
                       <span class="fs-4 fw-bolder text-danger" :class="{'text-decoration-line-through text-muted': order.status === '已取消'}">
                         ${{ order.total }}
                       </span>
                     </div>
                     <div v-if="order.status !== '已取消' && order.status !== '已退款'">
                       <button class="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold shadow-none">再買一次</button>
                     </div>
                   </div>
                   
                 </div>
               </div>
             </div>
           </div>
        </div>

        <!-- ==================== 4. 搜尋 ==================== -->
        <div class="tab-pane fade h-100" id="search" role="tabpanel">
           <!-- 擺擺 駐守區域 - 極簡手繪版 -->
           <div class="mb-5 p-4 rounded-4 bg-glass border border-white position-relative overflow-hidden shadow-sm sketch-paper">
             <AssistantAgent isStationed />
             <!-- 裝飾背景 -->
             <div class="position-absolute top-0 end-0 p-3 opacity-10 fs-1 rotate-15 d-none d-md-block" style="font-size: 5rem !important;">📚</div>
           </div>
           
                 <!-- 檢索終端 (智慧圖書館主題 - 與 MoneyTransferView 同步) -->
           <div class="row g-4 border border-white rounded-4 p-4 bg-glass mx-0 mb-4 shadow-sm position-relative overflow-hidden">
             <!-- 背景細微裝飾 -->
             <div class="position-absolute top-0 end-0 p-3 opacity-10 fs-1 rotate-15 d-none d-md-block">📖</div>
             
             <div class="col-12 border-bottom border-light pb-2 mb-2 text-start">
                  <h6 class="fw-bold text-dark mb-0"><i class="bi bi-journal-bookmark me-2 text-primary"></i>檢索案件內容</h6>
             </div>
             
             <!-- 欄位設計 -->
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂單編號 (索引號)</label>
               <input type="text" class="form-control border-white py-2 bg-white-50 shadow-none rounded-3" placeholder="例如: ORD-001">
             </div>
             
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">商品名稱 (關鍵字)</label>
               <input type="text" class="form-control border-white py-2 bg-white-50 shadow-none rounded-3" placeholder="關鍵字...">
             </div>
             
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂貨起始日期</label>
               <input type="date" class="form-control border-white py-2 bg-white-50 shadow-none rounded-3">
             </div>
             <div class="col-md-6 text-start">
               <label class="form-label text-secondary small fw-bold">訂貨結束日期</label>
               <input type="date" class="form-control border-white py-2 bg-white-50 shadow-none rounded-3">
             </div>

             <!-- 進階典藏篩選 (整合進主卡片) -->
             <div class="col-12 mt-4 pt-3 border-top border-light">
               <div class="d-flex flex-wrap gap-4">
                 <div class="form-check">
                   <input class="form-check-input border-secondary" type="checkbox" id="outofstockCheck">
                   <label class="form-check-label text-dark fw-bold small" for="outofstockCheck">包含絕版品 (斷貨)</label>
                 </div>
                 <div class="form-check">
                   <input class="form-check-input border-secondary" type="checkbox" id="onlyMatchCheck" checked>
                   <label class="form-check-label text-dark fw-bold small" for="onlyMatchCheck">精確檢索 (完全符合)</label>
                 </div>
               </div>
             </div>

             <!-- 操作按鈕 (Pill 造型同步) -->
             <div class="col-12 text-end mt-4">
               <button class="btn btn-outline-secondary px-4 py-2 fw-bold rounded-pill shadow-none me-2">重置</button>
               <button class="btn btn-primary px-5 py-2 fw-bold rounded-pill shadow-sm">
                  <i class="bi bi-search me-2"></i>開始調閱資料
               </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 樣式已遷移至全域 style.css */


/* 針對左側導覽重寫 Bootstrap Nav 樣式 */
#orderTab .nav-link {
  color: #6c757d;     
}
#orderTab .nav-link:hover {
  color: #212529;
}


/* 隱藏原生捲軸但保留滾動功能 (針對右側內容區) */
#orderTabContent::-webkit-scrollbar {
  width: 6px;
}
#orderTabContent::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}

/* 輸入框美化 */
.form-control:focus, .form-check-input:focus {
  box-shadow: none;
  border-color: #8bb9fe !important;
}

/* 特殊的 checkbox 顏色 */
.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.sketch-paper {
  background-color: #fcfaf2;
  background-image: 
    radial-gradient(#e1dec9 1px, transparent 0),
    linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
  background-size: 3px 3px, 20px 20px, 20px 20px; /* Grain + subtle grid */
  border: 1px solid #dcd8c0 !important;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.02);
  padding-top: 2.5rem !important;
}

/* 讓表格內文看起來更清爽乾淨 */
.table th {
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: #f8f9fa;
  border-bottom-width: 1px;
}
.table td {
  vertical-align: middle;
}

/* Glassmorphism Library Theme */
.bg-glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.bg-glass-dark {
  background: rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.librarian-station-bg {
  width: 60px;
  height: 60px;
  background: var(--bs-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 18px;
  transform: rotate(-10deg);
  box-shadow: 4px 4px 15px rgba(0,0,0,0.1);
}

.rotate-15 {
  transform: rotate(15deg);
}

.bg-white-50 {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
</style>

<script>
import { store } from '../store.js';
import AssistantAgent from '../components/AssistantAgent.vue';

export default {
  name: 'OrderView',
  components: {
    AssistantAgent
  },
  data() {
    return {
      store,
    };
  },
  computed: {
    pendingOrders() {
      return this.store.orders.filter(order => order.status === '待付款');
    },
    processingOrders() {
      return this.store.orders.filter(order => order.status === '處理中' || order.status === '待出貨' || order.status === '已出貨');
    },
    allOrders() {
      return this.store.orders;
    }
  },
  methods: {
    onSearchTabClick() {
      setTimeout(() => {
        this.store.showAssistantMessage("管理員 擺擺 已就位！👓📚 請輸入關鍵字，我將為您翻閱卷宗...", 'processing', 6000);
      }, 500);
    }
  },
  mounted() {
    // 進入頁面後，主動檢查狀態並給予提示
    setTimeout(() => {
      const pendingCount = this.pendingOrders.length;
      const processingCount = this.processingOrders.length;

      if (pendingCount > 0) {
        this.store.showAssistantMessage(`歡迎回來！您目前有 ${pendingCount} 筆訂單正在等待付款，需要我帶您去確認資訊嗎？🦊`, 'idle', 6000, {
          label: "查看待付款訂單 💰",
          callback: () => {
            const el = document.getElementById('pending-tab');
            if (el) el.click();
            this.store.showAssistantMessage("點擊下方的訂單編號，就能看到匯款與配送細節囉！🦊✨", 'success', 5000);
          }
        });
      } else if (processingCount > 0) {
        this.store.showAssistantMessage(`您有 ${processingCount} 筆訂單正在處理中，我也在同步追蹤進度，請放心交給我！🦊📦`, 'success', 5000);
      } else {
        this.store.showAssistantMessage("這裡是訂購紀錄，您所有的購買歷史 擺擺 都會為您細心守護！🛡️", 'idle', 5000);
      }
    }, 1500);
  }
}
</script>