export interface IError {
  error: Errorbody;
}

export interface Errorbody {
  status: boolean;
  errorText: string;
}
