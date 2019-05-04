import { IsInt } from "class-validator";

class TestParamDto {
  @IsInt()
  id: number;
}

export default TestParamDto;