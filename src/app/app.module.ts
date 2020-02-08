import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DailyViewContainerComponent} from './components/daily-view-container/daily-view-container.component';
import {FiltersSectionComponent} from './components/filters-section/filters-section.component';
import {DailyTasksBoardComponent} from './components/daily-tasks-board/daily-tasks-board.component';
import {TeamMemberRowComponent} from './components/team-member-row/team-member-row.component';
import {DailyTaskComponent} from './components/daily-task/daily-task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    DailyViewContainerComponent,
    FiltersSectionComponent,
    DailyTasksBoardComponent,
    TeamMemberRowComponent,
    DailyTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
