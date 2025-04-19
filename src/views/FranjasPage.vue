<template>
  <ion-page>
    <PageHeader title="Franjas" />
    <ion-content class="ion-padding-bottom">
      <div class="page-container">
        <FranjaFilter @apply-filters="applyFilters" />
        <GridList
          :items="franjas"
          title-field="cod"
          :content-fields="[
            { label: 'Encargado', field: 'nombre', color: 'red' },
          ]"
          key-field="cod"
          :items-per-row="2"
        >
          <template #actions="{ item }">
            <ion-button @click="handleItemClicked(item)">Ver</ion-button>
          </template>
        </GridList>
        <ion-infinite-scroll
          @ionInfinite="loadData($event)"
          :disabled="isInfiniteDisabled"
        >
          <ion-infinite-scroll-content
            loading-spinner="bubbles"
            loading-text="Cargando más franjas..."
          >
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import api from "@/core/utils/axiosConfig";
import { Franja } from "@/modules/franjas/interfaces/franja";
import router from "@/router";
import { API_URL } from "@/core/constants/api-url";
import { loadingService } from "@/core/utils/loading";
import FranjaFilter from "@/modules/franjas/components/FranjaFilter.vue";
import { GridList } from "@/core/components/grid";
import { PageHeader } from "@/core/components/header";

const franjas = ref<{ cod: string; nombre: string }[]>([]);
const page = ref(1);

const isInfiniteDisabled = ref(false);

const filters = ref({
  route: "all",
  status: "all",
  search: "",
});

const loadData = async ($event?: any) => {
  loadingService.show({
    message: "Cargando las franjas",
  });
  try {
    const url = `${API_URL.FRANJAS_LISTA.replace(
      /{page}/,
      page.value.toString()
    ).replace(/{size}/, "10")}`;

    const response = await api.get(url, {
      params: {
        ruta: filters.value.route,
      },
    });
    const { data } = response.data;

    if (data.length === 0) {
      isInfiniteDisabled.value = true;
      if ($event) {
        $event.target.complete();
      }
      return;
    }

    if ($event) {
      franjas.value = [...franjas.value, ...data];
      $event.target.complete();
    } else {
      franjas.value = data;
    }

    page.value++;
  } catch (error) {
    console.error("Error al cargar las franjas:", error);
  } finally {
    loadingService.hide();
  }
};

const applyFilters = async (filter: any) => {
  console.log("Filtros aplicados:", filter);
  filters.value = filter;
  console.log("Filtros aplicados:", filters);
  loadData();
};

const handleItemClicked = (item: Franja) => {
  router.push(`/detalle/${item.cod}`);
};

onMounted(() => {
  loadData();
});
</script>
