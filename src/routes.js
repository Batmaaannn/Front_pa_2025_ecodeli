import Register from './components/register/register.vue'
import RegisterDeliverer from '@/components/register/RegisterDeliverer.vue'
import RegisterClient from '@/components/register/RegisterClient.vue'
import RegisterMerchant from '@/components/register/RegisterMerchant.vue'
import RegisterProvider from '@/components/register/RegisterProvider.vue'
import Login from "@/components/Login.vue";
import Users from "@/components/backoffice/Users.vue";
import Payments from "@/components/backoffice/Payments.vue";
import LandingPage from "@/components/LandingPage.vue";

export const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/register/deliverer', component: RegisterDeliverer },
    { path: '/register/client', component: RegisterClient },
    { path: '/register/merchant', component: RegisterMerchant },
    { path: '/register/provider', component: RegisterProvider },
    { path: '/backoffice/user', component: Users },
    { path: '/backoffice/payments', component: Payments },
]
