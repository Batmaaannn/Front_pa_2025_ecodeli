import Home from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Users from "@/components/backoffice/Users.vue";
import Payments from "@/components/backoffice/Payments.vue";

export const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/backoffice/user', component: Users},
    {path: '/backoffice/payments', component: Payments},
]