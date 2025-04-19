import { Address } from './address';
import { Gender } from '../utils/enums/enums';

export interface User {
  id: number;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: string;
  addresses?: Address[];
  age: number;
}
