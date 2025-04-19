import { AddressType } from '../utils/enums/enums';

export interface Address {
  id: number;
  addressType: AddressType;
  addressText: string;
}
