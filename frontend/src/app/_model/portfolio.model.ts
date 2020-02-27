// export class PortfolioResponse {
//   _Id: string;
//   Name: string;
//   lastModified: string;
//   holdings: number;
// }

export class Transaction {
  SecurityId: string;
  Type: string;
  Date: string;
  Amount: string;
}

export class NgDataTablePage {
  size: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}

export class PortfolioResponse {
  size: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  data: Portfolio[];
}

export class Portfolio {
  _Id: string;
  Name: string;
  lastModified: string;
  holdings: number;
}
