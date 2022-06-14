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
  debts: any;
  revenues: any;
  cardsRevenues: any;
  constructor(private routeActivated: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.menu = [
      {name: 'Cadastro de Dívidas'},
      {name: 'Upload de Contas'},
    ]


    this.storeService.getBalancesExpenseTotal().subscribe(res => {
      if(res) {
        this.debts =  {
          title: res.data.title,
          value: res.data.total
        }

        const balanceTotal =
        {
          title: 'Saldo total',
          value: 0
        }

        this.cards = [
          {...this.debts, }
        ]

        console.log(this.debts)

      }
    })

    this.storeService.getRevenuesTotal().subscribe(res => {
      if(res) {

        this.revenues =
        {
          title: res.data.title,
          value: res.data.total
        }

        this.cardsRevenues = [
          {...this.revenues, }
        ]

        console.log(this.cards)
      }
    })

  }

}
