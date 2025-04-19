export enum API_URL {
  // Franjas
  FRANJAS_LISTA = "/v1/franjas/lista/{page}/{size}",
  FRANJA_DETAILS = "/v1/franjas/detalle/{cod}",

  // Permisos
  PERMISO_DETAIL = "/v1/permisos/detalle/{cod}",

  // Multas
  MULTAS_CREATE = "/v1/multas/registro",
  MULTAS_LISTA = "/v1/multas/lista",
  MULTAS_DETAILS = "/v1/multas/detalle/{cod}",

  // catalogos
  CAT_MULTAS = "/v1/catalogo/multas",
  CAT_TIPO_VEHICULO = "/v1/catalogo/tipo-vehiculos",
  CAT_RUTAS = "/v1/catalogo/rutas",
  CAT_MARCA = "/v1/catalogo/marcas",
}
