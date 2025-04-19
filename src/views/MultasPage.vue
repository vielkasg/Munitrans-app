<template>
  <ion-page>
    <PageHeader title="Multas" />
    <ion-content>
      <MultaFilter />
      <GridList
        :items="multas"
        :itemsPerRow="1"
        :content-fields="[
          {
            label: 'Nombre',
            field: 'nombre',
          },
          {
            label: 'Vehículo',
            field: 'vehiculo',
          },
        ]"
        titleField="cod"
        key-field="id"
      >
        <template #actions="{ item }">
          <ion-button>Ver</ion-button>
        </template>
      </GridList>
    </ion-content>
    <IonFab horizontal="end" vertical="bottom">
      <ion-fab-button @click="agregarMulta">
        <IonIcon :icon="add" />
      </ion-fab-button>
    </IonFab>
  </ion-page>
</template>

<script setup lang="ts">
import MultaFilter from "@/modules/multas/components/MultaFilter.vue";
import { GridList } from "@/core/components/grid";
import { IonPage, IonContent, IonIcon, IonFab } from "@ionic/vue";
import { add } from "ionicons/icons";
import api from "@/core/utils/axiosConfig";
import { loadingService } from "@/core/utils/loading";
import { ref, onMounted } from "vue";
import { PageHeader } from "@/core/components/header";
import router from "@/router";

const multas = ref([]);

const loadMultas = async () => {
  try {
    loadingService.show();
    const response = await api.get("/v1/multas/lista");
    const { data } = response.data;
    multas.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingService.hide();
    console.log("Multas loaded");
  }
};

const agregarMulta = () => {
  router.push("/multas/nueva");
};

onMounted(() => {
  loadMultas();
});
</script>

<style scoped></style>
