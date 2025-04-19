<template>
  <ion-header class="ion-no-border">
    <ion-toolbar class="page-header">
      <ion-title class="page-title">{{ title }}</ion-title>
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button :default-href="defaultHref"></ion-back-button>
      </ion-buttons>
      <slot name="end-buttons"></slot>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";

interface PageHeaderProps {
  /**
   * Título que se mostrará en el encabezado
   */
  readonly title: string;
  
  /**
   * Indica si se debe mostrar el botón de retroceso
   * @default true
   */
  readonly showBackButton?: boolean;
  
  /**
   * Ruta por defecto a la que se redirigirá al presionar el botón de retroceso
   * @default "/"
   */
  readonly defaultHref?: string;
}

withDefaults(defineProps<PageHeaderProps>(), {
  showBackButton: true,
  defaultHref: "/",
});
</script>
