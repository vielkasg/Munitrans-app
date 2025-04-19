import { createRouter, createWebHistory } from "@ionic/vue-router";
import {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { isAuthenticated } from "@/core/utils/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/inicio",
  },
  {
    path: "/login",
    component: () => import("@/views/loginPage.vue"),
  },
  {
    path: "/franjas",
    component: () => import("@/views/FranjasPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/detalle/:cod",
    component: () => import("@/views/FranjaDetailsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/inicio",
    component: () => import("@/views/InicioPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/multas",
    component: () => import("@/views/MultasPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/multas/nueva",
    component: () => import("@/modules/multas/views/MultaFormPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/permisos",
    component: () => import("@/views/PermisosPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/permiso/:cod",
    component: () => import("@/views/PermisoDetallePage.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guardia de autenticación
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const isUserAuthenticated = isAuthenticated();
    // to.meta.requiresAuth = to.meta.requiresAuth || false;

    if (to.meta.requiresAuth && !isUserAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else if (to.path === "/login" && isUserAuthenticated) {
      next("/inicio");
    } else {
      next();
    }
  },
);

export default router;
