import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResults {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: [];
  events: [];
}

export interface IResponse {
  count: number;
  next: string;
  results: [IResults];
}

@Injectable()
export class DataService {
  private baseUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';
  private searchResultsSubject = new Subject<IResults[]>();
  public searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private http: HttpClient) {}

  search(query: string): void {
    this.http
      .get<IResponse>(`${this.baseUrl}?search=${query}&limit=10`)
      .pipe(map((response) => response.results))
      .subscribe(
        (results: IResults[]) => {
          this.searchResultsSubject.next(results);
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
  }
}
