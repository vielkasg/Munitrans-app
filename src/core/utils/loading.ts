import { loadingController } from "@ionic/vue";

interface LoadingOptions {
  message?: string;
  duration?: number;
}
/**
 * Servicio para manejar el loading de la aplicación
 *
 * @class
 * @classdesc Servicio para manejar el loading de la aplicación
 * @property {HTMLIonLoadingElement | null} loading - Elemento de loading
 */
class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  /**
   * Muestra el loading
   * @param {LoadingOptions} options - Opciones para el loading
   * @returns {Promise<void>}
   */
  async show(options: LoadingOptions = {}): Promise<void> {
    const defaultOptions: LoadingOptions = {
      message: "Cargando...",
      duration: 0,
    };

    this.loading = await loadingController.create({
      ...defaultOptions,
      ...options,
    });

    await this.loading.present();
  }

  /**
   * Oculta el loading
   * @returns {Promise<void>}
   */
  async hide(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}

export const loadingService = new LoadingService();
