export type CreationPayloadType = {
  id: number;
  name: string;
  email: string;
};

export type TokenPayload = CreationPayloadType & {
  iat: number;
  exp: number;
}
