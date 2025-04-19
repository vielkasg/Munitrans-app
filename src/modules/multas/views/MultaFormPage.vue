<template>
  <ion-page>
    <PageHeader :title="headerTitle" />
    <ion-content class="ion-padding">
      <div class="page-container">
        <!-- Stepper de pasos -->
        <div class="stepper-container">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="stepper-item"
            :class="{
              'stepper-active': currentStep === index,
              'stepper-completed': currentStep > index,
            }"
          >
            <div class="stepper-circle">
              <ion-icon
                v-if="currentStep > index"
                :icon="checkmarkOutline"
              ></ion-icon>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="stepper-label">{{ step.label }}</div>
          </div>
        </div>

        <!-- Formulario paso 1: Datos Generales -->
        <div v-if="currentStep === 0" class="fade-in">
          <h3 class="section-title">Datos Generales</h3>
          <ion-item lines="none" class="form-item">
            <ion-select
              v-model="formData.tvehiculo"
              placeholder="Seleccione el tipo"
              interface="action-sheet"
              label="Tipo de Multa"
              label-placement="stacked"
              required
            >
              <ion-select-option
                v-for="tipo in tipoMultas"
                :value="tipo.cod"
                :key="tipo.cod"
                >{{ tipo.nombre }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.documento"
              type="text"
              placeholder="Ingrese el documento"
              label="Documento"
              label-placement="stacked"
              required
              :maxlength="13"
              inputmode="numeric"
            ></ion-input>
            <ion-button slot="end">
              <ion-icon :icon="searchOutline"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.nombre"
              type="text"
              placeholder="Ingrese el nombre"
              label="Nombre"
              label-placement="stacked"
              required
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.telefono"
              type="tel"
              placeholder="Ingrese el teléfono"
              label="Teléfono"
              label-placement="stacked"
              inputmode="numeric"
            ></ion-input>
          </ion-item>
        </div>

        <!-- Formulario paso 2: Datos del Vehículo -->
        <div v-if="currentStep === 1" class="fade-in">
          <h3 class="section-title">Datos del Vehículo</h3>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.marbete"
              type="text"
              placeholder="Ingrese el marbete"
              label="Marbete"
              label-placement="stacked"
              required
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-select
              v-model="formData.tvehiculo"
              placeholder="Seleccione el tipo"
              interface="action-sheet"
              label="Tipo de Vehículo"
              label-placement="stacked"
              required
            >
              <ion-select-option
                v-for="tipo in tipoVehiculos"
                :value="tipo.cod"
                :key="tipo.cod"
                >{{ tipo.nombre }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-select
              v-model="formData.marca"
              placeholder="Seleccione la marca"
              interface="action-sheet"
              label="Marca"
              label-placement="stacked"
              required
            >
              <ion-select-option
                v-for="marca in marcas"
                :value="marca.cod"
                :key="marca.cod"
                >{{ marca.nombre }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.modelo"
              type="text"
              placeholder="Ingrese el modelo"
              label="Modelo"
              label-placement="stacked"
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.color"
              type="text"
              placeholder="Ingrese el color"
              label="Color"
              label-placement="stacked"
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model.number="formData.anio"
              type="number"
              placeholder="Ingrese el año"
              label="Año"
              label-placement="stacked"
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.placa"
              type="text"
              placeholder="Ingrese la placa"
              label="Placa"
              label-placement="stacked"
              required
            ></ion-input>
          </ion-item>
          <ion-item lines="none" class="form-item">
            <ion-input
              v-model="formData.chasis"
              type="text"
              placeholder="Ingrese el chasis"
              label="Chasis"
              label-placement="stacked"
            ></ion-input>
          </ion-item>
        </div>

        <!-- Formulario paso 3: Datos Adicionales -->
        <div v-if="currentStep === 2" class="fade-in">
          <h3 class="section-title">Datos Adicionales</h3>

          <!-- Ubicación GPS -->
          <ion-card class="app-card location-card">
            <ion-card-header>
              <ion-card-title>Ubicación</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div v-if="formData.ubicacion.latitude">
                <p>Latitud: {{ formData.ubicacion.latitude }}</p>
                <p>Longitud: {{ formData.ubicacion.longitude }}</p>
                <p>Precisión: {{ formData.ubicacion.accuracy }} m</p>
              </div>
              <div v-else class="ion-text-center">
                <p>No se ha capturado la ubicación</p>
              </div>
              <ion-button
                expand="block"
                @click="obtenerUbicacion"
                :disabled="isLoadingLocation"
              >
                <ion-icon slot="start" :icon="locationOutline"></ion-icon>
                {{
                  isLoadingLocation
                    ? "Obteniendo ubicación..."
                    : "Obtener Ubicación"
                }}
              </ion-button>
            </ion-card-content>
          </ion-card>

          <!-- Fotos -->
          <ion-card class="app-card photos-card">
            <ion-card-header>
              <ion-card-title>Fotos</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="photos-grid">
                <div
                  v-for="(photo, index) in formData.fotos"
                  :key="index"
                  class="photo-item"
                >
                  <img :src="photo" alt="Foto de evidencia" />
                  <ion-button
                    fill="clear"
                    color="danger"
                    size="small"
                    class="delete-photo-btn"
                    @click="eliminarFoto(index)"
                  >
                    <ion-icon :icon="trashOutline"></ion-icon>
                  </ion-button>
                </div>
                <div class="add-photo-item" @click="tomarFoto">
                  <ion-icon :icon="cameraOutline"></ion-icon>
                  <span>Añadir foto</span>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Detalles -->
          <ion-item lines="none" class="form-item">
            <ion-label position="stacked">Detalles</ion-label>
            <ion-textarea
              v-model="formData.detalles"
              placeholder="Ingrese los detalles de la multa"
              :rows="8"
            ></ion-textarea>
          </ion-item>
        </div>

        <!-- Botones de navegación -->
        <div class="navigation-buttons">
          <ion-button v-if="currentStep > 0" fill="outline" @click="prevStep">
            <ion-icon slot="start" :icon="arrowBackOutline"></ion-icon>
            Anterior
          </ion-button>
          <ion-button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            :disabled="!isCurrentStepValid"
          >
            Siguiente
            <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
          </ion-button>
          <ion-button
            v-if="currentStep === steps.length - 1"
            @click="guardarMulta"
            :disabled="!isCurrentStepValid || isSubmitting"
          >
            <ion-icon slot="start" :icon="saveOutline"></ion-icon>
            {{ isSubmitting ? "Guardando..." : "Guardar Multa" }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonTextarea,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  toastController,
} from "@ionic/vue";
import {
  arrowForwardOutline,
  arrowBackOutline,
  saveOutline,
  checkmarkOutline,
  locationOutline,
  cameraOutline,
  trashOutline,
  searchOutline,
} from "ionicons/icons";
import { PageHeader } from "@/core/components/header";
import { Geolocation } from "@capacitor/geolocation";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import router from "@/router";
import api from "@/core/utils/axiosConfig";
import { loadingService } from "@/core/utils/loading";
import { API_URL } from "@/core/constants/api-url";
import { Capacitor } from "@capacitor/core";

// Definición de los pasos del formulario
const steps = [
  { label: "Datos Generales" },
  { label: "Datos del Vehículo" },
  { label: "Datos Adicionales" },
];

// Estado actual del formulario
const currentStep = ref(2);
const isSubmitting = ref(false);
const isLoadingLocation = ref(false);

// Datos del formulario
interface FormData {
  // Paso 1: Datos Generales
  documento: string;
  nombre: string;
  telefono: string;

  // Paso 2: Datos del Vehículo
  marbete: string;
  tvehiculo: string;
  marca: string;
  modelo: string;
  color: string;
  anio: number | null;
  placa: string;
  chasis: string;

  // Paso 3: Datos Adicionales
  ubicacion: {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
  };
  fotos: string[];
  detalles: string;
}

const formData = reactive<FormData>({
  documento: "",
  nombre: "",
  telefono: "",

  marbete: "",
  tvehiculo: "",
  marca: "",
  modelo: "",
  color: "",
  anio: null,
  placa: "",
  chasis: "",

  ubicacion: {
    latitude: null,
    longitude: null,
    accuracy: null,
  },
  fotos: [],
  detalles: "",
});

// Catalogos
const tipoVehiculos = ref<{ cod: string; nombre: string }[]>([]);
const marcas = ref<{ cod: string; nombre: string }[]>([]);
const tipoMultas = ref<{ cod: string; nombre: string }[]>([]);

// Título dinámico del header
const headerTitle = computed(() => {
  return `Nueva Multa - Paso ${currentStep.value + 1}`;
});

// Validación del paso actual
const isCurrentStepValid = computed(() => {
  if (currentStep.value === 0) {
    // Validar Datos Generales
    return formData.documento.trim() !== "" && formData.nombre.trim() !== "";
  } else if (currentStep.value === 1) {
    // Validar Datos del Vehículo
    return (
      formData.marbete.trim() !== "" &&
      formData.tvehiculo.trim() !== "" &&
      formData.marca.trim() !== "" &&
      formData.placa.trim() !== ""
    );
  } else if (currentStep.value === 2) {
    // Validar Datos Adicionales
    return (
      formData.ubicacion.latitude !== null &&
      formData.ubicacion.longitude !== null &&
      formData.fotos.length > 0
    );
  }
  return false;
});

// Navegación entre pasos
const nextStep = (): void => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = (): void => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

// Obtener ubicación GPS
const obtenerUbicacion = async (): Promise<void> => {
  try {
    isLoadingLocation.value = true;

    // Verificar permisos
    const permissionStatus = await Geolocation.checkPermissions();
    if (permissionStatus.location !== "granted") {
      await Geolocation.requestPermissions();
    }

    // Obtener ubicación
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    // Guardar ubicación
    formData.ubicacion.latitude = position.coords.latitude;
    formData.ubicacion.longitude = position.coords.longitude;
    formData.ubicacion.accuracy = position.coords.accuracy;

    // Mostrar toast de éxito
    const toast = await toastController.create({
      message: "Ubicación obtenida correctamente",
      duration: 2000,
      color: "success",
      position: "bottom",
    });
    await toast.present();
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);

    // Mostrar toast de error
    const toast = await toastController.create({
      message: "Error al obtener la ubicación. Intente nuevamente.",
      duration: 3000,
      color: "danger",
      position: "bottom",
    });
    await toast.present();
  } finally {
    isLoadingLocation.value = false;
  }
};

// Tomar foto con la cámara
const tomarFoto = async (): Promise<void> => {
  try {
    // Verificar permisos

    if (Capacitor.isNativePlatform()) {
      const permissionStatus = await Camera.checkPermissions();
      if (permissionStatus.camera !== "granted") {
        await Camera.requestPermissions();
      }
    }

    // Tomar foto
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    // Guardar foto
    if (image.dataUrl) {
      formData.fotos.push(image.dataUrl);
    }
  } catch (error) {
    console.error("Error al tomar la foto:", error);

    // Mostrar toast de error
    const toast = await toastController.create({
      message: "Error al tomar la foto. Intente nuevamente.",
      duration: 3000,
      color: "danger",
      position: "bottom",
    });
    await toast.present();
  }
};

// Eliminar foto
const eliminarFoto = (index: number): void => {
  formData.fotos.splice(index, 1);
};

// Guardar multa
const guardarMulta = async (): Promise<void> => {
  try {
    isSubmitting.value = true;

    // Mostrar loading
    await loadingService.show({
      message: "Guardando multa...",
    });

    console.log(formData);

    // Enviar datos al servidor
    // await api.post(API_URL.MULTAS_CREATE, formData);

    // Cerrar loading
    await loadingService.hide();

    // Mostrar toast de éxito
    const toast = await toastController.create({
      message: "Multa guardada correctamente",
      duration: 2000,
      color: "success",
      position: "bottom",
    });
    await toast.present();

    // Redirigir a la lista de multas
    router.push("/multas");
  } catch (error) {
    console.error("Error al guardar la multa:", error);

    // Mostrar toast de error
    const toast = await toastController.create({
      message: "Error al guardar la multa. Intente nuevamente.",
      duration: 3000,
      color: "danger",
      position: "bottom",
    });
    await toast.present();
  } finally {
    isSubmitting.value = false;
    await loadingService.hide();
  }
};

onMounted(() => {
  cargarTipoVehiculos();
  cargarMarcas();
  cargarTipoMultas();
});

const cargarTipoVehiculos = async () => {
  try {
    const response = await api.get(API_URL.CAT_TIPO_VEHICULO);
    const { data } = response.data;
    tipoVehiculos.value = data;
  } catch (error) {
    console.error("Error al cargar los tipos de vehículos:", error);
  }
};

const cargarMarcas = async () => {
  try {
    const response = await api.get(API_URL.CAT_MARCA);
    const { data } = response.data;
    marcas.value = data;
  } catch (error) {
    console.error("Error al cargar las marcas:", error);
  }
};

const cargarTipoMultas = async () => {
  try {
    const response = await api.get(API_URL.CAT_MULTAS);
    const { data } = response.data;
    tipoMultas.value = data;
  } catch (error) {
    console.error("Error al cargar los tipos de multas:", error);
  }
};
</script>

<style scoped>
/* Estilos para el stepper */
.stepper-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
}

.stepper-container::before {
  content: "";
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--ion-color-medium);
  z-index: 1;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.stepper-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--ion-color-medium);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-weight: bold;
}

.stepper-label {
  font-size: 12px;
  color: var(--ion-color-medium);
  text-align: center;
}

.stepper-active .stepper-circle {
  background-color: var(--primary-color);
}

.stepper-active .stepper-label {
  color: var(--primary-color);
  font-weight: bold;
}

.stepper-completed .stepper-circle {
  background-color: var(--ion-color-success);
}

.stepper-completed .stepper-label {
  color: var(--ion-color-success);
}

/* Estilos para los formularios */
.form-item {
  margin-bottom: 16px;
  --padding-start: 0;
  --border-radius: 12px;
}

ion-item::part(native) {
  padding: 8px;
}

/* Estilos para los botones de navegación */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

/* Estilos para la sección de fotos */
.photos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
}

.photo-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-photo-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  --padding-start: 4px;
  --padding-end: 4px;
  --padding-top: 4px;
  --padding-bottom: 4px;
}

.add-photo-item {
  aspect-ratio: 1;
  border: 2px dashed var(--ion-color-medium);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ion-color-medium);
}

.add-photo-item ion-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

/* Estilos para la tarjeta de ubicación */
.location-card,
.photos-card {
  margin-bottom: 16px;
}
</style>
