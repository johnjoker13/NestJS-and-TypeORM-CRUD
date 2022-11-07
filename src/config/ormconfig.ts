import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'crud',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
