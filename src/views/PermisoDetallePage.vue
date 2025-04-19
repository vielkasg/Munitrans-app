<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Permiso Detalle</IonTitle>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Información de Permiso</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="4"><strong>Código:</strong></ion-col>
                            <ion-col size="8">{{
                                permiso?.cod || "N/A"
                            }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Nombre:</strong></ion-col>
                            <ion-col size="8">{{
                                permiso?.nombre || "N/A"
                            }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"
                                ><strong>Estado: </strong></ion-col
                            >
                            <ion-col size="8">
                                <ion-badge
                                    :color="
                                        permiso?.stad ? 'success' : 'danger'
                                    "
                                >
                                    {{ permiso?.stad ? "Activo" : "Inactivo" }}
                                </ion-badge>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"
                                ><strong>Vencimiento:</strong></ion-col
                            >
                            <ion-col size="8">
                                <ion-badge
                                    :color="
                                        permiso?.vencido ? 'warning' : 'success'
                                    "
                                >
                                    {{
                                        permiso?.vencido
                                            ? "Vencido"
                                            : "En curso"
                                    }}
                                </ion-badge>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { API_URL } from "@/core/constants/api-url";
import api from "@/core/utils/axiosConfig";
import { loadingService } from "@/core/utils/loading";
import router from "@/router";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
const permiso = ref();
const loadPermiso = async () => {
    const cod = router.currentRoute.value.params.cod as string;
    try {
        loadingService.show();
        const { data: datoPermiso } = await api.get(
            API_URL.PERMISO_DETAIL.replace(/{cod}/, cod),
        );
        permiso.value = datoPermiso.data;
    } catch (error) {
        console.error(error);
    } finally {
        loadingService.hide();
    }
};

onMounted(async () => {
    await loadPermiso();
});
</script>
