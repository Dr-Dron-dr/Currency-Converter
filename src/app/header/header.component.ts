import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  data: any = { rates: { PLN: '', EUR: '', UAH: '' } };
  baseUah = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.fetchData().then((data) => {
      this.data = data;
      this.baseUah = parseFloat(data.rates.UAH);
    });
  }

  getConvertedValue(currency: string): string {
    const rate = this.data.rates[currency];
    const convertedValue = (1 / rate) * this.baseUah;
    return convertedValue.toFixed(2);
  }
}
