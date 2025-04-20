import { AddressType } from '../utils/enums';

export interface Address {
  id: number;
  addressType: AddressType;
  addressText: string;
}
