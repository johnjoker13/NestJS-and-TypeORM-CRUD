import { Controller } from '@nestjs/common';

@Controller()
abstract class commonController {
  abstract findAll(): string[];
}

export default commonController;
