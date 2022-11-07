import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // Obs: use synchronize: true only in development mode.
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
