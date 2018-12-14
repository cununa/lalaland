import { NgModule } from '@angular/core';
import { CRefresherComponent } from './c-refresher/c-refresher';
import { IonicModule } from 'ionic-angular';
import { CSvgImgComponent } from './c-svg-img/c-svg-img';
import { CSlidesComponent } from './c-slides/c-slides';
import { CSlideComponent } from './c-slide/c-slide';
import { CMenuComponent } from './c-menu/c-menu';
@NgModule({
	declarations: [CRefresherComponent,
    CSvgImgComponent,
    CSlidesComponent,
    CSlideComponent,
    CMenuComponent],
	imports: [IonicModule],
	exports: [CRefresherComponent,
    CSvgImgComponent,
    CSlidesComponent,
    CSlideComponent,
    CMenuComponent]
})
export class ComponentsModule {}
