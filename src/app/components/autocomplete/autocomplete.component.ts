import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
  providers: [provider]
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() items: string[] = [];
  @Input() disabled: boolean;
  selected: boolean;
  _items: string[] = [];
  input: string;

  private ngOnChangeCallback: any;
  private ngOnTouchedCallback: any;

  constructor() {
  }

  selectItem(item) {
    this.selected = true;
    this.input = item;
    this.ngOnChangeCallback(item);
  }

  filtering() {
    this.ngOnChangeCallback(this.input);
    this.selected = false;
    const regExp = new RegExp('^' + this.input, 'i');
    this._items = this.items.filter(i => regExp.test(i));
  }

  writeValue(v: string) {
    this.input = v;
  }
  registerOnChange(fn: any): void {
    this.ngOnChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.ngOnTouchedCallback = fn;
  }
}
