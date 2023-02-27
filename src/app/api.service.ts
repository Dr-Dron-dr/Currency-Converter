import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = {};

  async fetchData(): Promise<any> {
    try {
      const response = await axios.get('https://openexchangerates.org/api/latest.json?app_id=db430cc8f8224f8db942276748be4bee');
      this.data = response.data;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}













// 'https://openexchangerates.org/api/latest.json?app_id=db430cc8f8224f8db942276748be4bee'