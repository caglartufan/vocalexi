export interface HTTPResponse {
  success: boolean;
  message: string;
}

export interface ErrorHTTPResponse extends HTTPResponse {
  errors?: string[];
}
