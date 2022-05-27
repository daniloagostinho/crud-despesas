import { Component, OnInit } from '@angular/core';
import { Menu } from './models/menu.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu!: Menu[];

  constructor() {

  }

  ngOnInit() {
    this.menu = [
      {name: 'Home'},
      {name: 'Despesas'},
      {name: 'Contas'},
    ]

  }
}
