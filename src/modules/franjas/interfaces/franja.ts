export interface Franja {
  cod: string;
  nombre: string;
  cedula: string;
  ruta: string;
  ficha: string;
  marca: string;
  modelo: string;
  color: string;
  placa: string;
  chasis: string;
  anno: string;
  motor: string | null;
  direccion: string;
  telefono: string;
  whatsapp: string;
  email: string;
  stad: string;
  choferes: Chofer[];
}

export interface Chofer {
  cod: string;
  cfranja: string;
  documento: string;
  nombre: string;
  telefon: string;
  whatsapp: string;
  email: string;
  foto: string;
  stad: string;
}
