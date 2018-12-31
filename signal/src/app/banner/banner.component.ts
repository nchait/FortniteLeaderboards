import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
// this is the link of the Fortnite banner
  banner = "http://gamerselite.com/wp-content/uploads/2018/01/fortnite-epic-games-development-news-banner.jpg"
  constructor() { }

  ngOnInit() {
  }

}
