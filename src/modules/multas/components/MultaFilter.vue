<template>
  <ion-grid>
    <ion-row class="ion-no-padding">
      <ion-col size="12">
        <h5>Estado</h5>
        <ion-radio-group v-model="filters.status">
          <ion-row class="ion-no-padding">
            <ion-col size="4">
              <ion-radio value="all">Todos</ion-radio>
            </ion-col>
            <ion-col size="4">
              <ion-radio value="active">Activos</ion-radio>
            </ion-col>
            <ion-col size="4">
              <ion-radio value="inactive">Inactivos</ion-radio>
            </ion-col>
          </ion-row>
        </ion-radio-group>
      </ion-col>

      <!-- <ion-col size="12">
        <h5>Fecha</h5>
        <ion-datetime-button datetime="datetime"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="datetime"
            presentation="date"
            :format-options="{
              date: {
                weekday: 'long',
                month: 'long',
                day: '2-digit',
              },
            }"
            locale="es-ES"
            @ionChange="onChange"
          ></ion-datetime>
        </ion-modal>
      </ion-col> -->
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-button @click="applyFilters" expand="block" class="apply-button"
          >APLICAR</ion-button
        >
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const emit = defineEmits(["apply-filters"]);

const filters = reactive({
  status: "all",
  date: "",
});

const applyFilters = () => {
  emit("apply-filters", filters);
};
</script>
