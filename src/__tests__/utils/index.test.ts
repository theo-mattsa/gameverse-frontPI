import { fileToBase64 } from "@/utils";

describe("fileToBase64 utility function", () => {
  it("should convert file to base64 string", async () => {
    const fileContent = "test content";
    const file = new File([fileContent], "test.txt", { type: "text/plain" });
    
    const result = await fileToBase64(file);
    
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
    expect(result).toContain("data:text/plain;base64,");
  });

  it("should handle empty file", async () => {
    const file = new File([], "empty.txt", { type: "text/plain" });
    
    const result = await fileToBase64(file);
    
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should handle image file", async () => {
    const imageData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    const file = new File([imageData], "test.png", { type: "image/png" });
    
    const result = await fileToBase64(file);
    
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
    expect(result).toContain("data:image/png;base64,");
  });
});
