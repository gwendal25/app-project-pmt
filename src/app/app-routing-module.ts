import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import routeConfig from './routes';

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
