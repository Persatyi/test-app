import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResults, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  article: IResults | undefined;

  constructor(private route: ActivatedRoute, private searchData: DataService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const articleIdFromRoute = Number(routeParams.get('cardId'));

    this.searchData.getArticleById(articleIdFromRoute).subscribe((article) => {
      this.article = article;
    });
  }
}
