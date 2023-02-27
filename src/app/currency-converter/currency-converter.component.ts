import { Component, OnInit } from '@angular/core';
import { ApiService, ApiInfo } from '../api.service';
type CurrencySymbols = {
  [key: string]: string;
};
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent {
  hasInputFieldBeenClicked = false;
  first = 0;
  currencyFrom = 'USD';
  second = 0;
  currencyTo = 'UAH';
  currencies = ['UAH', 'PLN', 'USD', 'EUR'];
  symbols: CurrencySymbols = { EUR: '€', PLN: 'zł', USD: '$', UAH: '₴' };
  data: ApiInfo = { rates: { PLN: 0, EUR: 0, UAH: 0, USD: 1 } };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.fetchData().then((data) => {
      this.data = data;
    });
  }

  clearInputField(event: MouseEvent) {
    if (!this.hasInputFieldBeenClicked) {
      const target = event.target as HTMLInputElement;
      if (target) {
        target.value = '';
        this.hasInputFieldBeenClicked = true;
      }
    }
  }

  convert(currencyFrom: string, currencyTo: string, valueFrom: number): number {
    const valueTo =
      ((valueFrom * 1) / this.data.rates[currencyFrom]) *
      this.data.rates[currencyTo];
    return Number(valueTo.toFixed(2));
  }

  convertFirstToSecond() {
    this.second = this.convert(this.currencyFrom, this.currencyTo, this.first);
  }

  convertSecondToFirst() {
    this.first = this.convert(this.currencyTo, this.currencyFrom, this.second);
  }
}
