import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyViewContainerComponent} from './components/daily-view-container/daily-view-container.component';


const routes: Routes = [
  {path: '', redirectTo: '/dailyView', pathMatch: 'full'},
  {path: 'dailyView', component: DailyViewContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
