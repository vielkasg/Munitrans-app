<template>
  <ion-page>
    <ion-content>
      <ion-img src="/banner-santiago.jpeg" class="banner"></ion-img>

      <ion-card class="app-card">
        <ion-card-header>
          <ion-card-title>Login</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
              v-model="username"
              label="Usuario"
              label-placement="floating"
              :clear-input="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="password"
              type="password"
              label="Clave"
              label-placement="floating"
              :clear-input="true"
            ></ion-input>
          </ion-item>
          <ion-button @click="login" expand="block">Iniciar Sesión</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
  IonItem,
  IonImg,
} from "@ionic/vue";
import { ref } from "vue";
import api from "@/core/utils/axiosConfig";
import { setToken } from "@/core/utils/auth";
import router from "@/router";

const username = ref("");
const password = ref("");
interface LoginResponse {
  access_token: string;
  user: {
    cod: number;
    username: string;
    nombre: string;
    email: string;
  };
}
const login = async () => {
  const path = router.currentRoute.value.query.redirect as string;
  try {
    const response = await api.post<LoginResponse>("/v1/auth/login", {
      username: username.value,
      clave: password.value,
    });
    const { access_token } = response.data;
    setToken(access_token);
    router.replace(path || "/inicio");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
</script>
<style scoped></style>
