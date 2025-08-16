import { loginSchema } from "@/lib/schemas/login-schema";

describe("Login Schema", () => {
  it("should validate correct login data", () => {
    const validData = {
      email: "user@example.com",
      password: "password123"
    };

    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should reject invalid email format", () => {
    const invalidData = {
      email: "invalid-email",
      password: "password123"
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email inválido");
    }
  });

  it("should reject empty email", () => {
    const invalidData = {
      email: "",
      password: "password123"
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email é obrigatório");
    }
  });

  it("should reject empty password", () => {
    const invalidData = {
      email: "user@example.com",
      password: ""
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Senha é obrigatória");
    }
  });

  it("should reject missing fields", () => {
    const invalidData = {};

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
    }
  });
});
