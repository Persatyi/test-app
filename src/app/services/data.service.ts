import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IResults {
  id: number;
  title: string;
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
}

export interface IResponse {
  count: number;
  results: [IResults];
}

@Injectable()
export class DataService {
  private baseUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  private searchResultsSubject = new Subject<IResults[]>();
  public searchResults$ = this.searchResultsSubject.asObservable();

  private countResultsSubject = new Subject<number>();
  public countResults$ = this.countResultsSubject.asObservable();

  private searchQuerySubject = new Subject<string>();
  public searchQuery$ = this.searchQuerySubject.asObservable();

  constructor(private http: HttpClient) {}

  search(query: string): void {
    this.searchQuerySubject.next(query);

    this.http
      .get<IResponse>(`${this.baseUrl}?search=${query}&limit=10`)
      .pipe(map((response) => response))
      .subscribe(
        (data: IResponse) => {
          this.searchResultsSubject.next(data.results);
          this.countResultsSubject.next(data.count);
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
  }

  getArticleById(id: number): Observable<IResults | undefined> {
    return this.http.get<IResults>(`${this.baseUrl}${id}`).pipe(
      catchError((error) => {
        console.error('An error occurred in getArticleById', error);
        return of(undefined);
      })
    );
  }
}
