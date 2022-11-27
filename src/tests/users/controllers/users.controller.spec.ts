/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../users/services/users.service';
import { UsersController } from '../../../users/controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '../../../users/dto';

const USER_ID_NUM = 2;

describe('UsersController Unit Test', () => {
  let usersController: UsersController;
  let spyService: UsersService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        remove: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    spyService = app.get<UsersService>(UsersService);
  });

  it('create', () => {
    const dto = new CreateUserDto();
    usersController.create(dto);
    expect(spyService.create).toHaveBeenCalled();
  });

  it('update', () => {
    const dto = new UpdateUserDto();
    usersController.update(1, dto);
    expect(spyService.update).toHaveBeenCalled();
  });

  it('findAll', () => {
    usersController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('findOne', () => {
    usersController.findOne(USER_ID_NUM);
    expect(spyService.findOne).toHaveBeenCalled();
  });

  it('remove', () => {
    usersController.remove(USER_ID_NUM);
    expect(spyService.remove).toHaveBeenCalled();
  });
});
