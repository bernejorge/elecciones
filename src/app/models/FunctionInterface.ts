
export interface FunctionCall {
  name: string;
  description: string;
  parameters?: FunctionParameter;
}

export interface FunctionParameter {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description?: string;
      enum?: string[];
    };
  };
  required?: string[];
}
