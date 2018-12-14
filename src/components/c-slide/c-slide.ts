import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'slide',
  templateUrl: 'c-slide.html',
  host: {
    '[class.swiper-slide]': 'true'
  }
})
export class CSlideComponent {

  video = null;
  is_video_play:boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

  }
  ngAfterViewInit() {
    this.video = this.el.nativeElement.getElementsByTagName('video')[0];
    if(this.video) {
      this.renderer.listen(this.video, 'play', () => {
        this.is_video_play = true;
      });
      this.renderer.listen(this.video, 'pause', () => {
        this.is_video_play = false;
      });
    }
  }
  videoPlay() {
    console.log('cover click');
    this.video.play();
  }
}
