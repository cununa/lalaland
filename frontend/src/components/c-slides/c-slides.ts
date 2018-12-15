import {
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'slides',
  templateUrl: 'c-slides.html',
  host: {
    '[class.slides]': 'true'
  }
})
export class CSlidesComponent {

  @ViewChild('wrapperRef') wrapperRef;
  @ViewChild('pagerRef') pagerRef;

  @Input('pager') pager = null;
  @Input('loop') loop = null;
  @Input('autoplay') autoplay = null;
  @Input('centeredSlides') centeredSlides:any = false;
  @Input('slidesPerView') slidesPerView:any = 1;
  @Input('spaceBetween') spaceBetween = 0;

  swiper = null;
  opts: any = {
    //observer: true, // 실시간 변경은 가능하면 지양하는 것으로 하자. 루프와 함께 쓰면 오류가 난다.
    
  }

  constructor(
    private el: ElementRef
  ) {}
  /* ngOnInit() {
  
  } */
  ngAfterViewInit() {
    if (this.pager != null) {
      this.opts.pagination = {
        el: this.pagerRef.nativeElement
      }
    }
    if (this.loop != null) this.opts.loop = true;
    if (this.autoplay != null) {
      this.opts.autoplay = {
        delay: this.autoplay,
        //disableOnInteraction: false
      }
    }
    if(this.slidesPerView == 'auto') {
      this.opts.slidesPerView = this.slidesPerView;
    }if(typeof this.slidesPerView == 'string') {
      this.opts.slidesPerView = Number(this.slidesPerView);
    }
    this.opts.centeredSlides = (this.centeredSlides == 'true');
    this.spaceBetween ? this.opts.spaceBetween = Number(this.spaceBetween) : '';
    console.log(this.opts);
    this.swiper = new Swiper(this.el.nativeElement.children[0], this.opts);
    if(this.loop) {
      this.swiper.on('slideChangeTransitionEnd', () => {
        const index = this.swiper.activeIndex;
        const length = this.swiper.slides.length;
        if(index == 0) {
          this.swiper.slideTo(length - 2, 0);
        } else if(index == length - 1) {
          this.swiper.slideTo(1, 0);
        }
      });
    }
  }
  /* addEvent() {
    const dupl = this.el.nativeElement.getElementsByClassName('swiper-slide-duplicate');
    for (let i = 0; i < dupl.length; i++) {
      const dupl_index = dupl[i].getAttribute('data-swiper-slide-index');
      const origin = this.el.nativeElement.querySelectorAll('[data-swiper-slide-index="' + dupl_index + '"]:not(.swiper-slide-duplicate)')[0];
      this.renderer.listen(dupl[i], 'click', () => {
        origin.dispatchEvent(new Event('click'));
      });
      this.addChildrenEvent(origin, dupl[i]);
    }
  }
  addChildrenEvent(origin, dupl) {
    for (let i = 0; i < origin.children.length; i++) {
      this.renderer.listen(dupl.children[i], 'click', () => {
        origin.children[i].dispatchEvent(new Event('click'));
      });
      this.addChildrenEvent(origin.children[i], dupl.children[i]);
    }
  } */
}
