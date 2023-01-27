import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
export class JuegoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly nombre: string;
  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly edad: number;
  @IsNotEmpty()
  @IsNumber()
  readonly numJugadores: number;
  @IsNotEmpty()
  @IsString()
  readonly tipo: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly precio: number;
  @IsString()
  readonly imagen?: string;
  @IsNotEmpty()
  @IsArray()
  readonly edicion?: string[];
}
