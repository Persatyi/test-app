import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../../../styles.scss'],
})
export class SearchComponent implements OnInit {
  keyword$ = new Subject<string>();

  constructor(private searchService: DataService) {}

  ngOnInit() {
    this.keyword$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((keyword: string) => {
        this.searchService.search(keyword);
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
