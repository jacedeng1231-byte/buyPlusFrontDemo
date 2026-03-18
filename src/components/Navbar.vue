<template>
  <div
    class="d-flex flex-column h-100 shadow-sm transition-all navbar-container"
    :class="{ 'collapsed-sidebar': store.isSidebarCollapsed }"
  >
    <!-- 收折切換按鈕 (僅電腦版) -->
    <div class="d-none d-md-flex justify-content-end p-2 border-bottom flex-shrink-0">
      <button
        @click="store.toggleSidebar()"
        class="btn btn-light btn-sm rounded-circle border shadow-sm shadow-none p-0 d-flex align-items-center justify-content-center"
        style="width: 28px; height: 28px"
      >
        <i
          class="bi"
          :class="store.isSidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"
        ></i>
      </button>
    </div>

    <!-- 登入後的標頭資訊 -->
    <div
      v-if="store.isLoggedIn"
      class="card-header bg-body border-bottom py-3 animate-fade-in flex-shrink-0"
    >
      <!-- 使用者資訊 -->
      <div 
        class="d-flex align-items-center mb-3 justify-content-center justify-content-md-start"
        :class="{ 'flex-column': store.isSidebarCollapsed && !isMobile }"
      >
        <!-- avatar -->
        <div class="position-relative" :class="{ 'me-md-3': !store.isSidebarCollapsed }">
          <img
            :src="store.user.avatar"
            class="rounded-circle border border-3 transition-all"
            :width="store.isSidebarCollapsed ? '35' : '60'"
            :height="store.isSidebarCollapsed ? '35' : '60'"
          />
          <!-- provider icon -->
          <i
            v-if="store.user.provider"
            class="bi position-absolute bottom-0 end-0 rounded-circle text-white p-1 d-flex align-items-center justify-content-center"
            :class="{
              'bi-facebook bg-primary': store.user.provider === 'facebook',
              'bi-line bg-success': store.user.provider === 'line',
              'bi-telegram bg-info': store.user.provider === 'telegram'
            }"
            style="font-size: 8px; width: 16px; height: 16px;"
          ></i>
        </div>

        <!-- user info -->
        <div v-if="!store.isSidebarCollapsed || isMobile" class="animate-fade-in ms-2 ms-md-0">
          <div class="fw-bold text-start text-truncate" style="max-width: 140px;">
            {{ store.user.name }}
          </div>
          <div class="text-muted small text-start text-truncate" style="max-width: 140px;">
            ID：{{ store.user.id }}
          </div>
        </div>
        <!-- user info (Desktop Collapsed) -->
        <div v-else class="animate-fade-in mt-2 w-100">
          <div class="fw-bold text-center text-truncate small px-1">
            {{ store.user.name }}
          </div>
          <div class="text-muted smaller text-center text-truncate px-1">
            {{ store.user.id }}
          </div>
        </div>
      </div>

      <!-- 金額區 -->
      <div v-if="!store.isSidebarCollapsed || isMobile" class="row text-center border-top pt-3 animate-fade-in mx-0 px-1">
        <div class="col border-end px-1">
          <div class="text-muted x-small">待付</div>
          <div class="fs-6 text-danger fw-bold">${{ store.pendingPaymentTotal.toLocaleString() }}</div>
        </div>
        <div class="col px-1">
          <div class="text-muted x-small">帳戶</div>
          <div class="fs-6 fw-bold">$0</div>
        </div>
      </div>
      <!-- 收折時的小圖示 (Desktop only) -->
      <div v-else class="text-center border-top pt-2 animate-fade-in d-none d-md-block">
        <div class="text-danger fw-bold x-small">${{ store.pendingPaymentTotal }}</div>
      </div>
    </div>

    <!-- 未登入的引導區塊 -->
    <div v-else class="card-header bg-body border-bottom py-3 animate-fade-in px-2 flex-shrink-0">
      <div v-if="!store.isSidebarCollapsed || isMobile" class="text-center mb-3">
        <div class="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width: 50px; height: 50px; background-color: rgba(var(--bs-primary-rgb), 0.1) !important;">
          <i class="bi bi-person-badge fs-3"></i>
        </div>
        <h6 class="fw-bold text-dark mb-0">歡迎登入</h6>
      </div>
      <div v-else class="text-center mb-2 d-none d-md-block">
        <i class="bi bi-person-badge fs-4 text-primary"></i>
      </div>

      <!-- 登入按鈕組 -->
      <div class="d-flex flex-column gap-2 px-1 px-md-2 align-items-center" :class="{ 'px-0': store.isSidebarCollapsed }">
        <button
          v-for="p in ['facebook', 'line', 'telegram']"
          :key="p"
          @click="store.login(p); hideModal()"
          class="btn d-flex align-items-center justify-content-center rounded-pill shadow-sm border-0 transition-all login-btn-item"
          :class="[`btn-${p}`, store.isSidebarCollapsed ? 'p-0 rounded-circle collapsed-btn' : 'w-100 py-2 px-3']"
          @mouseenter="showTooltip($event, `${p.toUpperCase()} 登入`)"
          @mouseleave="hideTooltip"
        >
          <i :class="[`bi bi-${p} fs-5`, { 'me-2': !store.isSidebarCollapsed && !isMobile }]"></i>
          <span v-if="!store.isSidebarCollapsed || isMobile" class="small fw-bold">{{ p.charAt(0).toUpperCase() + p.slice(1) }} 登入</span>
        </button>
      </div>
    </div>

    <!-- 內容捲動區 -->
    <div class="card-body px-0 py-3 d-flex flex-column flex-grow-1 overflow-auto text-center custom-scrollbar shadow-none">
      <!-- 登入後選單 -->
      <div v-if="store.isLoggedIn" class="row gx-2 gy-3 mb-4 border-bottom border-2 pb-3 mx-0 flex-shrink-0 animate-fade-in" 
           :class="store.isSidebarCollapsed ? 'row-cols-1' : 'row-cols-3'">
        <div class="col" v-for="item in menuList" :key="item.title">
          <template v-if="item.action">
            <button @click="handleMenuAction(item.action)" class="rounded-pill py-2 text-decoration-none w-100 d-flex align-items-center justify-content-center borderSet text-dark transition-all bg-white h-100" @mouseenter="showTooltip($event, item.title)" @mouseleave="hideTooltip">
              <i :class="[item.icon, { 'd-md-inline': store.isSidebarCollapsed }]" class="d-none"></i>
              <span v-if="!store.isSidebarCollapsed || isMobile" class="small d-none d-md-inline">{{ item.title }}</span>
              <span class="d-md-none x-small">{{ item.title }}</span>
            </button>
          </template>
          <router-link v-else :to="item.link" @click="hideModal" class="rounded-pill py-2 text-decoration-none w-100 d-flex align-items-center justify-content-center borderSet text-dark transition-all h-100" active-class="_none" :class="{ 'custom-active': $route.path === item.link }" @mouseenter="showTooltip($event, item.title)" @mouseleave="hideTooltip">
            <i :class="[item.icon, { 'd-md-inline': store.isSidebarCollapsed }]" class="d-none"></i>
            <span v-if="!store.isSidebarCollapsed || isMobile" class="small d-none d-md-inline">{{ item.title }}</span>
            <span class="d-md-none x-small">{{ item.title }}</span>
          </router-link>
        </div>
      </div>

      <!-- 搜尋 -->
      <div v-if="!store.isSidebarCollapsed || isMobile" class="input-group mb-4 px-2 w-100 animate-fade-in flex-shrink-0">
        <input type="text" class="form-control rounded-pill-start borderSet py-1 x-small" placeholder="搜尋..." />
        <button @click="hideModal" class="btn btn-secondary rounded-pill-end borderSet px-3 py-1" type="button"><i class="bi bi-search"></i></button>
      </div>
      <div v-else class="mb-4 text-center animate-fade-in d-none d-md-block flex-shrink-0">
        <button @click="hideModal" class="btn btn-white borderSet rounded-circle p-0 d-flex align-items-center justify-content-center mx-auto shadow-sm" style="width: 36px; height: 36px;" @mouseenter="showTooltip($event, '搜尋商品')" @mouseleave="hideTooltip"><i class="bi bi-search"></i></button>
      </div>

      <!-- 分類列表 -->
      <div class="row gx-2 gy-3 mb-4 mx-0 flex-grow-1 align-content-start" 
           :class="store.isSidebarCollapsed ? 'row-cols-1' : 'row-cols-2'">
        <div class="col" v-for="item in shopList" :key="item.title">
          <router-link :to="item.link" @click="hideModal" class="rounded rounded-4 py-2 text-decoration-none w-100 d-flex align-items-center justify-content-center borderSet text-dark transition-all h-100" active-class="_none" :class="{ 'custom-active': isCategoryActive(item.link.query.category) }" @mouseenter="showTooltip($event, item.title)" @mouseleave="hideTooltip">
            <div class="d-flex flex-column align-items-center w-100">
              <i :class="[item.icon, { 'mb-1': !store.isSidebarCollapsed || isMobile }]" class="fs-5"></i>
              <span v-if="!store.isSidebarCollapsed || isMobile" class="x-small text-truncate w-100 px-1">{{ item.title }}</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Footer (公告) -->
      <div class="mt-auto px-2 pb-3 flex-shrink-0">
        <router-link to="/vulletin" @click="hideModal" class="rounded rounded-4 py-2 text-decoration-none w-100 d-flex align-items-center justify-content-center borderSet text-dark" @mouseenter="showTooltip($event, '賣家公告')" @mouseleave="hideTooltip">
          <i class="bi bi-megaphone" :class="{ 'me-2': !store.isSidebarCollapsed || isMobile }"></i>
          <span v-if="!store.isSidebarCollapsed || isMobile" class="small fw-bold">賣家公告 <span class="badge bg-danger rounded-pill x-small">new</span></span>
        </router-link>
      </div>
    </div>

    <!-- 基於 JS 的全域固定 Tooltip -->
    <div v-if="hoveredItem" class="js-tooltip animate-tooltip-fade-in" :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }">
      {{ hoveredItem }}
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      isMobile: false,
      menuList: [
        { title: "逛逛賣場", link: "/products", icon: "bi-shop" },
        { title: "會員中心", link: "/member", icon: "bi-person" },
        { title: "訂購紀錄", link: "/order", icon: "bi-list-check" },
        { title: "匯款回報", link: "/money-transfer", icon: "bi-cash-coin" },
        { title: "我的收藏", link: "/favorite", icon: "bi-heart" },
        { title: "會員登出", action: "logout", icon: "bi-box-arrow-right" },
      ],
      shopList: [
        { title: "所有商品", link: { path: "/products", query: { category: "全部商品" } }, number: 33, icon: "bi-grid" },
        { title: "特價出清", link: { path: "/products", query: { category: "特價出清" } }, number: 17, icon: "bi-percent" },
        { title: "大大武花", link: { path: "/products", query: { category: "大大武花" } }, number: 16, icon: "bi-flower1" },
        { title: "零食", link: { path: "/products", query: { category: "零食" } }, number: 0, icon: "bi-egg" },
        { title: "飲品", link: { path: "/products", query: { category: "飲品" } }, number: 0, icon: "bi-cup-straw" },
        { title: "寵愛專區", link: { path: "/products", query: { category: "寵愛專區" } }, number: 0, icon: "bi-stars" },
      ],
      hoveredItem: null,
      tooltipTop: 0,
      tooltipLeft: 0,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  unmounted() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    },
    isCategoryActive(cat) {
      const currentCat = this.$route.query.category || "全部商品";
      return this.$route.path === "/products" && currentCat === cat;
    },
    handleMenuAction(action) {
      if (action === "logout") {
        this.store.logout();
        this.hideModal();
        this.$router.push("/");
      }
    },
    hideModal() {
      // 發送事件通知 App.vue 關閉選單
      this.$emit('close-menu');
    },
    showTooltip(event, title) {
      if (!this.store.isSidebarCollapsed || this.isMobile) return;
      const rect = event.currentTarget.getBoundingClientRect();
      this.hoveredItem = title;
      this.tooltipTop = rect.top + rect.height / 2;
      this.tooltipLeft = rect.right + 12;
    },
    hideTooltip() {
      this.hoveredItem = null;
    },
  },
};
</script>

<style scoped>
.navbar-container {
  min-width: 0;
  background-color: #fff;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rounded-pill-start {
  border-top-left-radius: 50rem !important;
  border-bottom-left-radius: 50rem !important;
}
.rounded-pill-end {
  border-top-right-radius: 50rem !important;
  border-bottom-right-radius: 50rem !important;
}

.x-small { font-size: 0.65rem; }

/* 側邊欄收折效果 - 僅限桌機 */
@media (min-width: 768px) {
  .collapsed-sidebar {
    width: 100% !important;
  }
  
  .collapsed-btn {
    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
  }

  .collapsed-sidebar .me-2 {
    margin: 0 !important;
  }
}

/* 捲動軸美化 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}

/* 導航狀態 */
.borderSet.custom-active {
  color: var(--bs-primary) !important;
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
  border-color: var(--bs-primary) !important;
  font-weight: bold;
}

/* 品牌色彩 */
.btn-facebook { background-color: #1877f2; color: #fff; }
.btn-line { background-color: #06c755; color: #fff; }
.btn-telegram { background-color: #0088cc; color: #fff; }

.btn-facebook:hover, .btn-line:hover, .btn-telegram:hover {
  filter: brightness(0.9);
  color: #fff;
  transform: translateY(-1px);
}

/* 基於 JS 的 Tooltip 樣式 */
.js-tooltip {
  position: fixed;
  background: rgba(33, 37, 41, 0.95);
  color: #fff;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  transform: translateY(-50%);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.js-tooltip::before {
  content: "";
  position: absolute;
  left: -4px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent rgba(33, 37, 41, 0.95) transparent transparent;
}

@keyframes tooltipFadeIn {
  from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
  to { opacity: 1; transform: translateY(-50%) translateX(0); }
}

.animate-tooltip-fade-in {
  animation: tooltipFadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>