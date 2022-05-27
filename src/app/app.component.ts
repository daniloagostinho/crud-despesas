import { Student } from './student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from './models/card.model';
import { Menu } from './models/menu.model';
import { TabelaDespesas } from './models/tableDespesas.model';
import { AddExpenseComponent } from './shared/add-expense/add-expense.component';
import { StoreService } from './shared/service/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from './services/localstorage.service';

import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hands-on';
  menu!: Menu[];
  card!: Card[];
  displayedColumns: string[] = ['despesa', 'categoria', 'valor', 'dataVencimento'];
  // displayedColumns: string[] = ['name', 'occupation', 'age']
  public dataSource = new MatTableDataSource<any>();
  data: any[] = []
  student: Student[] = [];
  loading = false;
  dataLocalStorage: any[] = [];
  total: number = 0;
  pageSize: any[] = [5, 10, 25, 100]
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(public dialog: MatDialog, private store: StoreService,
    private studentApiService: ApiService,
    private _snackBar: MatSnackBar,
    private localStorage: LocalstorageService) {

  }

  ngOnInit() {
    this.menu = [
      {name: 'Home'},
      {name: 'Despesas'},
    ]

    // quando abre modal de depsesas
    this.store.getStore().subscribe(res => {

      if(res !== null) {
        this.data.push(res)
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
}
