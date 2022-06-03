import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu!: Menu[];
  nameClient!: string;
  constructor() { }

  ngOnInit(): void {
    this.menu = [
      {name: 'Home'},
      {name: 'Despesas'},
      {name: 'Contas'},
    ]

    this.nameClient = 'beltrano'
  }

}
