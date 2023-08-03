import { Component, OnInit } from '@angular/core';
import { DataService, IResults } from '../../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface IData {
  id: number;
  title: SafeHtml;
  url: string;
  image_url: string;
  summary: SafeHtml;
  published_at: string;
  matchesInTitle: number;
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  searchResults: IData[] = [];
  countResults: number = 0;
  searchQuery: string = '';

  constructor(
    private searchData: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.searchData.countResults$.subscribe((amount) => {
      this.countResults = amount;
    });

    this.searchData.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
    });

    this.searchData.searchResults$.subscribe((results: IResults[]) => {
      const regex = new RegExp(this.searchQuery, 'gi');
      const template = `<span style="background-color: #ffff00">${this.searchQuery}</span>`;

      const newData = results.map((item) => {
        const formattedTitle = item.title.replace(regex, template);
        const formattedSummary = item.summary.replace(regex, template);

        return {
          title: this.sanitizer.bypassSecurityTrustHtml(formattedTitle),
          summary: this.sanitizer.bypassSecurityTrustHtml(formattedSummary),
          published_at: item.published_at,
          image_url: item.image_url,
          url: item.url,
          id: item.id,
          matchesInTitle: (formattedTitle.match(regex) || []).length,
        };
      });

      newData.sort((a, b) => b.matchesInTitle - a.matchesInTitle);

      this.searchResults = newData;
    });
  }

  getNumberWithSuffix(number: string | null): string {
    if (!number) return '';

    const num = parseInt(number);
    const suffixes = ['st', 'nd', 'rd'];
    const suffix =
      num % 10 > 0 && num % 10 <= 3 ? suffixes[(num % 10) - 1] : 'th';
    return num + suffix;
  }
}
