import { Injectable } from '@angular/core';
import axios from 'axios';

export type ApiInfo = {
  rates: {
    [key: string]: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cacheTime = 3600;
  private cache: { [key: string]: { timestamp: number; data: ApiInfo } } = {};
  private apiUrl =
    'https://openexchangerates.org/api/latest.json?app_id=db430cc8f8224f8db942276748be4bee';

  async fetchData(): Promise<ApiInfo> {
    const now = Date.now();
    const cachedData = this.cache[this.apiUrl];
    if (cachedData && now - cachedData.timestamp < this.cacheTime * 1000) {
      return cachedData.data;
    }

    try {
      const response = await axios.get<ApiInfo>(this.apiUrl);
      const data = response.data;
      this.cache[this.apiUrl] = { timestamp: now, data };
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
