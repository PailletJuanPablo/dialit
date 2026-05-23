import { describe, expect, it } from "vitest";
import { runHomeDemoScenario } from "../site/src/lib/homeDemoFlow";

describe("home demo flow", () => {
  it("does not ask for Argentina-specific DNI in the technical support path", async () => {
    const technical = await runHomeDemoScenario("technical_support");

    expect(technical.variables.map(([name]) => name)).not.toContain("dni");
    expect(technical.conversation.map((entry) => entry.text).join("\n")).not.toContain("DNI");
    expect(technical.code.join("\n")).not.toContain("35123456");
    expect(technical.variables).toEqual(
      expect.arrayContaining([
        ["contactReason", "technical_support"],
        ["ticketId", "TECH-4821"],
      ]),
    );
  });
});
