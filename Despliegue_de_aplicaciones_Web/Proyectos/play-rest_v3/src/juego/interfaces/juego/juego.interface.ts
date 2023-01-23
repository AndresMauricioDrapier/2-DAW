export interface Juego {
  nombre: string;
  descripcion: string;
  edad: number;
  numJugadores: number;
  tipo: string;
  precio: number;
  imagen?: string;
  edicion?: string[];
}
