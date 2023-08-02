import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService, IResponse } from 'src/app/services/data.service';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../../../styles.scss'],
})
export class SearchComponent {
  keyword$ = new Subject<string>();
  searchResults$: Observable<IResponse> | undefined;

  constructor(
    private searchService: DataService,
    private cardList: CardListComponent
  ) {}

  ngOnInit() {
    this.searchResults$ = this.keyword$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.searchService.search(keyword))
    );

    this.searchResults$.subscribe((data) => {
      this.cardList.searchResults = data.results;
    });
  }

  onSearch(event: Event): void {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      const value = (event.target as HTMLInputElement | HTMLTextAreaElement)
        .value;
      this.keyword$.next(value);
    }
  }
}
