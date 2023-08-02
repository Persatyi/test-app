import { Component } from '@angular/core';
// import { SearchComponent } from '../search/search.component';
import { IResults } from '../../services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  searchResults: [IResults] | undefined;

  constructor() {}
}
