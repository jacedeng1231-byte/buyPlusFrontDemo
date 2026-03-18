<template>
  <div class="h-100 d-flex flex-column p-0">
    <!-- Header 標題區塊 -->
    <div class="d-flex align-items-center mb-4">
      <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
        <i class="bi bi-megaphone-fill fs-4"></i>
      </div>
      <div>
        <h4 class="fw-bold mb-1 text-dark">賣家公告</h4>
        <div class="text-muted small">掌握最新活動、購物須知與各項政策聲明</div>
      </div>
    </div>

    <!-- 內容區與左側選單 -->
    <div class="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden gap-4">
      
      <!-- 左側/上方 標籤列 (使用自訂 BorderSet 按鈕) -->
      <div class="flex-shrink-0 p-3 rounded-4" style="min-width: 200px; background-color: rgba(102, 102, 102, 0.03);">
        <ul class="nav flex-row flex-md-column gap-3" id="bulletinTab" role="tablist">
          <!-- 最新消息 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">
              最新消息
            </button>
          </li>
          <!-- 關於我們 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white" id="about-tab" data-bs-toggle="pill" data-bs-target="#about" type="button" role="tab">
              關於我們
            </button>
          </li>
          <!-- 配送說明 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white" id="shipping-tab" data-bs-toggle="pill" data-bs-target="#shipping" type="button" role="tab">
              配送說明
            </button>
          </li>
          <!-- 隱私權聲明 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white" id="privacy-tab" data-bs-toggle="pill" data-bs-target="#privacy" type="button" role="tab">
               隱私權聲明
            </button>
          </li>
          <!-- 政策 & 條款 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold w-100 py-3 text-center borderSet rounded-4 text-dark bg-white" id="terms-tab" data-bs-toggle="pill" data-bs-target="#terms" type="button" role="tab">
               政策 & 條款
            </button>
          </li>
        </ul>
      </div>

      <!-- 右側/下方 詳細內容區塊 -->
      <div class="tab-content flex-grow-1 overflow-auto bg-white p-4 p-md-5 rounded-4 border-0" id="bulletinTabContent">
        
        <!-- 1. 最新消息 -->
        <div class="tab-pane fade show active h-100 position-relative" id="news" role="tabpanel">
          
          <!-- 標題 -->
          <div class="d-flex align-items-baseline mb-5">
            <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">最新消息</h2>
            <span class="text-primary fw-bold" style="font-size: 0.9rem; letter-spacing: 1px;">NEWS</span>
          </div>
          
          <!-- 消息列表 -->
          <div class="list-group list-group-flush border-top border-bottom">
            <!-- 公告項目 1 -->
            <a href="#" class="list-group-item list-group-item-action py-4 px-2 border-bottom text-decoration-none bg-transparent">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="text-secondary fw-bold mb-2" style="font-size: 0.95rem; letter-spacing: 1px;">2026.03.16</div>
                  <h6 class="mb-0 fw-bold text-dark fs-5">【3月17日】秋季新品上市！全館享免運優惠</h6>
                </div>
                <i class="bi bi-arrow-right fs-4 text-secondary"></i>
              </div>
            </a>
            
            <!-- 公告項目 2 -->
            <a href="#" class="list-group-item list-group-item-action py-4 px-2 border-bottom text-decoration-none bg-transparent">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="text-secondary fw-bold mb-2" style="font-size: 0.95rem; letter-spacing: 1px;">2026.01.23</div>
                  <h6 class="mb-0 fw-bold text-dark fs-5">【防詐騙】預防詐騙提醒公告</h6>
                </div>
                <i class="bi bi-arrow-right fs-4 text-secondary"></i>
              </div>
            </a>
            
            <!-- 公告項目 3 -->
            <a href="#" class="list-group-item list-group-item-action py-4 px-2 border-bottom-0 text-decoration-none bg-transparent">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="text-secondary fw-bold mb-2" style="font-size: 0.95rem; letter-spacing: 1px;">2025.12.26</div>
                  <h6 class="mb-0 fw-bold text-dark fs-5">中秋連假出貨暨客服暫停公告</h6>
                </div>
                <i class="bi bi-arrow-right fs-4 text-secondary"></i>
              </div>
            </a>
          </div>

          <!-- 底部連結 -->
          <div class="d-flex justify-content-end mt-5">
            <a href="#" class="text-decoration-none text-dark fw-bold d-flex align-items-center fs-5">
              最新消息一覽 <i class="bi bi-arrow-right-circle-fill text-primary ms-2 fs-4"></i>
            </a>
          </div>
        </div>

        <!-- 2. 關於我們 -->
        <div class="tab-pane fade h-100 position-relative" id="about" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">關於我們</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">About Us</span>
           </div>
           
           <div class="text-center mb-5 mt-4">
              <h3 class="fw-bolder text-dark mb-3" style="letter-spacing: 2px;">Buy<span class="text-primary">+</span>Plus</h3>
              <p class="text-secondary" style="letter-spacing: 1px;">為你的生活加一點美好</p>
           </div>
           
           <div class="mb-5 pb-4 border-bottom border-light">
             <h6 class="fw-bold text-dark mb-3 fs-5">我們的故事</h6>
             <p class="text-secondary lh-lg mb-0" style="font-size: 0.95rem;">
               BuyPlus 創立於 2020 年，我們深信每一次的購物，都應該是為生活加分的體驗 (Buy + Plus)。<br>
               從一開始的小型工作室，到現在成為數萬名會員信賴的購物平台，我們始終秉持著「嚴格把關、用心服務」的初衷。
             </p>
           </div>

           <div>
             <h6 class="fw-bold text-dark mb-3 fs-5">我們的使命</h6>
             <p class="text-secondary lh-lg mb-0" style="font-size: 0.95rem;">
               嚴選全球質感好物，剔除華而不實的噱頭，將最具性價比的商品與最安心的售後服務交到您的手中。<br>
               我們希望來到 BuyPlus 的朋友，不需要花費大量的時間比價防雷，能將省下的時間與金錢，花在真正美好的事物上。
             </p>
           </div>
        </div>

        <!-- 3. 配送說明 -->
        <div class="tab-pane fade h-100 position-relative" id="shipping" role="tabpanel">
          <!-- 標題 -->
          <div class="d-flex align-items-baseline mb-5">
            <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">配送說明</h2>
            <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Shipping Info</span>
          </div>

          <div class="mb-5 pb-4 border-bottom border-light">
             <h6 class="fw-bold text-dark mb-3 fs-5">一般出貨時間</h6>
             <p class="text-secondary lh-lg mb-0" style="font-size: 0.95rem;">
               現貨商品將於訂單付款確認後 <strong>1-2 個工作天</strong>內安排出貨。（不含週休二日及國定假日）<br>
               預購商品則依商品頁面標示之預計到貨日為主，到貨後將依訂單順序火速為您寄出。
             </p>
          </div>

          <h6 class="fw-bold text-dark mb-4 fs-5">常態配送方式與運費</h6>
          
          <div class="list-group list-group-flush border-top border-bottom">
            <!-- 超商取貨 -->
            <div class="list-group-item py-4 px-2 border-bottom bg-transparent border-light">
              <div class="d-flex align-items-center mb-3">
                 <h6 class="mb-0 fw-bold text-dark fs-5">超商取貨 (7-11 / 全家)</h6>
              </div>
              <ul class="text-secondary lh-lg mb-0 ps-3" style="font-size: 0.95rem;">
                <li>運費：<strong class="text-dark">$60</strong> / 單筆滿 <strong class="text-primary">$800 免運</strong></li>
                <li>到貨時間：出貨後約 2-3 天送達指定門市。</li>
                <li>注意事項：請務必填寫與證件相符之真實姓名，取件時需出示證件核對。</li>
              </ul>
            </div>
            
            <!-- 宅配到府 -->
            <div class="list-group-item py-4 px-2 border-bottom-0 bg-transparent">
              <div class="d-flex align-items-center mb-3">
                 <h6 class="mb-0 fw-bold text-dark fs-5">宅配到府 (黑貓 / 宅配通)</h6>
              </div>
              <ul class="text-secondary lh-lg mb-0 ps-3" style="font-size: 0.95rem;">
                <li>運費：<strong class="text-dark">$100</strong> / 單筆滿 <strong class="text-primary">$1500 免運</strong></li>
                <li>到貨時間：出貨後約 1-2 天配達到府（外島及偏遠地區除外）。</li>
                <li>注意事項：配送人員會以電話聯繫，請確保收件人手機保持暢通。</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4. 隱私權聲明 -->
        <div class="tab-pane fade h-100 position-relative" id="privacy" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">隱私權聲明</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Privacy Policy</span>
           </div>
           
           <div class="text-secondary lh-lg" style="font-size: 0.95rem;">
             <p class="mb-4">BuyPlus 非常重視會員的隱私權且遵循「個人資料保護法」之規定，因此制訂了隱私權保護政策，您可參考下列隱私權保護政策的內容。</p>
             
             <div class="mb-4 pb-4 border-bottom border-light">
               <h6 class="fw-bold text-dark mb-2 fs-6">1. 個人資料之安全</h6>
               <p class="mb-0">保護會員的個人隱私是 BuyPlus 重要的經營理念，在未經會員同意之下，我們絕不會將會員的個人資料提供予任何與本購物網站服務無關之第三人。會員應妥善保密自己的網路密碼及個人資料，不要將任何個人資料，尤其是網路密碼提供給任何人。在使用完 BuyPlus 網站所提供的各項服務功能後，務必記得登出帳戶。</p>
             </div>

             <div class="mb-4 pb-4 border-bottom border-light">
               <h6 class="fw-bold text-dark mb-2 fs-6">2. 個人資料的蒐集、處理、利用</h6>
               <p class="mb-0">BuyPlus 相關網站所取得的個人資料，都僅供 BuyPlus 於其內部、依照原來所說明的使用目的和範圍，除非事先說明、或依照相關法律規定，否則 BuyPlus 不會將資料提供給第三人、或移作其他目的使用。</p>
             </div>
             
             <div>
               <h6 class="fw-bold text-dark mb-2 fs-6">3. 資料安全防護</h6>
               <p class="mb-0">為保障會員的隱私及安全，BuyPlus 會員帳號資料會用密碼保護。BuyPlus 並盡力以合理之技術及程序（如業界標準的 SSL 網路安全加密機制），保障所有個人資料之安全。</p>
             </div>
           </div>
        </div>

        <!-- 5. 政策 & 條款 -->
        <div class="tab-pane fade h-100 position-relative" id="terms" role="tabpanel">
           <!-- 標題 -->
           <div class="d-flex align-items-baseline mb-5">
             <h2 class="fw-bolder mb-0 me-3 text-dark" style="letter-spacing: 2px;">政策 & 條款</h2>
             <span class="text-primary fw-bold text-uppercase" style="font-size: 0.9rem; letter-spacing: 1px;">Terms & Conditions</span>
           </div>
           
           <div class="accordion accordion-flush border-top border-bottom" id="termsAccordion">
              <!-- Item 1 -->
              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                  <button class="accordion-button fw-bold bg-transparent text-dark collapsed py-4 px-2 fs-5 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    七天鑑賞期權益
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#termsAccordion">
                  <div class="accordion-body text-secondary lh-lg px-2 pt-0 pb-4" style="font-size: 0.95rem;">
                    依照消費者保護法規定，消費者享有商品到貨次日起七天鑑賞期（猶豫期）之權益。<strong>【請注意：鑑賞期非試用期】</strong>，您退回的商品必須是全新的狀態且包裝完整（包含隨附配件、贈品、原廠包裝及所有附隨文件），切勿缺漏任何配件或損毀原廠外盒。
                  </div>
                </div>
              </div>
              
              <!-- Item 2 -->
              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                  <button class="accordion-button fw-bold bg-transparent text-dark collapsed py-4 px-2 fs-5 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                    無法辦理退換貨之情況
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#termsAccordion">
                  <div class="accordion-body text-secondary lh-lg px-2 pt-0 pb-4" style="font-size: 0.95rem;">
                    若商品有以下情事，將不接受退換貨：<br>
                    1. 已超過七天鑑賞期。<br>
                    2. 商品已拆封使用、剪標、下水洗滌或沾染化妝品、香水等異味。<br>
                    3. 依消費者要求所為之客製化給付商品。<br>
                    4. 貼身衣物（如內衣褲、襪子）基於個人衛生考量，已拆封者即無法退換。<br>
                    5. 網頁上特別標示「不適用猶豫期」的特賣/出清商品。
                  </div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                  <button class="accordion-button fw-bold bg-transparent text-dark collapsed py-4 px-2 fs-5 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                    瑕疵或錯誤商品處理
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#termsAccordion">
                  <div class="accordion-body text-secondary lh-lg px-2 pt-0 pb-4" style="font-size: 0.95rem;">
                    若您收到瑕疵或與訂單不符的錯誤商品，我們深感抱歉！請於簽收包裹後 3 日內，拍下商品瑕疵處的照片，並與我們的線上客服聯繫。經確認為瑕疵/寄錯商品後，我們將承擔來回運費，並免費為您更換新品。
                  </div>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 樣式已遷移至全域 style.css */


/* 針對左側導覽重寫樣式讓它套用 borderSet 後不跑版 */
.nav-pills .nav-link {
  color: #6c757d;     
}
.nav-pills .nav-link:hover {
  color: #212529;
}



/* 隱藏原生捲軸但保留滾動 (選項較多時使用) */
#bulletinTabContent::-webkit-scrollbar {
  width: 6px;
}
#bulletinTabContent::-webkit-scrollbar-thumb {
  background-color: #ced4da;
  border-radius: 4px;
}
</style>

<script>
export default {
  name: 'VulletinView'
}
</script>