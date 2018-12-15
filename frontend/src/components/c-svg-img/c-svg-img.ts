import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'svg-img',
  templateUrl: 'c-svg-img.html'
})
export class CSvgImgComponent {

  @Input('src') src;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    console.log('Hello CSvgImgComponent Component');

    
  }
  ngOnChanges() {
    console.log(this.src);
    fetch(this.src).then((response) => {
        return response.text();
    }).then((text) => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(text, "text/xml");

      // Get the SVG tag, ignore the rest
      var svg = xmlDoc.getElementsByTagName('svg')[0];
      // Remove any invalid XML tags as per http://validator.w3.org
      //svg.removeAttribute('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      /* if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
      } */

      // Replace image with new SVG
      this.renderer.appendChild(this.el.nativeElement, svg);

    });
  }

}
