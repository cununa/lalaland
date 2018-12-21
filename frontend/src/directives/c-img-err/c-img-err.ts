import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[img-err]' // Attribute selector
})
export class CImgErrDirective {

  @Output() 'img-err' = new EventEmitter();

  constructor(public element: ElementRef) {
  }
  ngOnInit() {
    let img = this.element.nativeElement;
    
    img.onerror = () => {
      this['img-err'].emit();
    }
  }

}
