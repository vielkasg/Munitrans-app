<template>
  <div class="filter-container">
    <div class="filter-header">
      <h2 class="filter-title">Lista de Franjas</h2>
    </div>

    <div class="filter-content">
      <div class="route-selector">
        <ion-select
          fill="outline"
          label="Ruta"
          v-model="filters.route"
          interface="popover"
          class="modern-select"
        >
          <ion-select-option value="all">Todos</ion-select-option>
          <ion-select-option
            v-for="ruta in rutas"
            :value="ruta.cod"
            :key="ruta.cod"
            >{{ ruta.nombre }}</ion-select-option
          >
        </ion-select>

        <ion-button
          class="filter-toggle-button"
          fill="clear"
          @click="toggleFilters"
        >
          <ion-icon
            :icon="funnel"
            :color="isFilterOpen ? 'primary' : 'medium'"
            size="small"
          ></ion-icon>
        </ion-button>
      </div>

      <div v-if="isFilterOpen">
        <div class="filter-section">
          <h3 class="filter-section-title">Estado</h3>
          <ion-radio-group v-model="filters.status" class="status-radio-group">
            <ion-row>
              <ion-col size="4">
                <ion-item lines="none" class="radio-item">
                  <ion-radio value="all">Todos</ion-radio>
                </ion-item>
              </ion-col>
              <ion-col size="4">
                <ion-item lines="none" class="radio-item">
                  <ion-radio value="active">Activos</ion-radio>
                </ion-item>
              </ion-col>
              <ion-col size="4">
                <ion-item lines="none" class="radio-item">
                  <ion-radio value="inactive">Inactivos</ion-radio>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-radio-group>
        </div>

        <div class="filter-section">
          <ion-input
            fill="outline"
            v-model="filters.search"
            label="Buscar por nombre"
            label-placement="floating"
            :clear-input="true"
            class="search-input"
          ></ion-input>
        </div>
      </div>

      <ion-button @click="applyFilters" expand="block" class="apply-button"
        >APLICAR</ion-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { API_URL } from "@/core/constants/api-url";
import api from "@/core/utils/axiosConfig";
import {
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonItem,
} from "@ionic/vue";
import { funnel } from "ionicons/icons";
import { onMounted, reactive, ref } from "vue";

const emit = defineEmits(["apply-filters"]);

const filters = reactive({
  search: "",
  status: "all",
  route: "all",
});

const rutas = ref<{ cod: string; nombre: string }[]>([]);

const isFilterOpen = ref(false);

const toggleFilters = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const applyFilters = () => {
  emit("apply-filters", filters);
};

onMounted(() => {
  cargarRutas();
});

const cargarRutas = async () => {
  try {
    const response = await api.get(API_URL.CAT_RUTAS);
    const data = response.data;
    rutas.value = data;
  } catch (error) {
    console.error("Error al cargar las rutas:", error);
  }
};
</script>

<style scoped>
.filter-container {
  background-color: var(--card-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  margin-bottom: 16px;
}

.filter-header {
  padding: 16px 16px 8px 16px;
}

.filter-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.filter-content {
  padding: 0 16px 16px 16px;
}

.route-selector {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.modern-select {
  flex: 1;
  --padding-start: 12px;
  --padding-end: 12px;
  --border-radius: var(--border-radius-sm);
}

.filter-toggle-button {
  margin-left: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  height: 40px;
  width: 40px;
}

.filter-section {
  margin-bottom: 16px;
}

.filter-section-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 8px 0;
}

.status-radio-group {
  width: 100%;
}

.radio-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.search-input {
  --border-radius: var(--border-radius-sm);
  --padding-start: 12px;
  --padding-end: 12px;
}

.apply-button {
  margin-top: 8px;
  --background: var(--primary-color);
  font-weight: 600;
  letter-spacing: 0.5px;
  height: 44px;
}
</style>
