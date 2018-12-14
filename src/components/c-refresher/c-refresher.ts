import { Component, Input, Renderer, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Content } from 'ionic-angular';

@Component({
  selector: 'refresher',
  templateUrl: 'c-refresher.html',
  animations: [
    trigger('openClose', [
      state('loading', style({
        transform: 'translate3d(0,7rem,0)'
      })),
      state('closed', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => closed', [
        animate('.15s')
      ]),
      transition('* => loading', [
        animate('0.15s')
      ])
    ])
  ]
})
export class CRefresherComponent {

  @Input('content') content: Content;
  @Output() refresh = new EventEmitter();
  @ViewChild('iconContainer') iconContainer;
  @ViewChild('iconBox') iconBox;

  is_dragging:boolean = false;
  is_loading:boolean = false;
  move_y:number = null;
  refresh_limit:number = 150;
  delta:number = 0;

  constructor(
    private renderer: Renderer,
    //private el: ElementRef
  ) {
    
  }
  ngOnInit() {
    let c_el = this.iconContainer.nativeElement;
    let start_y = null;
    this.renderer.listen(this.content._elementRef.nativeElement, 'touchstart', (ev) => {
      if(this.content._elementRef.nativeElement.children[1].scrollTop == 0) {
        start_y = ev.targetTouches[0].pageY;
        this.is_dragging = true;
      }
    });
    this.renderer.listen(this.content._elementRef.nativeElement, 'touchmove', (ev) => {
      //console.log(this.delta);
      if(this.is_dragging) {
        this.move_y = ev.targetTouches[0].pageY - start_y;
        if(this.move_y > 0) {
          this.renderer.setElementStyle(this.content._elementRef.nativeElement.children[1], 'overflow-y', 'hidden');
          if(this.move_y < this.refresh_limit) {
            this.renderer.setElementStyle(c_el, 'transform', 'translate3d(0, ' + this.move_y*0.6 + 'px, 0)');
            this.renderer.setElementStyle(this.iconBox.nativeElement, 'transform', 'rotate(' + this.move_y*2 + 'deg)');
          } else {
            this.renderer.setElementStyle(c_el, 'transform', 'translate3d(0, ' + this.refresh_limit*0.6 + 'px, 0)');
            this.renderer.setElementStyle(this.iconBox.nativeElement, 'transform', 'rotate(' + this.refresh_limit*2 + 'deg)');
          }
        }
      }
    });
    this.renderer.listen(this.content._elementRef.nativeElement, 'touchend', (ev) => {
      if(this.move_y >= this.refresh_limit) {
        this.is_loading = true;
        this.refresh.emit({
          reset: () => {
            this.reset();
          }
        });
      } else {
        this.reset();
      }
    });
    this.renderer.listen(this.content._elementRef.nativeElement, 'touchcancel', (ev) => {
      if(this.move_y >= this.refresh_limit) {
        this.is_loading = true;
        this.refresh.emit({
          reset: () => {
            this.reset();
          }
        });
      } else {
        this.reset();
      }
    });
  }
  reset() {
    this.move_y = null;
    this.is_loading = false;
    this.is_dragging = false;
    this.renderer.setElementStyle(this.content._elementRef.nativeElement.children[1], 'overflow-y', 'scroll');
    this.renderer.setElementStyle(this.iconBox.nativeElement, 'transform', 'rotate(0deg)');
  }
}


export interface Refresher {
  reset: () => void;
}