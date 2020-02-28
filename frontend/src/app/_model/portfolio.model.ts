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


export class PortfolioByDateResponse {
  _Id: string;
  Name: string;
  Transactions: TransactionList[];
}

export class TransactionList {
  SecurityId: string;
  Type: string;
  Date: string;
  Amount: string;
  security: Security[];
  Share: number;
  Value: string;
}

export class Security {
  EndDate: string;
  Value: string;
  Amount: number;
}
