import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  input1Value = 1;
  input1Currency = 'USD';
  input2Value = 1;
  input2Currency = 'UAH';
  data: any = { rates: { PLN: '', EUR: '', UAH: '', USD: 1 } };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.fetchData().then((data) => {
      this.data = data;
    });
  }

  convertInput1() {
    this.input2Value =
      ((this.input1Value * 1) / this.data.rates[this.input1Currency]) *
      this.data.rates[this.input2Currency];
    this.input2Value = Number(this.input2Value.toFixed(2));
  }

  convertInput2() {
    this.input1Value =
      ((this.input2Value * 1) / this.data.rates[this.input2Currency]) *
      this.data.rates[this.input1Currency];
    this.input1Value = Number(this.input1Value.toFixed(2));
  }
}
