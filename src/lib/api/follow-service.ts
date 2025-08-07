import { api } from "./axios";
import { Follower } from "./types";


export const followService = {
  async followUser(userId: string): Promise<void> {
    await api.post(`/follow/${userId}`);
  },
  async unfollowUser(userId: string): Promise<void> {
    await api.delete(`follow/${userId}`);
  },
  async getFollowers(): Promise<Follower[]> {
    const res = await api.get<Follower[]>("follow/followers");
    return res.data;
  },
  async getFollowing(): Promise<Follower[]> {
    const res = await api.get<Follower[]>("follow/following");
    return res.data;
  },
  async checkIfFollowing(userId: string): Promise<boolean> {
    const res = await api.get<{ isFollowing: boolean }>(`follow/${userId}/status`);
    return res.data.isFollowing;
  }
};