import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService, ApiInfo } from '../api.service';

type CurrencySymbols = {
  [key: string]: string;
};

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  currencies = ['UAH', 'PLN', 'USD', 'EUR'];
  symbols: CurrencySymbols = { EUR: '€', PLN: 'zł', USD: '$', UAH: '₴' };
  data: ApiInfo = { rates: { PLN: 0, EUR: 0, UAH: 0, USD: 1 } };
  clearInputFieldEvent = new EventEmitter<void>();
  clearInputFieldCalled = false;

  currencyConverterForm = new FormGroup({
    first: new FormControl(0),
    currencyFrom: new FormControl('USD'),
    second: new FormControl(0),
    currencyTo: new FormControl('UAH'),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.fetchData().then((data) => {
      this.data = data;
    });

    this.clearInputFieldEvent.subscribe(() => {
      if (!this.clearInputFieldCalled) {
        const inputField = document.querySelector(
          '.currency-converter-form__input'
        ) as HTMLInputElement;
        inputField.value = '';
        this.clearInputFieldCalled = true;
      }
    });
  }

  convert(currencyFrom: string, currencyTo: string, valueFrom: number): number {
    const valueTo =
      ((valueFrom * 1) / this.data.rates[currencyFrom]) *
      this.data.rates[currencyTo];
    return Number(valueTo.toFixed(2));
  }

  convertFirstToSecond() {
    const firstValue = this.currencyConverterForm.value.first;
    const currencyFromValue = this.currencyConverterForm.value.currencyFrom;
    const currencyToValue = this.currencyConverterForm.value.currencyTo;

    if (currencyFromValue && currencyToValue && firstValue) {
      this.currencyConverterForm.patchValue({
        second: this.convert(currencyFromValue, currencyToValue, firstValue),
      });
    }
  }

  convertSecondToFirst() {
    const secondValue = this.currencyConverterForm.value.second;
    const currencyFromValue = this.currencyConverterForm.value.currencyFrom;
    const currencyToValue = this.currencyConverterForm.value.currencyTo;
    if (currencyFromValue && currencyToValue && secondValue) {
      this.currencyConverterForm.patchValue({
        first: this.convert(currencyToValue, currencyFromValue, secondValue),
      });
    }
  }

  clearInputField(event: Event) {
    this.clearInputFieldEvent.emit();
  }
}

