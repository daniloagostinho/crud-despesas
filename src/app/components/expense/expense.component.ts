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
  cards: any[] = [];
  @ViewChild('paginator') paginator!: MatPaginator;
  currentRoute!: string;
  constructor(
    public dialog: MatDialog, private store: StoreService,
    private _snackBar: MatSnackBar,
    private localStorage: LocalstorageService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.cards = [
      {
        title: 'Saldo atual',
        value: 0,
        routerLink: 'saldo-atual'
      },
      {
        title: 'Receitas',
        value: 0,
        routerLink: 'receitas'
      },
      {
        title: 'Despesas',
        value: 0,
        routerLink: 'despesas'
      }
    ]
  }

  ngOnInit(): void {
    this.getUserData();
    this.getRouterCurent();
        // quando abre modal de depsesas
        this.store.getStore().subscribe(res => {

          if(res !== null) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.openSnackBar('Despesa incluída com sucesso!')
              // gera array localstorage para adiciona ao localstorage
              let dataLocalStorage = this.generateArrayDataLocalstorage(res);
              this.addLocalStorage('Despesas', dataLocalStorage);
              this.loadLocalstorageDataTable('Despesas', res);
              this.totalExpense();
            }, 2000)
          }
        })
        this.loadLocalstorageDataTable('Despesas')
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

  // metodo que bate numa rota privada
  // necessita passar o autoruzation na requisição
  getUserInfo(id: any) {
    this.apiService.userInfo('token', id).subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
    })
  }
  getRouterCurent() {
    this.currentRoute = this.router.url.replace('/', '')
    console.log(this.currentRoute)
  }
  genratePath(link: string) {
    return link.replace(this.currentRoute, link);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
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
  // chama função que adiciona objeto ao locastoarge
  addLocalStorage(nameItem: string, dataItem?: any) {
    this.setExpense(nameItem, dataItem)
  }
  // adiciona despesa ao locastorage
  setExpense(name: string, expense: any) {
    this.localStorage.setLocalStorage(name, JSON.stringify(expense))
  }

  // adiciona objeto no array de localstorage e retorarna o array
  generateArrayDataLocalstorage(dataItem: any) {
    this.dataLocalStorage.push(dataItem)
    return this.dataLocalStorage;
  }

  loadLocalstorageDataTable(nameItem: any, dataSourceExpenseModal?: any) {
    let dataSourceLocalstorage = this.localStorage.getLocalStorage(nameItem);
    // se o localstorage não estiver vazio .. eu defino o valor da tabela com o array do localstorage
    if(dataSourceLocalstorage !== null) {
      this.dataSource.data = dataSourceLocalstorage;
      this.dataSource.paginator = this.paginator;
    } else {
      // se estiver vazio eu defino o valor da tabela com os valores do modal..
      this.dataSource.data = dataSourceExpenseModal;
      this.dataSource.paginator = this.paginator;
    }
  }

  generateTotalExpenseArray() {
    let total = this.dataLocalStorage.map(total => total.valor)
    return total;
  }
  totalExpense() {
    let totalArr = this.generateTotalExpenseArray();
    this.total = totalArr.reduce((total, num ) => total + num);
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLowerCase();
  }
}
