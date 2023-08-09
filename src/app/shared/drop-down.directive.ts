import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  @HostBinding('class.show') isShow = false;

  @HostListener('click') showToggle() {
    this.isShow = !this.isShow;
  }

  constructor() { }

}
