<template>
  <ion-page>
    <PageHeader title="Inicio" :showBackButton="false" />
    <ion-content class="ion-padding-bottom">
      <div class="banner-container">
        <ion-img src="/banner-santiago.jpeg" class="banner"></ion-img>
      </div>

      <div class="profile-container">
        <ion-avatar class="profile-avatar">
          <ion-img src="/munitrans-logo.jpeg"></ion-img>
        </ion-avatar>
        <h2 class="profile-title">Munitrans</h2>
      </div>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-button
              expand="block"
              size="large"
              class="qr-button"
              @click="runQrScanner"
            >
              <ion-icon slot="start" :icon="qrCode" />
              ESCANEAR QR
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button
              expand="block"
              size="large"
              class="qr-button"
              style="--background: #ea4335"
              @click="agregarMulta"
            >
              <ion-icon slot="start" :icon="alertCircleOutline" />
              MULTAR
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="page-container content-section">
        <h3 class="section-title">Servicios</h3>
        <ion-grid>
          <ion-row>
            <ion-col
              size="6"
              v-for="(p, i) in appPages"
              :key="i"
              @click="() => router.push(p.url)"
            >
              <div class="app-card flex-center flex-column fade-in">
                <div class="icon-circle" :class="`icon-${getIconClass(i)}`">
                  <ion-icon :icon="getIconForService(i)"></ion-icon>
                </div>
                <h4 class="app-card-title text-center">{{ p.title }}</h4>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCol,
  IonAvatar,
  IonImg,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import {
  qrCode,
  cardOutline,
  alertCircleOutline,
  documentTextOutline,
  cashOutline,
} from "ionicons/icons";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";
import router from "@/router";
import { onMounted } from "vue";
import { PageHeader } from "@/core/components/header";

interface AppPage {
  readonly title: string;
  readonly url: string;
}

const appPages: readonly AppPage[] = [
  {
    title: "Franjas",
    url: "/franjas",
  },
  {
    title: "Multas",
    url: "/multas",
  },
  {
    title: "Permisos",
    url: "/permisos",
  },
  {
    title: "Recaudaciones",
    url: "/",
  },
];

const getIconForService = (index: number): string => {
  const icons = [
    cardOutline,
    alertCircleOutline,
    documentTextOutline,
    cashOutline,
  ];
  return icons[index];
};

const getIconClass = (index: number): string => {
  const classes = ["primary", "danger", "warning", "success"];
  return classes[index];
};

const runQrScanner = async (): Promise<void> => {
  const { ScanResult } = await CapacitorBarcodeScanner.scanBarcode({
    hint: CapacitorBarcodeScannerTypeHint.ALL,
  });

  router.push(`/permiso/${ScanResult}`);
};
const agregarMulta = () => {
  router.push("/multas/nueva");
};
onMounted(() => {});
</script>
<style scoped>
/* Estilos específicos del componente */

/* Banner Styles */
.banner-container {
  position: relative;
  margin-bottom: 60px;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px;
  color: white;
}

.banner-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Profile Styles */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border: 4px solid var(--card-color);
  box-shadow: var(--shadow-md);
}

.profile-title {
  margin-top: 10px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-color);
}

/* QR Button Styles */
.qr-button {
  font-size: 0.9rem;
}

/* Tarjetas de servicio */
.app-card {
  padding: 20px;
  height: 130px;
}
</style>
