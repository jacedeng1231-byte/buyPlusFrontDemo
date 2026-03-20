import { reactive } from 'vue';

export const store = reactive({
  cart: [],
  orders: [], // 紀錄歷史訂單
  favorites: [], // 我的收藏
  isLoggedIn: false, // 登入狀態 (預設未登入)
  cartAnimations: [], // 用於存放飛向購物車的動畫物件
  user: {
    id: 'BP-881234',
    lastName: '林',
    firstName: '玉珊',
    name: '林玉珊',
    email: 'lin@example.com',
    phone: '0912345678',
    provider: 'line',
    avatar: 'https://i.pravatar.cc/150?u=antigravity',
    address: '台東縣鹿野鄉中華路三段 123 號'
  },
  isSidebarCollapsed: false, // 側邊欄收折狀態 (僅限電腦版)
  isMobileMenuOpen: false, // 手機版選單狀態
  assistant: {
    state: 'idle', // 'idle', 'processing', 'success', 'error'
    message: '',
    actionLabel: '', // 動作按鈕文字
    actionCallback: null, // 按鈕點擊後的回報函式
    isVisible: false,
    timeout: null
  },
  coupon: {
    code: '',
    discount: 0,
    isApplied: false
  },
  get cartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },
  get cartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  get appliedDiscount() {
    // 滿 1000 折 100 (每滿 1000 累計)
    const promoDiscount = Math.floor(this.cartTotal / 1000) * 100;
    const couponDiscountAmount = this.coupon.isApplied ? Math.floor(this.cartTotal * this.coupon.discount) : 0;
    
    return promoDiscount + couponDiscountAmount;
  },
  get isFreeShipping() {
    // 滿 1200 免運
    return this.cartTotal >= 1200;
  },
  get pendingPaymentTotal() {
    // 只加總「待付款」狀態的訂單金額
    return this.orders
      .filter(order => order.status === '待付款')
      .reduce((total, order) => total + order.total, 0);
  },
  login(provider) {
    this.isLoggedIn = true;
    this.user.provider = provider;
  },
  logout() {
    this.isLoggedIn = false;
    this.user.provider = '';
  },
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  },
  // 觸發購物車動畫
  triggerAnimation(x, y, image) {
    const id = Date.now();
    this.cartAnimations.push({ id, x, y, image });
    // 動畫完成後移除 (假設動畫時間為 1 秒)
    setTimeout(() => {
      this.cartAnimations = this.cartAnimations.filter(a => a.id !== id);
    }, 1000);
  },
  // 收藏操作
  toggleFavorite(product) {
    if (!this.isLoggedIn) {
      this.showAssistantMessage("想收藏心儀商品嗎？登入後我就能幫您記在帳號裡囉！🦊💖", 'idle', 6000);
      this.openMobileMenu();
      return;
    }
    const index = this.favorites.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push({ ...product });
    }
  },
  isFavorite(productId) {
    return this.favorites.some(item => item.id === productId);
  },
  // 購物車操作 (支援規格)
  addToCart(product, spec = null) {
    // 比對 ID 與 規格 (若有)
    const existingItem = this.cart.find(item => {
      const isSameId = item.id === product.id;
      const isSameSpec = JSON.stringify(item.spec) === JSON.stringify(spec);
      return isSameId && isSameSpec;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        spec: spec ? { ...spec } : null
      });
    }

    // Trigger Assistant Success
    this.showAssistantMessage(`品味真好！「${product.name}」已加入您的口袋名單囉！🦊✨`, 'success', 4000);
  },
  createOrder(orderData) {
    const now = new Date();
    const orderId = '#ORD-' + now.getFullYear() + 
                    String(now.getMonth() + 1).padStart(2, '0') + 
                    String(now.getDate()).padStart(2, '0') + 
                    Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const newOrder = {
      id: orderId,
      date: now.toISOString().split('T')[0],
      status: '待付款',
      items: [...this.cart.map(item => ({ ...item, qty: item.quantity }))],
      subtotal: this.cartTotal,
      shippingFee: orderData.shippingFee,
      total: this.cartTotal + orderData.shippingFee,
      paymentMethod: orderData.paymentMethod || '銀行轉帳',
      logs: [
        { date: now.toLocaleString(), action: '訂單成立', note: '系統自動產生' }
      ],
      shipping: {
        name: this.user.name,
        phone: '0912-345-678',
        address: orderData.address || '尚未填寫'
      }
    };
    
    this.orders.unshift(newOrder);
    this.clearCart();

    // Trigger Assistant Success
    this.showAssistantMessage(`訂單 #${orderId} 成立啦！我會幫您盯著進度的！🚚💨`, 'success', 5000);
    
    return newOrder;
  },
  reportTransfer(orderId, reportData) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = '處理中';
      order.transferReport = {
        ...reportData,
        reportTime: new Date().toLocaleString()
      };
      order.logs.push({
        date: new Date().toLocaleString(),
        action: '匯款回報',
        note: `後五碼: ${reportData.lastFiveDigits}, 金額: ${reportData.amount}`
      });
    }
  },
  updateQuantity(productId, quantity, spec = null) {
    const item = this.cart.find(i => i.id === productId && JSON.stringify(i.spec) === JSON.stringify(spec));
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeFromCart(productId, spec);
      }
    }
  },
  removeFromCart(productId, spec = null) {
    const index = this.cart.findIndex(item => item.id === productId && JSON.stringify(item.spec) === JSON.stringify(spec));
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  },
  clearCart() {
    this.cart = [];
  },
  // Assistant Actions
  setAssistantState(state) {
    this.assistant.state = state;
  },
  showAssistantMessage(message, state = 'idle', duration = 5000, action = null) {
    this.assistant.message = message;
    this.assistant.state = state;
    this.assistant.isVisible = true;
    
    if (action) {
      this.assistant.actionLabel = action.label;
      this.assistant.actionCallback = action.callback;
    } else {
      this.assistant.actionLabel = '';
      this.assistant.actionCallback = null;
    }

    if (this.assistant.timeout) {
      clearTimeout(this.assistant.timeout);
    }

    if (duration > 0) {
      this.assistant.timeout = setTimeout(() => {
        this.assistant.message = '';
        this.assistant.state = 'idle';
        this.assistant.actionLabel = '';
        this.assistant.actionCallback = null;
        this.assistant.timeout = null;
      }, duration);
    }
  },
  openMobileMenu() {
    this.isMobileMenuOpen = true;
    // 重置狀態，避免下次失效
    setTimeout(() => {
      this.isMobileMenuOpen = false;
    }, 500);
  },
  applyCoupon(code) {
    if (code.toUpperCase() === 'BUYPLUS2026') {
      this.coupon.code = code.toUpperCase();
      this.coupon.discount = 0.1; // 10%
      this.coupon.isApplied = true;
      return { success: true, message: '優惠卷套用成功！享 9 折優惠 🎊' };
    }
    return { success: false, message: '無效的優惠碼，請再試一次 ❌' };
  },
  removeCoupon() {
    this.coupon.code = '';
    this.coupon.isApplied = false;
  }
});
