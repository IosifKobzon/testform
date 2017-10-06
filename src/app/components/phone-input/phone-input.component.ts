import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { countries } from '../../consts/countries';

export const provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PhoneInputComponent),
  multi: true
};

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.less'],
  providers: [provider]
})
export class PhoneInputComponent implements ControlValueAccessor {
  public countries = countries;
  public currentCountry = countries[0];
  public barIsOpened = false;
  public phone: string;

  private ngOnChangeCallback: any;
  private ngOnTouchedCallback: any;
  constructor() { }

  selectCountry(i, e) {
    e.stopPropagation();
    this.currentCountry = countries[i];
    this.barIsOpened = false;
    this.onChange(this.phone);
  }

  onChange(e = '') {
    this.phone = e;
    this.ngOnChangeCallback(`+${this.currentCountry.code} ${e}`);
  }

  toggleBar() {
    this.barIsOpened = !this.barIsOpened;
  }

  writeValue(v: string) {
    this.phone = v;
  }
  registerOnChange(fn: any): void {
    this.ngOnChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.ngOnTouchedCallback = fn;
  }
}
