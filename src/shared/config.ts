export interface AppConfig {
  port: number;
  gitSha: string;
  serviceBearerToken: string | undefined;
  postgresUrl: string | undefined;
  valkeyUrl: string | undefined;
}

export function loadConfig(): AppConfig {
  return {
    port: Number(process.env.PORT ?? 3000),
    gitSha: process.env.GIT_SHA ?? "dev",
    serviceBearerToken: process.env.SERVICE_BEARER_TOKEN,
    postgresUrl: process.env.DATABASE_URL,
    valkeyUrl: process.env.VALKEY_URL,
  };
}
