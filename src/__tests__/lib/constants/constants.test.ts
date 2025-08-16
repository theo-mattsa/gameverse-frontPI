import { GENRES } from "@/lib/constants/genres";
import { PLATFORMS } from "@/lib/constants/platforms";

describe("Constants", () => {
  describe("GENRES", () => {
    it("should contain expected game genres", () => {
      const expectedGenres = [
        "RPG", "Ação", "Aventura", "Tiro", "Estratégia", 
        "Simulação", "Esportes", "Puzzle", "Terror", "Corrida"
      ];
      
      expect(GENRES).toEqual(expectedGenres);
    });

    it("should be readonly array", () => {
      expect(Array.isArray(GENRES)).toBe(true);
      expect(GENRES.length).toBe(10);
    });

    it("should contain unique values", () => {
      const uniqueGenres = [...new Set(GENRES)];
      expect(uniqueGenres).toHaveLength(GENRES.length);
    });
  });

  describe("PLATFORMS", () => {
    it("should contain expected gaming platforms", () => {
      const expectedPlatforms = [
        "PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"
      ];
      
      expect(PLATFORMS).toEqual(expectedPlatforms);
    });

    it("should be readonly array", () => {
      expect(Array.isArray(PLATFORMS)).toBe(true);
      expect(PLATFORMS.length).toBe(4);
    });

    it("should contain unique values", () => {
      const uniquePlatforms = [...new Set(PLATFORMS)];
      expect(uniquePlatforms).toHaveLength(PLATFORMS.length);
    });
  });
});
