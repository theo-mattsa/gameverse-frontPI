import { GameStatus } from "@/lib/api/types";

describe("API Types", () => {
  describe("GameStatus enum", () => {
    it("should have correct values", () => {
      expect(GameStatus.PLAYING).toBe("PLAYING");
      expect(GameStatus.COMPLETED).toBe("COMPLETED");
      expect(GameStatus.ON_HOLD).toBe("ON_HOLD");
      expect(GameStatus.DROPPED).toBe("DROPPED");
      expect(GameStatus.WISH_LIST).toBe("WISH_LIST");
    });

    it("should have all expected status values", () => {
      const expectedStatuses = ["PLAYING", "COMPLETED", "ON_HOLD", "DROPPED", "WISH_LIST"];
      const actualStatuses = Object.values(GameStatus);
      
      expect(actualStatuses).toHaveLength(expectedStatuses.length);
      expectedStatuses.forEach(status => {
        expect(actualStatuses).toContain(status);
      });
    });

    it("should be usable in type guards", () => {
      const isValidGameStatus = (status: string): status is GameStatus => {
        return Object.values(GameStatus).includes(status as GameStatus);
      };

      expect(isValidGameStatus("PLAYING")).toBe(true);
      expect(isValidGameStatus("INVALID_STATUS")).toBe(false);
    });
  });
});
