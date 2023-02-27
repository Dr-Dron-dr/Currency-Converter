import { Component, OnInit } from '@angular/core';
import { ApiService, ApiInfo } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  hasInputFieldBeenClicked = false;

  data: ApiInfo = { rates: { PLN: 0, EUR: 0, UAH: 0 } };
  baseConvert = 'UAH';
  baseUah = 0;
  currencies = ['PLN', 'USD', 'EUR'];

  constructor(private apiService: ApiService) {}

 

  ngOnInit() {
    this.apiService.fetchData().then((data) => {
      this.data = data;
      this.baseUah = data.rates[this.baseConvert];
    });
  }

  getConvertedValue(currency: string): string {
    const rate = this.data.rates[currency];
    const convertedValue = (1 / rate) * this.baseUah;
    return convertedValue.toFixed(2);
  }

  getImageLink(currency: string) {
    switch (currency) {
      case 'USD':
        return 'assets/icons/USA.png';
      case 'EUR':
        return 'assets/icons/EUR.png';
      case 'PLN':
        return 'assets/icons/PLN.png';
      default:
        return './icons/PLN.png';
    }
  }
}
