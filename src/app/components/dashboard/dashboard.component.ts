import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu!: Menu[];
  nameClient!: string;
  cards: any[] = [];
  arrData: any[]  = []
  totalExpense!: number;
  titleExpense!: number;
  totalRevenues!: number;
  titleRevenues!: number;
  constructor(private routeActivated: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.menu = [
      {name: 'Cadastro de Dívidas'},
      {name: 'Upload de Contas'},
    ]


    this.storeService.getBalancesExpenseTotal().subscribe(res => {
      if(res) {
        console.log(res.data)
        this.totalExpense = res.data.total;
        this.titleRevenues = res.data.title;
      }
    })

    this.storeService.getRevenuesTotal().subscribe(res => {
      if(res) {
        this.totalRevenues = res.data.total;
        this.titleExpense = res.data.title;
      }
    })
    this.cards = [
      {
        title: this.titleExpense ? this.titleExpense : 'Total dívidas',
        value: this.totalExpense ? this.totalExpense : 0
      },
      {
        title: this.titleRevenues,
        value: this.totalRevenues
      },
      {
        title: 'Saldo total',
        value: 0
      }
    ]

  }

}
