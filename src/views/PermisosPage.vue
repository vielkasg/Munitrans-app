<template>
  <ion-page>
    <PageHeader title="Permisos" />
    <ion-content>
      <GridList
        :items="permisos"
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
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { GridList } from "@core/components/grid";
import { IonPage, IonContent } from "@ionic/vue";
import api from "@core/utils/axiosConfig";
import { loadingService } from "@core/utils/loading";
import { ref, onMounted } from "vue";
import { PageHeader } from "@core/components/header";

const permisos = ref([]);

const loadPermisos = async () => {
  try {
    loadingService.show();
    const response = await api.get("/permisos/lista");
    const { data } = response.data;
    permisos.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingService.hide();
    console.log("Multas loaded");
  }
};

onMounted(() => {
  loadPermisos();
});
</script>

<style scoped></style>
