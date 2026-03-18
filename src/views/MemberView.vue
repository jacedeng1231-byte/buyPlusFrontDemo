<template>
  <div class="h-100 d-flex flex-column p-0">
    <!-- Header 標頭區塊 -->
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
      <!-- 左側：使用者資訊 -->
      <div class="d-flex align-items-center px-3 py-2 bg-white rounded-4 border shadow-sm flex-grow-1">
        <!-- avatar -->
        <div class="position-relative me-3">
          <img
            src="https://i.pravatar.cc/100"
            class="rounded-circle border border-2"
            width="50"
            height="50"
          />
          <!-- provider icon (動態標註) -->
          <i
            v-if="store.user.provider === 'facebook'"
            class="bi bi-facebook position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1"
            style="font-size: 10px"
          ></i>
          <i
            v-else-if="store.user.provider === 'line'"
            class="bi bi-line position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-1"
            style="font-size: 10px"
          ></i>
          <i
            v-else-if="store.user.provider === 'telegram'"
            class="bi bi-telegram position-absolute bottom-0 end-0 bg-info text-white rounded-circle p-1"
            style="font-size: 10px"
          ></i>
        </div>
        <!-- user info -->
        <div>
          <div class="fw-bold text-start text-dark">{{ store.user.name }} <span class="text-secondary small fw-normal ms-1">(ID：{{ store.user.id }})</span></div>
          <div class="text-muted small">{{ store.user.address }}</div>
        </div>
      </div>

      <!-- 右側：金額區 -->
      <div class="d-flex bg-white rounded-4 border shadow-sm text-center flex-grow-1">
        <div class="col border-end py-2 px-3 position-relative">
          <div class="text-muted small">待付金額</div>
          <div class="fs-5 text-danger fw-bold">${{ store.pendingPaymentTotal.toLocaleString() }}</div>
          <!-- 匯款回報快捷鍵 -->
          <router-link v-if="store.pendingPaymentTotal > 0" to="/money-transfer" class="position-absolute top-100 start-50 translate-middle-x mt-1 badge rounded-pill bg-primary border-0 text-decoration-none shadow-sm hvr-grow" style="font-size: 0.65rem; z-index: 5; white-space: nowrap;">
            <i class="bi bi-megaphone me-1"></i>匯款回報
          </router-link>
        </div>
        <div class="col py-2 px-3">
          <div class="text-muted small">帳戶資金</div>
          <div class="fs-5 text-dark fw-bold">$0</div>
        </div>
      </div>
    </div>

    <!-- 內容區與左側選單 -->
    <div class="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden gap-4">
      
      <!-- 左側/上方 標籤列 (使用自訂 BorderSet 按鈕) -->
      <div class="flex-shrink-0 p-3 rounded-4" style="min-width: 200px; background-color: rgba(102, 102, 102, 0.03);">
        <ul class="nav flex-row flex-md-column gap-3" id="memberTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile" type="button" role="tab">
               會員資料
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none" id="favorites-tab" data-bs-toggle="pill" data-bs-target="#favorites" type="button" role="tab">
               我的收藏
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none" id="address-tab" data-bs-toggle="pill" data-bs-target="#address" type="button" role="tab">
               常用地址
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white shadow-none" id="funds-tab" data-bs-toggle="pill" data-bs-target="#funds" type="button" role="tab">
               帳戶資金
            </button>
          </li>
        </ul>
      </div>

      <!-- 右側/下方 詳細內容區塊 -->
      <div class="tab-content flex-grow-1 overflow-auto bg-white p-4 p-md-5 rounded-4 border-0 position-relative" id="memberTabContent">
        
        <!-- 1. 會員資料 -->
        <div class="tab-pane fade show active h-100" id="profile" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">會員資料</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Profile</span>
           </div>

          <h6 class="fw-bold mb-4 pb-2 border-bottom border-light text-dark fs-5">個人資料</h6>
          <div class="row g-3 mb-4 text-start">
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">姓氏</label>
              <input type="text" class="form-control py-2" placeholder="姓" value="林">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">名字</label>
              <input type="text" class="form-control py-2" placeholder="名" value="玉珊">
            </div>
            <div class="col-12">
              <label class="form-label text-secondary small fw-bold">電子郵件</label>
              <input type="email" class="form-control py-2" placeholder="name@example.com" value="lin@example.com">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">手機號碼</label>
              <input type="tel" class="form-control py-2" placeholder="09XX-XXX-XXX" value="0912345678">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">傳真電話</label>
              <input type="tel" class="form-control py-2" placeholder="區碼-號碼">
            </div>
          </div>

          <h6 class="fw-bold mt-5 mb-4 pb-2 border-bottom border-light text-dark fs-5">預設配送及付款</h6>
          <div class="row g-3 mb-4 text-start">
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">配送方式</label>
              <select class="form-select py-2">
                <option selected>7-11</option>
                <option value="1">宅配</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">付款方式</label>
              <select class="form-select py-2">
                <option selected>貨到付款</option>
                <option value="1">刷卡</option>
                <option value="2">轉</option>
              </select>
            </div>
          </div>

          <h6 class="fw-bold mt-5 mb-4 pb-2 border-bottom border-light text-dark fs-5">預設地址</h6>
          <div class="row g-3 mb-4 text-start">
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">所在國家</label>
              <select class="form-select py-2">
                <option selected>台灣</option>
                <option value="1">日本</option>
                <option value="2">美國</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">縣市</label>
              <select class="form-select py-2">
                <option selected>台東縣</option>
                <option value="1">台北市</option>
                <option value="2">高雄市</option>
              </select>
            </div>
          </div>
          
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary px-4 py-2 rounded-pill fw-bold borderSet shadow-none">儲存變更</button>
          </div>
        </div>

        <!-- 2. 我的收藏 -->
        <div class="tab-pane fade h-100" id="favorites" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">我的收藏</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Favorites</span>
           </div>

          <!-- 有收藏商品時的列表 -->
          <div v-if="store.favorites.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            <div class="col" v-for="item in store.favorites" :key="item.id">
              <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative product-card bg-white">
                <!-- 移除收藏按鈕 (絕對定位) -->
                <button @click="store.toggleFavorite(item)" class="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; z-index: 10;">
                  <i class="bi bi-heart-fill text-danger fs-5"></i>
                </button>
                
                <!-- 商品圖片 -->
                <div class="ratio ratio-1x1 bg-light">
                  <img :src="item.image || item.image" class="card-img-top object-fit-cover" :alt="item.name || item.title">
                </div>
                
                <!-- 商品資訊 -->
                <div class="card-body p-3 d-flex flex-column">
                  <div class="small text-muted mb-1">{{ item.category }}</div>
                  <h6 class="card-title fw-bold text-dark text-truncate mb-2">{{ item.name || item.title }}</h6>
                  
                  <!-- 規格選擇區 -->
                  <div v-if="item.specs" class="mb-3 p-2 bg-light rounded-3 border-0 text-start">
                    <div v-if="item.specs.sizes" class="mb-2">
                      <div class="small fw-bold text-dark mb-1" style="font-size: 9px;">尺寸：</div>
                      <div class="d-flex flex-wrap gap-1">
                        <button 
                          v-for="s in item.specs.sizes" :key="s"
                          @click.stop="item.selectedSize = s"
                          class="btn btn-xs rounded-1 border py-0 px-2"
                          :class="(item.selectedSize || item.specs.sizes[0]) === s ? 'btn-primary border-primary' : 'btn-white bg-white text-secondary'"
                          style="font-size: 8px;"
                        >
                          {{ s }}
                        </button>
                      </div>
                    </div>
                    
                    <div v-if="item.specs.colors">
                      <div class="small fw-bold text-dark mb-1" style="font-size: 9px;">顏色：</div>
                      <div class="d-flex flex-wrap gap-1">
                        <button 
                          v-for="c in item.specs.colors" :key="c"
                          @click.stop="item.selectedColor = c"
                          class="btn btn-xs rounded-1 border py-0 px-2"
                          :class="(item.selectedColor || item.specs.colors[0]) === c ? 'btn-info text-white border-info' : 'btn-white bg-white text-secondary'"
                          style="font-size: 8px;"
                        >
                          {{ c }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex align-items-baseline mb-3 mt-auto">
                    <span class="fs-5 fw-bolder text-danger me-2">NT$ {{ item.price.toLocaleString() }}</span>
                  </div>
                  
                  <div class="d-flex gap-2">
                    <button @click="handleAddToCart(item)" class="btn btn-outline-primary flex-grow-1 rounded-pill fw-bold btn-sm py-2 borderSet">
                      <i class="bi bi-cart-plus me-1"></i> 加入購物車
                    </button>
                    <button @click="openProductModal(item)" class="btn btn-outline-secondary rounded-pill px-3 fw-bold btn-sm py-2 borderSet" title="查看詳情">
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 空狀態 -->
          <div v-else class="text-center py-5">
             <i class="bi bi-heart text-muted mb-3 d-block" style="font-size: 3rem;"></i>
             <h5 class="text-secondary fw-bold">目前沒有收藏任何商品</h5>
             <router-link to="/products" class="btn btn-primary rounded-pill mt-3 px-4 fw-bold borderSet">去逛逛商品</router-link>
          </div>
        </div>

        <!-- 3. 常用地址 -->
        <div class="tab-pane fade h-100" id="address" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">常用地址</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Address</span>
           </div>
          
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <!-- 新增地址按鈕 (觸發 Modal) -->
            <div class="col">
              <div class="card h-100 amazon-add-card d-flex flex-column align-items-center justify-content-center py-5 border-2 rounded-4" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                <i class="bi bi-plus text-secondary" style="font-size: 3rem; line-height: 1;"></i>
                <h5 class="fw-bold text-secondary mt-2">新增地址</h5>
              </div>
            </div>
            
            <!-- 預設地址卡片 -->
            <div class="col">
              <div class="card h-100 amazon-address-card rounded-4 shadow-sm border-light">
                <div class="card-header bg-transparent border-bottom border-light py-3 d-flex align-items-center">
                  <span class="text-muted small me-2">預設：</span>
                  <strong class="fs-6 text-dark">amazon</strong>
                </div>
                <div class="card-body py-3">
                  <h6 class="fw-bold mb-2 text-dark">Teng, shih-chieh</h6>
                  <p class="mb-1 small text-secondary">No. 41, Hexing St.</p>
                  <p class="mb-1 small text-secondary">Miaoli City, Miaoli County 360</p>
                  <p class="mb-1 small text-secondary">臺灣</p>
                  <p class="mb-0 small text-secondary mt-2">電話號碼: 0968911231</p>
                </div>
                <div class="card-footer bg-transparent border-top-0 pt-0 pb-3">
                  <a href="#" class="text-decoration-none text-primary fw-bold small">編輯</a>
                  <span class="mx-3 text-light">|</span>
                  <a href="#" class="text-decoration-none text-danger fw-bold small">移除</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. 帳戶資金 -->
        <div class="tab-pane fade h-100" id="funds" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">帳戶資金</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Funds</span>
           </div>
          
          <!-- Filter pills -->
          <ul class="nav gap-2 mb-4" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link sub-pill active rounded-pill px-4 py-1 small fw-bold" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab">全部</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link sub-pill rounded-pill px-4 py-1 small fw-bold" id="pills-in-tab" data-bs-toggle="pill" data-bs-target="#pills-in" type="button" role="tab">入帳</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link sub-pill rounded-pill px-4 py-1 small fw-bold" id="pills-out-tab" data-bs-toggle="pill" data-bs-target="#pills-out" type="button" role="tab">扣款</button>
            </li>
          </ul>
          
          <!-- Logs -->
          <div class="tab-content" id="pills-tabContent">
            <!-- 全部 -->
            <div class="tab-pane fade show active" id="pills-all" role="tabpanel">
              <div class="list-group list-group-flush border-top border-bottom">
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-bottom border-light bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-05-01 14:32</div>
                    <div class="fw-bold mb-0 text-dark">訂單退款 (#20230501)</div>
                  </div>
                  <span class="text-success fw-bolder fs-5">+ $150</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-bottom border-light bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-04-28 09:15</div>
                    <div class="fw-bold mb-0 text-dark">購買商品扣款</div>
                  </div>
                  <span class="text-danger fw-bolder fs-5">- $71</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-0 bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-04-20 18:00</div>
                    <div class="fw-bold mb-0 text-dark">儲值</div>
                  </div>
                  <span class="text-success fw-bolder fs-5">+ $500</span>
                </div>
              </div>
            </div>
            
            <!-- 入帳 -->
            <div class="tab-pane fade" id="pills-in" role="tabpanel">
               <div class="list-group list-group-flush border-top border-bottom">
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-bottom border-light bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-05-01 14:32</div>
                    <div class="fw-bold mb-0 text-dark">訂單退款 (#20230501)</div>
                  </div>
                  <span class="text-success fw-bolder fs-5">+ $150</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-0 bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-04-20 18:00</div>
                    <div class="fw-bold mb-0 text-dark">儲值</div>
                  </div>
                  <span class="text-success fw-bolder fs-5">+ $500</span>
                </div>
              </div>
            </div>
            
            <!-- 扣款 -->
            <div class="tab-pane fade" id="pills-out" role="tabpanel">
               <div class="list-group list-group-flush border-top border-bottom">
                <div class="list-group-item d-flex justify-content-between align-items-center py-4 px-2 border-0 bg-transparent">
                  <div>
                    <div class="text-secondary fw-bold mb-1" style="font-size: 0.85rem;">2023-04-28 09:15</div>
                    <div class="fw-bold mb-0 text-dark">購買商品扣款</div>
                  </div>
                  <span class="text-danger fw-bolder fs-5">- $71</span>
                </div>
               </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- 商品詳情彈窗 (與首頁保持一致) -->
    <div class="modal fade" id="memberProductDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg" v-if="selectedProduct">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white rounded-circle p-2 shadow-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          
          <div class="modal-body p-0 text-start">
            <div class="row g-0">
              <div class="col-md-6 border-end bg-light">
                <div class="ratio ratio-1x1 h-100">
                  <img :src="selectedProduct.image" class="object-fit-cover w-100 h-100" :alt="selectedProduct.name">
                </div>
              </div>
              
              <div class="col-md-6 p-4 d-flex flex-column h-100 overflow-auto">
                <div class="mb-4">
                  <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-3 mb-2">{{ selectedProduct.category }}</span>
                  <h3 class="fw-bold text-dark mb-2">{{ selectedProduct.name }}</h3>
                  <div class="d-flex align-items-baseline gap-2 mb-3">
                    <span class="fs-2 fw-bolder text-primary">${{ selectedProduct.price.toLocaleString() }}</span>
                  </div>
                </div>

                <div class="mb-4 p-3 rounded-4 bg-light border border-light">
                  <h6 class="fw-bold text-dark mb-2"><i class="bi bi-info-circle me-1"></i> 商品介紹</h6>
                  <p class="text-secondary small mb-0" style="line-height: 1.8;">{{ selectedProduct.description || '精心挑選的高品質商品，為您的生活增添便利。' }}</p>
                </div>

                <div v-if="selectedProduct.specs" class="mb-4">
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
                      <div class="input-group border rounded-pill overflow-hidden h-100 bg-light">
                        <button @click="productQuantity > 1 && productQuantity--" class="btn btn-light border-0 px-2 shadow-none"><i class="bi bi-dash"></i></button>
                        <input type="text" class="form-control border-0 bg-transparent text-center fw-bold shadow-none p-0" v-model.number="productQuantity">
                        <button @click="productQuantity++" class="btn btn-light border-0 px-2 shadow-none"><i class="bi bi-plus"></i></button>
                      </div>
                    </div>
                    <div class="col-7">
                      <button 
                        @click="modalAddToCart"
                        class="btn btn-primary w-100 rounded-pill py-2 fw-bold borderSet shadow-sm transition-all"
                      >
                        加入購物車
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

  <!-- 新增地址 Modal -->
  <div class="modal fade" id="addAddressModal" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-4 border-0 shadow">
        <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
          <h5 class="modal-title fw-bold text-dark fs-4" id="addAddressModalLabel">新增常用地址</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start p-4">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">姓氏</label>
              <input type="text" class="form-control py-2" placeholder="請輸入姓氏">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">名字</label>
              <input type="text" class="form-control py-2" placeholder="請輸入名字">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">公司</label>
              <input type="text" class="form-control py-2" placeholder="請輸入公司名稱">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">郵遞區號</label>
              <input type="text" class="form-control py-2" placeholder="例如: 100">
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">所在國家</label>
              <select class="form-select py-2">
                <option selected>請選擇國家</option>
                <option value="台灣">台灣</option>
                <option value="日本">日本</option>
                <option value="美國">美國</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label text-secondary small fw-bold">縣市</label>
              <select class="form-select py-2">
                <option selected>請選擇縣市</option>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
                <option value="台東縣">台東縣</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label text-secondary small fw-bold">詳細地址</label>
              <input type="text" class="form-control py-2" placeholder="市區鄉鎮、街道、巷弄、門牌號碼">
            </div>
            <div class="col-12 mt-4">
               <label class="form-label text-secondary small fw-bold me-3">設為預設地址：</label>
               <div class="form-check form-check-inline">
                 <input class="form-check-input mt-1" type="radio" name="defaultAddress" id="defaultYes" value="yes" checked>
                 <label class="form-check-label fw-bold text-dark" for="defaultYes">是</label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input mt-1" type="radio" name="defaultAddress" id="defaultNo" value="no">
                 <label class="form-check-label fw-bold text-dark" for="defaultNo">否</label>
               </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-top-0 pt-0 pb-4 px-4 d-flex justify-content-end">
          <button type="button" class="btn btn-light rounded-pill px-4 fw-bold shadow-none" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary rounded-pill px-4 fw-bold text-white borderSet shadow-none" data-bs-dismiss="modal">儲存地址</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 針對左側導覽重寫 Bootstrap Nav 樣式 */
#memberTab .nav-link {
  color: #6c757d;     
}
#memberTab .nav-link:hover {
  color: #212529;
}


/* 次級選單 (資金明細的過濾 pills) 樣式 */
.sub-pill {
  color: #6c757d;
  background-color: transparent;
  border: 1px solid #dee2e6;
  transition: all 0.2s ease;
}
.sub-pill:hover {
  border-color: #adb5bd;
  color: #212529;
}
.sub-pill.active {
  background-color: #212529;
  color: #fff !important;
  border-color: #212529;
}

/* Amazon 風格的新增地址卡片（虛線外框） */
.amazon-add-card {
  border: 2px dashed #ced4da;
  background-color: transparent;
  transition: background-color 0.2s;
  cursor: pointer;
}
.amazon-add-card:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
}

/* 隱藏原生捲軸但保留滾動功能 */
#memberTabContent::-webkit-scrollbar {
  width: 6px;
}
#memberTabContent::-webkit-scrollbar-thumb {
  background-color: #e9ecef;
  border-radius: 4px;
}

/* 輸入框美化 */
.form-control:focus, .form-select:focus {
  box-shadow: none;
  border-color: #8bb9fe !important;
  background-color: #fff !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

<script>
import * as bootstrap from 'bootstrap';
import { store } from '../store.js';

export default {
  name: 'MemberView',
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
      if (!this.productModal) {
        this.productModal = new bootstrap.Modal(document.getElementById('memberProductDetailModal'));
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
