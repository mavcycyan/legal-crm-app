import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConvert'
})
export class CurrencyConvertPipe implements PipeTransform {

  transform(currency_iso: number|string|null = null): string {
    if (currency_iso !== null) {
      if (currency_iso == 'UAH' || currency_iso == 'uah') {
        return '₴';
      } else if (currency_iso == 'USD' || currency_iso == 'usd') {
        return '$';
      } else if (currency_iso == 'EUR' || currency_iso == 'eur') {
        return '€';
      }
    }
    return '₴';
  }

}
