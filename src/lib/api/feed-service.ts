import { api } from "./axios";
import { Activity } from "./types";


export const FeedService = {
  async getActivities(): Promise<Activity[]> {
    try {
      const response = await api.get<Activity[]>("/feed");
      return response.data;
    } catch (error) {
      console.error("Error fetching feed activities:", error);
      throw error;
    }
  }
}