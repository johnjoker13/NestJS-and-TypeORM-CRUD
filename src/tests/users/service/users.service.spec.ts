import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER, USERDELETED, USERS, USERUPDATED } from '../../../utils/mocks';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('create', async () => {
    jest.spyOn(userRepository, 'create').mockReturnValueOnce({
      id: 1,
      name: 'Adam',
      age: 35,
    });

    await usersService.create({
      name: 'Adam',
      age: 35,
    });

    expect(userRepository.save).toHaveBeenCalledWith({
      name: 'Adam',
      age: 35,
    });
  });

  it('findAll', async () => {
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(USERS);

    const result = await usersService.findAll();

    expect(userRepository.find).toHaveBeenCalled();
    expect(result.length).toEqual(1);
  });

  it('findOneBy', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(USER);

    const result = await usersService.findOne(2);

    expect(userRepository.findOneBy).toHaveBeenCalled();
    expect(result.id).toBe(2);
    expect(result.name).toBe('Adam');
    expect(result.age).toBe(35);
  });

  it('update', async () => {
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce(USERUPDATED);

    const result = await usersService.update(2, {
      name: 'Adam',
      age: 38,
    });

    expect(userRepository.update).toHaveBeenCalledWith(2, {
      name: 'Adam',
      age: 38,
    });

    expect(result.affected).toBe(1);
  });

  it('remove', async () => {
    jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(USERDELETED);

    const result = await usersService.remove(2);

    expect(userRepository.delete).toHaveBeenCalled();
    expect(result.affected).toBe(1);
  });
});
