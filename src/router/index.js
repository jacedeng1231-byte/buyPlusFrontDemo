import { createRouter, createWebHashHistory } from "vue-router"

import Home from "../views/HomeView.vue"
import Member from '../views/MemberView.vue'
import Vulletin from '../views/VulletinView.vue'
import Order from '../views/OrderView.vue'
import Checkout from '../views/CheckoutView.vue'
import Product from '../views/ProductView.vue'
import Favorite from '../views/FavoriteView.vue'
import MoneyTransfer from '../views/MoneyTransferView.vue'

const routes = [
  { path: "/", component: Home },
  { path: "/member", component: Member},
  { path: "/vulletin", component: Vulletin},
  { path: "/order", component: Order},
  { path: "/checkout", component: Checkout},
  { path: "/products", component: Product},
  { path: "/favorite", component: Favorite},
  { path: "/money-transfer", component: MoneyTransfer},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router