import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu!: Menu[];
  nameClient!: string;
  cards: any[] = [];

  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.menu = [
      {name: 'Cadastro de Dívidas'},
      {name: 'Upload de Contas'},
    ]


    this.cards = [
      {
        title: 'Total dívidas',
        value: 0
      },
      {
        title: 'Total receitas',
        value: 0
      },
      {
        title: 'Saldo total',
        value: 0
      }
    ]

    this.routeActivated.params.subscribe(parm => {
      if(parm['name']) {
        console.log(parm)
      }
    })
  }

}
