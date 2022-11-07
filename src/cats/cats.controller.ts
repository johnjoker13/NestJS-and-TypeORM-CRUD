import { Controller, Get } from '@nestjs/common';
import { commonController } from 'src/common/controllers';

@Controller('cats')
export class CatsController extends commonController {
  @Get()
  findAll(): string[] {
    return [];
  }
}
