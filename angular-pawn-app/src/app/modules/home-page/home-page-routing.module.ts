import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {DiamondComponent} from './component/category-pawn/diamond/diamond.component';
import {BagComponent} from './component/category-pawn/bag/bag.component';
import {WatchComponent} from './component/category-pawn/watch/watch.component';
import {CameraComponent} from './component/category-pawn/camera/camera.component';
import {BikeComponent} from './component/category-pawn/bike/bike.component';
import {CarComponent} from './component/category-pawn/car/car.component';
import {EstateComponent} from './component/category-pawn/estate/estate.component';
import {LaptopComponent} from './component/category-pawn/laptop/laptop.component';
import {PhoneComponent} from './component/category-pawn/phone/phone.component';
import {GoldComponent} from './component/category-pawn/gold/gold.component';
import {ApplianceComponent} from './component/category-pawn/appliance/appliance.component';
import {ArtComponent} from './component/category-pawn/art/art.component';
import {BodyPageComponent} from './component/body-page/body-page.component';




const routes: Routes = [
  {
    path: 'home'  , component: HomePageComponent, children: [
      {
        path: '', component: BodyPageComponent
      },
<<<<<<< HEAD
      // {
      //   path: '', component: FeatureListComponent
      // },
      // {
      //   path: '', component: FeatureListComponent
      // },
=======
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
      {
        path: 'appliance', component: ApplianceComponent
      },
      {
        path: 'art', component: ArtComponent
      },
      {
        path: 'bag', component: BagComponent
      },
      {
        path: 'bike', component: BikeComponent
      },
      {
        path: 'camera', component: CameraComponent
      },
      {
        path: 'car', component: CarComponent
      },
      {
        path: 'diamond', component: DiamondComponent
      },
      {
        path: 'estate', component: EstateComponent
      },
      {
        path: 'gold', component: GoldComponent
      },
      {
        path: 'laptop', component: LaptopComponent
      },
      {
        path: 'phone', component: PhoneComponent
      },
      {
        path: 'watch', component: WatchComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
