import { TUserAction, TUserUpdated } from 'src/types';

const USERUPDATED: TUserAction & TUserUpdated = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

export default USERUPDATED;
