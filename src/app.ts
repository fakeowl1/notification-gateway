import Fastify from "fastify";

export function buildApp() {
  const app = Fastify();

  app.get("/version", async () => ({
    version: process.env.GIT_SHA ?? "dev",
  }));

  return app;
}
