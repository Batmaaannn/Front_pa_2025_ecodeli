export enum BoxSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  XL = "XL",
}

export interface BoxRequest {
  rentalStart: Date;
  rentalEnd: Date;
  warehouseId: number;
  size: BoxSize;
}