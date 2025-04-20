import { Gender } from '../utils/enums';
import { Address } from './address';

export interface User {
  id: number;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: string;
  addresses?: Address[];
  age: number;
}
