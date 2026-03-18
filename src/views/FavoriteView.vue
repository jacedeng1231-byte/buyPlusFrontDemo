<template>
  <div class="h-100 d-flex flex-column p-0 animate-fade-in">
    <!-- 標頭 -->
    <div class="d-flex align-items-baseline mb-4">
      <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">我的收藏</h2>
      <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">My Favorites</span>
    </div>

    <!-- 收藏列表區 -->
    <div class="flex-grow-1 overflow-auto scroll-area px-1">
      <div v-if="store.favorites.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 mb-4">
        <div 
          v-for="product in store.favorites" 
          :key="product.id" 
          class="col animate-slide-up"
        >
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card transition-all bg-white position-relative">
            <!-- 移除收藏按鈕 (絕對定位) -->
            <button 
              @click.stop="store.toggleFavorite(product)"
              class="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center" 
              style="width: 35px; height: 35px; z-index: 10;"
            >
              <i class="bi bi-heart-fill text-danger fs-5"></i>
            </button>

            <!-- 商品圖片 -->
            <div class="aspect-ratio-1 bg-light overflow-hidden">
              <img :src="product.image" class="card-img-top object-fit-cover h-100 w-100 transition-transform" :alt="product.name">
            </div>

            <!-- 商品資訊 -->
            <div class="card-body p-3 d-flex flex-column">
              <div class="small text-muted mb-1">{{ product.category }}</div>
              <h6 class="card-title fw-bold text-dark text-truncate-2 mb-2" style="height: 2.4rem;">{{ product.name }}</h6>
              
              <!-- 規格選擇區 -->
              <div v-if="product.specs" class="mb-3 p-2 bg-light rounded-3 border-0 text-start">
                <div v-if="product.specs.sizes" class="mb-2">
                  <div class="small fw-bold text-dark mb-1" style="font-size: 9px;">尺寸：</div>
                  <div class="d-flex flex-wrap gap-1">
                    <button 
                      v-for="s in product.specs.sizes" :key="s"
                      @click.stop="product.selectedSize = s"
                      class="btn btn-xs rounded-1 border py-0 px-2"
                      :class="(product.selectedSize || product.specs.sizes[0]) === s ? 'btn-primary border-primary' : 'btn-white bg-white text-secondary'"
                      style="font-size: 8px;"
                    >
                      {{ s }}
                    </button>
                  </div>
                </div>
                
                <div v-if="product.specs.colors">
                  <div class="small fw-bold text-dark mb-1" style="font-size: 9px;">顏色：</div>
                  <div class="d-flex flex-wrap gap-1">
                    <button 
                      v-for="c in product.specs.colors" :key="c"
                      @click.stop="product.selectedColor = c"
                      class="btn btn-xs rounded-1 border py-0 px-2"
                      :class="(product.selectedColor || product.specs.colors[0]) === c ? 'btn-info text-white border-info' : 'btn-white bg-white text-secondary'"
                      style="font-size: 8px;"
                    >
                      {{ c }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-auto">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <span class="fw-bolder fs-5 text-primary">${{ product.price.toLocaleString() }}</span>
                </div>
                
                <div class="d-flex gap-2">
                  <button 
                    @click.stop="handleAddToCart(product)"
                    class="btn btn-outline-primary flex-grow-1 rounded-pill fw-bold btn-sm py-2 borderSet"
                  >
                    <i class="bi bi-cart-plus me-1"></i> 加入購物車
                  </button>
                  <button 
                    @click.stop="openProductModal(product)"
                    class="btn btn-outline-secondary rounded-pill px-3 fw-bold btn-sm py-2 borderSet"
                    title="查看詳情"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center">
        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center mb-4 border" style="width: 120px; height: 120px;">
          <i class="bi bi-heart text-muted" style="font-size: 3rem;"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">您的收藏清單是空的</h4>
        <p class="text-secondary mb-4">看到心動的商品時，點擊愛心將它收藏起來吧！</p>
        <button @click="$router.push('/products')" class="btn btn-primary rounded-pill px-4 py-2 fw-bold borderSet">
          去逛逛商品
        </button>
      </div>
    </div>

    <!-- 商品詳情彈窗 (與 ProductView 保持一致) -->
    <div class="modal fade" id="favProductDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg" v-if="selectedProduct">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white rounded-circle p-2 shadow-sm borderSet-light" data-bs-dismiss="modal" aria-label="Close"></button>
          
          <div class="modal-body p-0">
            <div class="row g-0">
              <div class="col-md-6 border-end bg-light">
                <div class="ratio ratio-1x1 h-100">
                  <img :src="selectedProduct.image" class="object-fit-cover w-100 h-100" :alt="selectedProduct.name">
                </div>
              </div>
              
              <div class="col-md-6 p-4 d-flex flex-column h-100 overflow-auto scroll-hide">
                <div class="mb-4">
                  <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-3 mb-2">{{ selectedProduct.category }}</span>
                  <h3 class="fw-bold text-dark mb-2">{{ selectedProduct.name }}</h3>
                  <div class="d-flex align-items-baseline gap-2 mb-3">
                    <span class="fs-2 fw-bolder text-primary">${{ selectedProduct.price.toLocaleString() }}</span>
                  </div>
                </div>

                <div class="mb-4 p-3 rounded-4 bg-light border borderSet-light text-start">
                  <h6 class="fw-bold text-dark mb-2"><i class="bi bi-info-circle me-1"></i> 商品介紹</h6>
                  <p class="text-secondary small mb-0" style="line-height: 1.8;">{{ selectedProduct.description || '精心挑選的高品質商品，為您的生活增添色彩與便利。' }}</p>
                </div>

                <div v-if="selectedProduct.specs" class="mb-4 text-start">
                  <div v-if="selectedProduct.specs.sizes" class="mb-3">
                    <label class="form-label small fw-bold text-secondary mb-2">尺寸：</label>
                    <div class="d-flex flex-wrap gap-2">
                      <button 
                        v-for="s in selectedProduct.specs.sizes" :key="s"
                        @click="selectedProduct.selectedSize = s"
                        class="btn rounded-3 border py-2 px-3 fw-bold transition-all"
                        :class="(selectedProduct.selectedSize || selectedProduct.specs.sizes[0]) === s ? 'btn-primary border-primary shadow-sm' : 'btn-white bg-white text-dark'"
                      >
                        {{ s }}
                      </button>
                    </div>
                  </div>
                  <div v-if="selectedProduct.specs.colors" class="mb-3">
                    <label class="form-label small fw-bold text-secondary mb-2">顏色：</label>
                    <div class="d-flex flex-wrap gap-2">
                      <button 
                        v-for="c in selectedProduct.specs.colors" :key="c"
                        @click="selectedProduct.selectedColor = c"
                        class="btn rounded-3 border py-2 px-3 fw-bold transition-all"
                        :class="(selectedProduct.selectedColor || selectedProduct.specs.colors[0]) === c ? 'btn-info text-white border-info shadow-sm' : 'btn-white bg-white text-dark'"
                      >
                        {{ c }}
                      </button>
                    </div>
                  </div>
                </div>

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
  name: 'FavoriteView',
  data() {
    return {
      store,
      selectedProduct: null,
      productQuantity: 1,
      productModal: null
    };
  },
  methods: {
    openProductModal(product) {
      this.selectedProduct = product;
      this.productQuantity = 1;
      // 透過模組匯入的 bootstrap 初始化 Modal
      if (!this.productModal) {
        this.productModal = new bootstrap.Modal(document.getElementById('favProductDetailModal'));
      }
      this.productModal.show();
    },
    modalAddToCart() {
      if (this.selectedProduct.specs) {
        const spec = {};
        if (this.selectedProduct.specs.sizes) spec.size = this.selectedProduct.selectedSize || this.selectedProduct.specs.sizes[0];
        if (this.selectedProduct.specs.colors) spec.color = this.selectedProduct.selectedColor || this.selectedProduct.specs.colors[0];
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
        if (product.specs.sizes) spec.size = product.selectedSize || product.specs.sizes[0];
        if (product.specs.colors) spec.color = product.selectedColor || product.specs.colors[0];
        this.store.addToCart(product, spec);
      } else {
        this.store.addToCart(product);
      }
    }
  }
}
</script>

<style scoped>
.aspect-ratio-1 {
  aspect-ratio: 1 / 1;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

.scroll-hide::-webkit-scrollbar {
  display: none;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
