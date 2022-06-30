import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
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
  cardsBalanceTotal: any;
  balanceTotalMinus: any;
  balanceTotalPlus: any;
  balanceTotalZero: any;
  totalDebts: any;
  hasNegative: boolean = false;
  hasPositive: boolean = false;
  constructor(private routeActivated: ActivatedRoute,
    private storeService: StoreService,
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.menu = [
      {name: 'Cadastro de Dívidas'},
      {name: 'Cadastro de Receitas'},
    ]

    this.storeService.getBalancesExpenseTotal().subscribe(res => {
      if(res) {
        this.totalDebts = res.data.total;
        this.debts =  {
          title: res.data.title,
          value: res.data.total
        }

        this.cards = [
          {...this.debts, }
        ]

        this.storeService.setBalanceTotal(true)

      }
    })

    this.storeService.getRevenuesTotal().subscribe(res => {
      if(res) {
        this.totalRevenues = res.data.total;
        this.revenues =
        {
          title: res.data.title,
          value: res.data.total
        }

        this.cardsRevenues = [
          {...this.revenues, }
        ]

        this.storeService.setBalanceTotal(true)

      }
    })

    this.storeService.getBalanceTotal().subscribe(res => {
      if(res) {
          // TODO

        if(this.totalDebts < this.totalRevenues) {
          const result = Number(this.totalDebts) - Number(this.totalRevenues)
          this.hasPositive = true;
          this.hasNegative = false;
          this.balanceTotalMinus =
          {
            title: 'Saldo total',
            value: Math.abs(result)
          }

          this.cardsBalanceTotal = [
            {...this.balanceTotalMinus, }
          ]
        } else if(this.totalDebts > this.totalRevenues) {
          const result = this.totalDebts - this.totalRevenues
          this.hasNegative = true;
          this.hasPositive = false;
          this.balanceTotalPlus =
          {
            title: 'Saldo total',
            value: - Math.abs(result)
          }

          this.cardsBalanceTotal = [
            {...this.balanceTotalPlus, }
          ]
        } else if(this.totalDebts === 0 && this.totalRevenues === 0) {
          this.hasNegative = false;
          this.balanceTotalZero =
          {
            title: 'Saldo total',
            value: 0
          }

          this.cardsBalanceTotal = [
            {...this.balanceTotalZero, }
          ]
        }

      }

    })

  }


  ngAfterContentChecked() {

    this.cdref.detectChanges();

     }
}
