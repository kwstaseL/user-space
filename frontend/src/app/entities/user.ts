import { Gender } from '../utils/enums';
import { Address } from './address';

// User entity we get from DB
export interface User {
  id: number;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: string;
  addresses?: Address[];
  age: number;
}

// UserDTO we use to patch
export interface UserDTO {
  id?: number;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: string;
  addresses?: Address[];
}
