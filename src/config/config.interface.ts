export interface ConfigDBData {
  url?: string;
}
export interface SearchLogUpload {
  connectionString?: string;
  containerName?: string;
}

export interface ConfigAuthData {
  /** The JWKS URI to use. */
  jwksuri: string;

  /** The Auth audience to use. */
  audience?: string;

  /** The Auth token Issuer to use. */
  tokenIssuer: string;

  /** The Auth provider Issuer to use. */
  authProvider: string;
}

export interface ConfigAuthorizationData {
  baseUrl: string;
  serviceClientToken: string;
}

export interface PlatformAPIs {
  baseUrl: string;
  token: string;
}

export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'production'
   */
  env: string;

  auth: ConfigAuthData;

  authorization: ConfigAuthorizationData;

  platformApis: PlatformAPIs;

  /** Database connection details. */
  db: ConfigDBData;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}
