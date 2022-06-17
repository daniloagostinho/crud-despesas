import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AddExpenseComponent } from 'src/app/shared/add-expense/add-expense.component';
import { StoreService } from 'src/app/shared/service/store.service';

import { Router  } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  displayedColumns: string[] = ['despesa', 'categoria', 'valor', 'dataVencimento'];
  public dataSource = new MatTableDataSource<any>();
  loading = false;
  dataLocalStorage: any[] = [];
  total: number = 0;
  pageSize: any[] = [5, 10, 25, 100]
  @ViewChild('paginator') paginator!: MatPaginator;
  currentRoute!: string;
  mouthSelected: any;
  emptyResult!: boolean;
  arrDebts: any[] = [];
  constructor(
    public dialog: MatDialog, private store: StoreService,
    private apiService: ApiService,
    private utilsService: UtilsService,
    private localStorage: LocalstorageService
  ) {
  }

  ngOnInit(): void {
    this.defineInitMouth()
    this.getRegisterDebts(this.mouthSelected)
    this.getUserData();
    this.totalExpense();
        // quando abre modal de depsesas
        this.store.getStore().subscribe(res => {

          // if(res !== null) {
          //   this.loading = true;
          //   setTimeout(() => {
          //     this.loading = false;
          //     this.utilsService.openSnackBar('Despesa incluída com sucesso!')
          //     // gera array localstorage para adiciona ao localstorage
          //     let dataLocalStorage = this.generateArrayDataLocalstorage(res);
          //     this.addLocalStorage('Despesas', dataLocalStorage);
          //     this.loadLocalstorageDataTable('Despesas', res);
          //     this.totalExpense();
          //   }, 2000)
          // }

          // TODO

          this.getRegisterDebts(this.mouthSelected)
        })
        this.store.getStoreMouth().subscribe(res => {
          this.mouthSelected = res
        })

        this.store.getSearchDebtsByMouth().subscribe(res => {
          if(res) {
            // TODO
            this.getRegisterDebts(this.mouthSelected)
            // this.dataSource.paginator = this.paginator;
          }
        })
  }

  defineInitMouth() {
    let date = new Date();
    let dateString = date.toLocaleDateString("pt-br", {month: "long"});
    let letterDateString = dateString[0].toUpperCase() + dateString.substr(1)
    this.mouthSelected == undefined ? this.mouthSelected = letterDateString : this.mouthSelected
  }
  // busca informações do usuario.. tipo o id para passar para o proximo método. O getUserInfo
  getUserData() {
    this.apiService.userData('token').subscribe((res: any) => {
      if(res) {
        const {_id} = res.user[0];
        this.getUserInfo(_id);
      }
    }, error => {
      console.log(error)
    })
  }

  getRegisterDebts(yearSelected: any) {
    let user = this.localStorage.getLocalStorage('user')
    this.apiService.getRegisterDebts(yearSelected, user).subscribe((res: any) => {
      this.loading  = true;
      let arr: any[] = [];
      if(res.result.length === 0) {
        this.emptyResult = true;
        this.arrDebts = [];
        this.totalExpense();
      } else {
        this.emptyResult = false;
        this.arrDebts = arr;
        // this.dataSource.paginator = this.paginator;
        res.result.forEach((element: any) => {
          arr.push(element.user.mouth.listMouth)
        })
        this.totalExpense();
      }

      setTimeout(() => {
        this.dataSource.data = arr;
        this.loading = false;
      }, 2000)
    })
  }

  // metodo que bate numa rota privada
  // necessita passar o autoruzation na requisição
  getUserInfo(id: any) {
    this.apiService.userInfo('token', id).subscribe(res => {
    }, error => {
      this.utilsService.openSnackBar(error.error.message)
    })
  }

  openDialog() {
    this.dialog.open(AddExpenseComponent, {
      width: '900px',
      disableClose: true,
      data: {
        any: '',
      },
    });
  }

  generateTotalExpenseArray() {
    let total = this.arrDebts.map((total: any) => Number(total.valor))
    return total;
  }
  totalExpense() {
    let totalArr = this.generateTotalExpenseArray();
    this.total = totalArr.reduce((total, num ) => total + num, 0);

    const dataBalanceExpense= {
      data: {
        title: 'Total dívidas',
        total: this.total
      }
    }

    this.store.setBalancesExpenseTotal(dataBalanceExpense)
  }

  applyFilter(event: Event) {
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLowerCase();
  }

}
