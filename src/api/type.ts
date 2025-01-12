export interface Result {
  data?: any;
  msg: string;
  code: number;
  timestamp: Date;
}

export interface PaginatingResult {
  data?: PaginatingData;
  msg: string;
  code: number;
  timestamp: Date;
}

export interface PaginatingData {
  records: Array<any>;
  total: number;
  pageNum: number;
  pageSize: number;
}

export interface PaginatingDto {
  pageNum: number;
  pageSize: number;
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}
