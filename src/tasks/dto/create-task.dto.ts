import { IsNumber, Min, Max } from "class-validator";

export class CreateTaskDto {
  @IsNumber()
  @Min(1, { message: "Iterations must be at least 1" })
  @Max(1000000, { message: "Iterations must not exceed 1000000" })
  iterations: number;
}
