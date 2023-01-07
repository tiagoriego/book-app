import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'custom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public appVersion: any;

  constructor() { }

  ngOnInit(): void {
    const APP_VERSION = require('package.json');
    if (APP_VERSION) {
      this.appVersion = APP_VERSION.version
    }
  }
}
