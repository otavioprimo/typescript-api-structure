import { IsNumberString } from 'class-validator';

class TestQuery {
  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;
}

export default TestQuery;
