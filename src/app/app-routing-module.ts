import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule],
  providers: [provideRouter(routeConfig)]
})
export class AppRoutingModule { }
