export class JuegoDto {
  readonly nombre: string;
  readonly descripcion: string;
  readonly edad: number;
  readonly numJugadores: number;
  readonly tipo: string;
  readonly precio: number;
  readonly imagen?: string;
  readonly edicion?: string[];
}
