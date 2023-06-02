import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {HeaderComponent} from './component/header/header.component';
import {ScrollToTopComponent} from './component/scroll-to-top/scroll-to-top.component';
import {FooterComponent} from './component/footer/footer.component';
import {BodyPageComponent} from './component/body-page/body-page.component';
import {ArticleComponent} from './component/article/article.component';
import {ApplianceComponent} from './component/category-pawn/appliance/appliance.component';
import {ArtComponent} from './component/category-pawn/art/art.component';
import {BagComponent} from './component/category-pawn/bag/bag.component';
import {BikeComponent} from './component/category-pawn/bike/bike.component';
import {CarComponent} from './component/category-pawn/car/car.component';
import {DiamondComponent} from './component/category-pawn/diamond/diamond.component';
import {EstateComponent} from './component/category-pawn/estate/estate.component';
import {GoldComponent} from './component/category-pawn/gold/gold.component';
import {LaptopComponent} from './component/category-pawn/laptop/laptop.component';
import {PhoneComponent} from './component/category-pawn/phone/phone.component';
import {WatchComponent} from './component/category-pawn/watch/watch.component';
import {CameraComponent} from './component/category-pawn/camera/camera.component';
import {PawnFormCustomerComponent} from './component/pawn-form-customer/pawn-form-customer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ArticlePageModule} from "../article-page/article-page.module";


@NgModule({
    declarations: [HomePageComponent,
        HeaderComponent,
        ScrollToTopComponent,
        FooterComponent,
        BodyPageComponent,
        ArticleComponent,
        ApplianceComponent,
        ArtComponent,
        BagComponent,
        BikeComponent,
        CarComponent,
        DiamondComponent,
        EstateComponent,
        GoldComponent,
        LaptopComponent,
        PhoneComponent,
        WatchComponent,
        CameraComponent,
        PawnFormCustomerComponent],
  exports: [
    HomePageComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    ArticlePageModule
  ]
})
export class HomePageModule { }
