import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { SearchComponent } from './components/search/search.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { DataService } from './services/data.service';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SearchComponent,
    CardListComponent,
    SvgIconComponent,
    CardDetailsComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'cards/:cardId', component: CardDetailsComponent },
    ]),
  ],
  providers: [DataService, SearchComponent, CardListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
