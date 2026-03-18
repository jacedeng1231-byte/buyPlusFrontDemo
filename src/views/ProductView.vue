<template>
  <!-- MODAL_SYSTEM_v2_WINDOW_BOOTSTRAP_READY -->
  <div class="h-100 d-flex flex-column overflow-hidden p-0">
    
    <!-- 頂部搜尋與過濾列 -->
    <div class="bg-white rounded-4 border shadow-sm p-3 mb-4 animate-fade-in">
      <div class="row g-3 align-items-center">
        <!-- 搜尋框 -->
        <div class="col-md-6 col-lg-7">
          <div class="input-group shadow-none rounded-pill overflow-hidden border borderSet-light">
            <span class="input-group-text bg-white border-0 ps-4">
              <i class="bi bi-search text-muted"></i>
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              class="form-control border-0 py-2 shadow-none" 
              placeholder="搜尋商品名稱 / 關鍵字..."
            >
          </div>
        </div>
        <!-- 排序選單 -->
        <div class="col-md-6 col-lg-5">
          <div class="d-flex gap-2">
            <select v-model="sortBy" class="form-select rounded-pill border borderSet-light py-2 shadow-none cursor-pointer">
              <option value="newest">最新上架</option>
              <option value="priceLow">價格：由低到高</option>
              <option value="priceHigh">價格：由高到低</option>
              <option value="sales">熱銷排行</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 分類導覽列 -->
    <div class="mb-4 animate-fade-in" style="animation-delay: 0.1s;">
      <div class="d-flex gap-2 overflow-auto pb-2 scroll-hide" id="categoryTabs">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="changeCategory(cat)"
          class="btn rounded-pill px-4 py-2 fw-bold text-nowrap transition-all shadow-none"
          :class="selectedCategory === cat ? 'btn-primary borderSet' : 'btn-light border borderSet-light text-secondary bg-white'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 商品網格區域 -->
    <div class="flex-grow-1 overflow-auto scroll-area px-1 py-1">
      <!-- 搜尋/過濾結果 -->
      <div v-if="filteredProducts.length > 0" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 mb-4">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="col animate-slide-up"
        >
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card transition-all cursor-pointer bg-white">
            <!-- 商品圖片 -->
            <div class="position-relative overflow-hidden aspect-ratio-1">
              <img :src="product.image" class="card-img-top object-fit-cover h-100 w-100 transition-transform" :alt="product.name">
              <!-- 快捷按鈕 -->
              <div class="product-overlay d-flex flex-column align-items-center justify-content-center gap-2 px-3">
                <!-- 規格選擇 (僅在有多規格時顯示) -->
                <div v-if="product.specs" class="w-100 mb-2 p-2 bg-white rounded-3 shadow-sm border animate-fade-in text-start">
                  <div v-if="product.specs.sizes" class="mb-2">
                    <div class="small fw-bold text-dark mb-1" style="font-size: 10px;">尺寸：</div>
                    <div class="d-flex flex-wrap gap-1">
                      <button 
                        v-for="s in product.specs.sizes" :key="s"
                        @click.stop="product.selectedSize = s"
                        class="btn btn-sm rounded-1 border py-0 px-2 fw-bold"
                        :class="product.selectedSize === s ? 'btn-primary border-primary' : 'btn-light text-secondary'"
                        style="font-size: 11px;"
                      >
                        {{ s }}
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="product.specs.colors">
                    <div class="small fw-bold text-dark mb-1" style="font-size: 10px;">顏色：</div>
                    <div class="d-flex flex-wrap gap-1">
                      <button 
                        v-for="c in product.specs.colors" :key="c"
                        @click.stop="product.selectedColor = c"
                        class="btn btn-sm rounded-1 border py-0 px-2 fw-bold"
                        :class="product.selectedColor === c ? 'btn-info text-white border-info' : 'btn-light text-secondary'"
                        style="font-size: 11px;"
                      >
                        {{ c }}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="d-flex gap-2 w-100">
                  <button 
                    @click.stop="handleAddToCart(product)"
                    class="btn btn-primary rounded-pill flex-grow-1 py-1 py-md-2 fw-bold borderSet shadow-sm btn-sm"
                  >
                    <i class="bi bi-cart-plus-fill me-md-1"></i>
                    <span class="d-none d-md-inline lh-1">加入</span>
                  </button>
                  <!-- 眼睛圖示：詳情彈窗 -->
                  <button 
                    @click.stop="openProductModal(product)"
                    class="btn btn-white rounded-pill p-2 shadow-sm border borderSet-light aspect-ratio-1 d-flex align-items-center justify-content-center bg-white"
                    style="width: 38px; height: 38px;"
                    title="商品詳情"
                  >
                    <i class="bi bi-eye text-primary"></i>
                  </button>
                  <button 
                    @click.stop="store.toggleFavorite(product)"
                    class="btn btn-white rounded-pill p-2 shadow-sm border borderSet-light aspect-ratio-1 d-flex align-items-center justify-content-center bg-white"
                    style="width: 38px; height: 38px;"
                  >
                    <i :class="store.isFavorite(product.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart text-secondary'"></i>
                  </button>
                </div>
              </div>
              <!-- 標籤 -->
              <div class="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
                <span v-if="product.isNew" class="badge rounded-pill bg-danger border border-2 border-white shadow-sm px-3">NEW</span>
                <span v-if="store.isFavorite(product.id)" class="badge rounded-pill bg-white text-danger border border-danger shadow-sm px-2 py-1" style="font-size: 10px;">已收藏</span>
              </div>
            </div>
            <!-- 商品資訊 -->
            <div class="card-body p-3 d-flex flex-column">
              <h6 class="card-title fw-bold text-dark mb-2 text-truncate-2">{{ product.name }}</h6>
              <div class="mt-auto">
                <div class="d-flex align-items-center gap-2">
                  <span class="fw-bolder fs-5 text-primary">${{ product.price.toLocaleString() }}</span>
                  <span v-if="product.originalPrice" class="text-muted text-decoration-line-through small">${{ product.originalPrice.toLocaleString() }}</span>
                </div>
                <!-- 評分或銷量 -->
                <div class="d-flex align-items-center mt-2 text-warning small">
                  <i class="bi bi-star-fill me-1"></i>
                  <span class="text-secondary fw-medium">{{ product.rating }}</span>
                  <span class="text-muted ms-auto" style="font-size: 0.7rem;">已售出 {{ product.sales }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center animate-fade-in">
        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center mb-4 border" style="width: 120px; height: 120px;">
          <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">找不到相關商品</h4>
        <p class="text-secondary mb-4">嘗試更換關鍵字或清除過濾條件</p>
        <button @click="resetFilters" class="btn btn-primary rounded-pill px-4 py-2 fw-bold borderSet">
          清除所有過濾
        </button>
      </div>
    </div>

    <!-- 商品詳情彈窗 (Bootstrap Modal) -->
    <div class="modal fade" id="productDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg" v-if="selectedProduct">
          <!-- 關閉按鈕 (手機版置頂) -->
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white rounded-circle p-2 shadow-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          
          <div class="modal-body p-0">
            <div class="row g-0">
              <!-- 左側：大圖 (手機版在上) -->
              <div class="col-md-6 border-end bg-light">
                <div class="ratio ratio-1x1 h-100">
                  <img :src="selectedProduct.image" class="object-fit-cover w-100 h-100" :alt="selectedProduct.name">
                </div>
              </div>
              
              <!-- 右側：資訊與選購 (手機版在下) -->
              <div class="col-md-6 p-4 d-flex flex-column h-100 overflow-auto scroll-hide">
                <div class="mb-4">
                  <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-3 mb-2">{{ selectedProduct.category }}</span>
                  <h3 class="fw-bold text-dark mb-2">{{ selectedProduct.name }}</h3>
                  <div class="d-flex align-items-baseline gap-2 mb-3">
                    <span class="fs-2 fw-bolder text-primary">${{ selectedProduct.price.toLocaleString() }}</span>
                    <span v-if="selectedProduct.originalPrice" class="text-muted text-decoration-line-through">${{ selectedProduct.originalPrice.toLocaleString() }}</span>
                  </div>
                </div>

                <!-- 商品介紹 -->
                <div class="mb-4 p-3 rounded-4 bg-light border borderSet-light">
                  <h6 class="fw-bold text-dark mb-2"><i class="bi bi-info-circle me-1"></i> 商品介紹</h6>
                  <p class="text-secondary small mb-0 line-height-lg">{{ selectedProduct.description || '這是一件高品質的高級商品，經過專業設計與嚴選材質製作而成。' }}</p>
                </div>

                <!-- 規格選擇 (如有) -->
                <div v-if="selectedProduct.specs" class="mb-4">
                  <!-- 尺寸 -->
                  <div v-if="selectedProduct.specs.sizes" class="mb-3">
                    <label class="form-label small fw-bold text-secondary mb-2">選擇尺寸：</label>
                    <div class="d-flex flex-wrap gap-2">
                      <button 
                        v-for="s in selectedProduct.specs.sizes" :key="s"
                        @click="selectedProduct.selectedSize = s"
                        class="btn rounded-3 border py-2 py-md-2 px-3 px-md-4 fw-bold transition-all fs-6"
                        :class="selectedProduct.selectedSize === s ? 'btn-primary border-primary shadow-sm' : 'btn-white bg-white text-dark'"
                      >
                        {{ s }}
                      </button>
                    </div>
                  </div>
                  <!-- 顏色 -->
                  <div v-if="selectedProduct.specs.colors" class="mb-3">
                    <label class="form-label small fw-bold text-secondary mb-2">選擇顏色：</label>
                    <div class="d-flex flex-wrap gap-2">
                      <button 
                        v-for="c in selectedProduct.specs.colors" :key="c"
                        @click="selectedProduct.selectedColor = c"
                        class="btn rounded-3 border py-2 py-md-2 px-3 px-md-4 fw-bold transition-all fs-6"
                        :class="selectedProduct.selectedColor === c ? 'btn-info text-white border-info shadow-sm' : 'btn-white bg-white text-dark'"
                      >
                        {{ c }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 數量與按鈕 -->
                <div class="mt-auto pt-4 border-top">
                  <div class="row g-3 align-items-center">
                    <div class="col-5">
                      <div class="input-group border rounded-pill overflow-hidden borderSet-light h-100 bg-light">
                        <button @click="productQuantity > 1 && productQuantity--" class="btn btn-light border-0 px-3 shadow-none"><i class="bi bi-dash"></i></button>
                        <input type="text" class="form-control border-0 bg-transparent text-center fw-bold shadow-none" v-model.number="productQuantity">
                        <button @click="productQuantity++" class="btn btn-light border-0 px-3 shadow-none"><i class="bi bi-plus"></i></button>
                      </div>
                    </div>
                    <div class="col-7">
                      <button 
                        @click="modalAddToCart"
                        class="btn btn-primary w-100 rounded-pill py-2 fw-bold borderSet shadow-sm transition-all"
                      >
                        <i class="bi bi-cart-plus me-1"></i> 加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  name: 'ProductView',
  data() {
    return {
      store,
      searchQuery: '',
      selectedCategory: '全部商品',
      sortBy: 'newest',
      categories: ['全部商品', '特價出清', '大大武花', '零食', '飲品', '寵愛專區'],
      selectedProduct: null,
      productQuantity: 1,
      productModal: null,
      products: [
        { 
          id: 1, 
          name: '韓系修身牛仔長褲 (寬鬆版型)', 
          category: '特價出清', 
          price: 890, 
          originalPrice: 1200, 
          rating: 4.8, 
          sales: 124, 
          isNew: true, 
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400', 
          specs: { sizes: ['S', 'M', 'L', 'XL'] }, 
          selectedSize: 'M',
          description: '採用高品質彈性丹寧布料，結合韓式修身裁切，提供優異的穿著舒適度與挺拔視覺感。',
          details: '材質：98% 棉, 2% 氨綸；厚度：中等偏厚；彈性：微彈。'
        },
        { 
          id: 2, 
          name: '質感素色短袖T恤 (細柔棉質)', 
          category: '大大武花', 
          price: 350, 
          originalPrice: 490, 
          rating: 4.9, 
          sales: 852, 
          isNew: false, 
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400', 
          specs: { sizes: ['F'] }, 
          selectedSize: 'F',
          description: '細柔純棉手感，親膚透氣，精選多色系基礎款，是您日常穿搭的最佳首選。',
          details: '材質：100% 精梳棉；版型：基本款；厚度：適中。'
        },
        { 
          id: 3, 
          name: '防潑水斜背包 (都市黑)', 
          category: '飲品', 
          price: 590, 
          originalPrice: 750, 
          rating: 4.7, 
          sales: 241, 
          isNew: false, 
          image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400',
          description: '輕便防潑水材質，多夾層收納設計，無論是日常通勤或輕旅行都非常實用。',
          details: '材質：尼龍；隔層：手機袋、拉鍊暗袋；背帶：可調節長度。'
        },
        { 
          id: 4, 
          name: '手工編織草帽 (米色)', 
          category: '飲品', 
          price: 420, 
          originalPrice: 590, 
          rating: 4.5, 
          sales: 98, 
          isNew: true, 
          image: 'https://images.unsplash.com/photo-1514859541629-278a9037c3f5?q=80&w=400',
          description: '天然草編工藝，輕巧透氣，夏季避暑防曬不可或缺的時尚配件。',
          details: '材質：Rafia草；尺寸：均碼（可微調內裡）。'
        },
        { 
          id: 5, 
          name: '簡約大容量玻璃水瓶', 
          category: '零食', 
          price: 280, 
          originalPrice: 350, 
          rating: 4.8, 
          sales: 345, 
          isNew: false, 
          image: 'https://images.unsplash.com/photo-1602143399827-7034e34cb180?q=80&w=400',
          description: '高硼矽耐熱玻璃材質，外層矽膠防滑套，美觀耐用環保。',
          details: '容量：750ml；耐溫：-20℃~120℃。'
        },
        { 
          id: 6, 
          name: '經典復古圓框墨鏡', 
          category: '飲品', 
          price: 550, 
          originalPrice: 890, 
          rating: 4.6, 
          sales: 156, 
          isNew: false, 
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400',
          description: 'UV400防護鏡片，輕量化鏡框，完美修飾臉型，打造復古潮流風。',
          details: '鏡片：樹脂；鏡架：合金；功能：抵禦100%紫外線。'
        },
        { 
          id: 7, 
          name: '柔霧感長效唇釉', 
          category: '寵愛專區', 
          price: 420, 
          originalPrice: 550, 
          rating: 4.9, 
          sales: 512, 
          isNew: true, 
          image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=400',
          description: '絲絨霧面質地，顯色飽滿且持久不掉色，輕盈無感不悶唇。',
          details: '規格：3.5g；妝效：霧面絲絨。'
        },
        { 
          id: 8, 
          name: '亞麻質感寬鬆襯衫', 
          category: '大大武花', 
          price: 680, 
          originalPrice: 950, 
          rating: 4.7, 
          sales: 201, 
          isNew: false, 
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400', 
          specs: { sizes: ['M', 'L'] }, 
          selectedSize: 'M',
          description: '亞麻與棉混紡布料，吸濕排汗通風，是春夏最具質感的清新搭配。',
          details: '材質：70% 棉, 30% 亞麻；版型：寬鬆。'
        },
        { 
          id: 9, 
          name: '北歐風香氛蠟燭 (薰衣草)', 
          category: '零食', 
          price: 450, 
          originalPrice: 600, 
          rating: 4.8, 
          sales: 187, 
          isNew: true, 
          image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400',
          description: '純天然大豆蠟調配，薰衣草精油舒緩身心，為居家空間營造靜謐氛圍。',
          details: '容量：120g；燃燒時間：約25小時。'
        },
        { 
          id: 10, 
          name: '撞色拼接帆布鞋', 
          category: '特價出清', 
          price: 1280, 
          originalPrice: 1680, 
          rating: 4.6, 
          sales: 64, 
          isNew: true, 
          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400', 
          specs: { sizes: ['37', '38', '39', '40'], colors: ['藍色', '白色', '黃色'] }, 
          selectedSize: '38', 
          selectedColor: '藍色',
          description: '活潑的大膽撞色設計，選用耐磨帆布與止滑橡膠底，穿出自我風格而不失機能。',
          details: '材質：帆布、橡膠；產地：台灣；設計：經典撞色系列。'
        }
      ]

    };
  },
  mounted() {
    // 初始進入時檢查 URL 參數
    this.syncCategoryFromRoute();
  },
  watch: {
    // 監聽路由參數變化（當使用者在 Navbar 切換分類時）
    '$route.query.category': {
      handler() {
        this.syncCategoryFromRoute();
      }
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];
      
      // 搜尋過濾
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(query));
      }
      
      // 分類過濾
      if (this.selectedCategory !== '全部商品') {
        result = result.filter(p => p.category === this.selectedCategory);
      }
      
      // 排序
      result.sort((a, b) => {
        if (this.sortBy === 'newest') return b.id - a.id;
        if (this.sortBy === 'priceLow') return a.price - b.price;
        if (this.sortBy === 'priceHigh') return b.price - a.price;
        if (this.sortBy === 'sales') return b.sales - a.sales;
        return 0;
      });
      
      return result;
    }
  },
  methods: {
    syncCategoryFromRoute() {
      const category = this.$route.query.category;
      if (category && this.categories.includes(category)) {
        this.selectedCategory = category;
      } else {
        this.selectedCategory = '全部商品';
      }
    },
    openProductModal(product) {
      this.selectedProduct = product;
      this.productQuantity = 1;
      // 改用直接匯入的 bootstrap 物件以避開 window 為 undefined 的問題
      if (!this.productModal) {
        this.productModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
      }
      this.productModal.show();
    },
    modalAddToCart() {
      if (this.selectedProduct.specs) {
        const spec = {};
        if (this.selectedProduct.specs.sizes) spec.size = this.selectedProduct.selectedSize;
        if (this.selectedProduct.specs.colors) spec.color = this.selectedProduct.selectedColor;
        for (let i = 0; i < this.productQuantity; i++) {
          this.store.addToCart(this.selectedProduct, spec);
        }
      } else {
        for (let i = 0; i < this.productQuantity; i++) {
          this.store.addToCart(this.selectedProduct);
        }
      }
      this.productModal.hide();
    },
    handleAddToCart(product) {
      if (product.specs) {
        const spec = {};
        if (product.specs.sizes) spec.size = product.selectedSize;
        if (product.specs.colors) spec.color = product.selectedColor;
        this.store.addToCart(product, spec);
      } else {
        this.store.addToCart(product);
      }
    },
    changeCategory(cat) {
      // 點擊標籤時同步更新 URL，讓 Navbar 也能反映狀態
      this.$router.push({ path: '/products', query: { category: cat } });
    },
    resetFilters() {
      this.searchQuery = '';
      this.changeCategory('全部商品');
      this.sortBy = 'newest';
    }
  }
}
</script>

<style scoped>
.aspect-ratio-1 {
  aspect-ratio: 1 / 1;
}

.btn-xs {
  padding: 1px 5px;
  font-size: 0.7rem;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
}

.product-card:hover .card-img-top {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.scroll-hide::-webkit-scrollbar {
  display: none;
}
.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.line-height-lg {
  line-height: 1.8;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 延遲動畫效果 */
.row > div:nth-child(1) { animation-delay: 0.1s; }
.row > div:nth-child(2) { animation-delay: 0.15s; }
.row > div:nth-child(3) { animation-delay: 0.2s; }
.row > div:nth-child(4) { animation-delay: 0.25s; }
.row > div:nth-child(5) { animation-delay: 0.3s; }
</style>
