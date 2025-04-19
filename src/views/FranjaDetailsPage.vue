<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Detalle de Franja</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title
                        >Información de Franja {{ franjaId }}</ion-card-title
                    >
                </ion-card-header>
                <ion-card-content>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="4"><strong>Código:</strong></ion-col>
                            <ion-col size="8">{{
                                franja?.cod || "N/A"
                            }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Nombre:</strong></ion-col>
                            <ion-col size="8">{{
                                franja?.nombre || "N/A"
                            }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Estado:</strong></ion-col>
                            <ion-col size="8">
                                <ion-badge
                                    :color="franja?.stad ? 'success' : 'danger'"
                                >
                                    {{ franja?.stad ? "Activo" : "Inactivo" }}
                                </ion-badge>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>

            <ion-segment v-model="selectedSegment">
                <ion-segment-button value="choferes">
                    <ion-label>Choferes</ion-label>
                </ion-segment-button>
                <ion-segment-button value="pagos">
                    <ion-label>Pagos</ion-label>
                </ion-segment-button>
            </ion-segment>

            <ion-card v-if="selectedSegment === 'choferes'">
                <ion-card-header>
                    <ion-card-title>Choferes Asignados</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item
                            v-for="(chofer, index) in franja?.choferes"
                            :key="index"
                        >
                            <ion-avatar slot="end">
                                <img :src="chofer.foto" :alt="chofer.nombre" />
                            </ion-avatar>
                            <ion-label>
                                <h2>{{ chofer.nombre }}</h2>
                                <p>Documento: {{ chofer.documento }}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item v-if="!franja?.choferes.length">
                            <ion-label>No hay choferes asignados</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-card v-if="selectedSegment === 'pagos'">
                <ion-card-header>
                    <ion-card-title>Estado de Pagos</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item
                            v-for="(pago, index) in mockPagos"
                            :key="index"
                        >
                            <ion-label>
                                <h2>{{ pago.concepto }}</h2>
                                <p>Fecha: {{ pago.fecha }}</p>
                                <p>Concepto</p>
                            </ion-label>
                            <ion-badge
                                slot="end"
                                :color="
                                    pago.estado === 'Pagado'
                                        ? 'success'
                                        : 'warning'
                                "
                            >
                                {{ pago.estado }}
                            </ion-badge>
                            <ion-note slot="end">{{ pago.monto }}</ion-note>
                        </ion-item>
                        <ion-item v-if="!mockPagos.length">
                            <ion-label>No hay registros de pagos</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { API_URL } from "@/core/constants/api-url";
import api from "@/core/utils/axiosConfig";
import { loadingService } from "@/core/utils/loading";
import { Franja } from "@/modules/franjas/interfaces/franja";
import router from "@/router";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonBadge,
    IonNote,
    IonList,
    IonItem,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/vue";
import { ref, onMounted } from "vue";

const mockPagos = [
    {
        concepto: "Pago 1",
        fecha: "2023-01-01",
        estado: "Pagado",
        monto: "100.00",
    },
    {
        concepto: "Pago 2",
        fecha: "2023-01-02",
        estado: "Pagado",
        monto: "200.00",
    },
];

const selectedSegment = ref("choferes");

const franja = ref<Franja>();

const franjaId = ref("");

const cargarDetalleFranja = async () => {
    loadingService.show({
        message: "Cargando el detalle de la franja",
    });
    try {
        const response = await api.get(
            API_URL.FRANJA_DETAILS.replace("{cod}", franjaId.value),
        );
        const { data } = response.data;
        franja.value = data;
        console.log(data);
    } catch (error) {
        console.error("Error al cargar el detalle de la franja:", error);
    } finally {
        loadingService.hide();
    }
};

onMounted(() => {
    franjaId.value = String(router.currentRoute.value.params.cod);

    cargarDetalleFranja();
});
</script>
