import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("btn", "btn-primary", "text-white");
    expect(result).toContain("btn");
    expect(result).toContain("btn-primary");
    expect(result).toContain("text-white");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("btn", isActive && "active", "base-class");
    expect(result).toContain("btn");
    expect(result).toContain("active");
    expect(result).toContain("base-class");
  });

  it("should handle falsy values", () => {
    const result = cn("btn", false, null, undefined, "valid-class");
    expect(result).toContain("btn");
    expect(result).toContain("valid-class");
    expect(result).not.toContain("false");
    expect(result).not.toContain("null");
  });

  it("should merge conflicting Tailwind classes", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
