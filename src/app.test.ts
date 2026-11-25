import { afterEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "./app.js";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GET /version", () => {
  it("returns the configured GIT_SHA", async () => {
    vi.stubEnv("GIT_SHA", "test-sha");
    const app = buildApp();

    try {
      const response = await app.inject({ method: "GET", url: "/version" });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ version: "test-sha" });
    } finally {
      await app.close();
    }
  });
});
