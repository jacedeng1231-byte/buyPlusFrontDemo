import { reactive } from 'vue';

export const store = reactive({
  cart: [],
  orders: [], // 紀錄歷史訂單
  favorites: [], // 我的收藏
  isLoggedIn: false, // 登入狀態 (預設未登入)
  user: {
    name: '林玉珊',
    id: 1,
    avatar: 'https://i.pravatar.cc/100',
    address: '123台灣台東縣府前郵局',
    provider: ''
  },
  isSidebarCollapsed: false, // 側邊欄收折狀態 (僅限電腦版)
  get cartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },
  get cartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
  // 收藏操作
  toggleFavorite(product) {
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
  }
});
