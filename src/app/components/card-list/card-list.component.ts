import { Component, OnInit } from '@angular/core';
import { DataService, IResults } from '../../services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  searchResults: IResults[] = [];

  constructor(private searchData: DataService) {}

  ngOnInit(): void {
    this.searchData.searchResults$.subscribe((results: IResults[]) => {
      this.searchResults = results;
      console.log(this.searchResults);
    });
  }
}
