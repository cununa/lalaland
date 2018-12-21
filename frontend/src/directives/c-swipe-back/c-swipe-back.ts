import {
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  IonicApp
} from 'ionic-angular';
import {
  style,
  animate,
  AnimationBuilder,
  AnimationMetadata
} from '@angular/animations';
import { Device } from '../../providers/cat/cat';

@Directive({
  selector: '[swipe-back]'
})
export class CSwipeBackDirective {

  el_modal = null;

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder,
    private renderer: Renderer2,
    private ionApp: IonicApp,
    private device: Device
  ) {
    //console.log('Hello CSwipeBackDirective Directive');
  }
  ngOnInit() {
    if(this.device.platformInt != 2) return false;
    let el = this.el.nativeElement;
    let limit = 0;
    while (el.tagName != 'ION-MODAL' && limit != 9) {
      el = this.renderer.parentNode(el);
      limit++;
    }
    this.el_modal = el;
    let is_swiping:boolean = false;
    let startX = null;
    let moveX = null;
    this.renderer.listen(el, 'touchstart', (ev) => {
      startX = ev.touches[0].pageX;
      if(startX < 30) {
        is_swiping = true;
      }
    });
    this.renderer.listen(el, 'touchmove', (ev) => {
      if(is_swiping) {
        moveX = ev.touches[0].pageX - startX;
        if (moveX > 0) {
          this.renderer.setStyle(el, 'transform', 'translate3d(' + moveX + 'px,0,0)');
        }
      }
    });
    this.renderer.listen(el, 'touchend', () => {
      touchCancel();
    });
    this.renderer.listen(el, 'touchcancel', () => {
      touchCancel();
    });
    let touchCancel = () => {
      if (moveX > 45) {
        const modal = this.ionApp._modalPortal.getActive();
        if (modal) {
          this.navPop().onDone(() => {
            modal.dismiss({}, '', {
              animate: false
            });
          });
        }
      } else {
        this.cancelPop();
      }
      is_swiping = false;
      startX = null;
      moveX = null;
      this.renderer.setStyle(el, 'transform', 'translate3d(0,0,0)');
    }
  }
  cancelPop() {
    const metadata = this.fadeOut();
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el_modal);

    player.onDone(() => {
      player.destroy();
    });
    player.play();
  }
  navPop() {
    const metadata = this.popAnimation();
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el_modal);

    player.play();
    return player;
  }
  popAnimation(): AnimationMetadata[] {
    return [
      style({
        transform: '*'
      }),
      animate('200ms ease-out', style({
        transform: 'translate3d(' + window.innerWidth + 'px,0,0)'
      })),
    ];
  }

  fadeOut(): AnimationMetadata[] {
    return [
      style({
        transform: '*'
      }),
      animate('200ms ease-out', style({
        transform: 'translate3d(0,0,0)'
      })),
    ];
  }
}
