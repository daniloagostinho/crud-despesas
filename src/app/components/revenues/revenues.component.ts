import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { AddExpenseComponent } from 'src/app/shared/add-expense/add-expense.component';
import { StoreService } from 'src/app/shared/service/store.service';
import { AddRevenuesComponent } from '../add-revenues/add-revenues.component';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
})
export class RevenuesComponent implements OnInit {
  displayedColumns: string[] = ['tipoReceita', 'valor', 'dataEntrada'];
  public dataSource = new MatTableDataSource<any>();
  pageSize: any[] = [5, 10, 25, 100];
  loading = false;
  emptyResult!: boolean;
  mouthSelected: any;
  arrRevenues: any[] = [];
  totalRevenues!: number;
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.initDataSource();
    this.getRegisterRevenues(this.mouthSelected);
    this.defineInitMouth();

    this.storeService.getStore().subscribe((res) => {
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

      this.getRegisterRevenues(this.mouthSelected);
    });

    this.storeService.getSearchRevenuesByMouth().subscribe((res) => {
      if (res) {
        // TODO
        this.getRegisterRevenues(this.mouthSelected);
        // this.dataSource.paginator = this.paginator;
      }
    });

    this.storeService.getStoreMouth().subscribe((res) => {
      this.mouthSelected = res;
    });
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(AddRevenuesComponent, {
      width: '900px',
      disableClose: true,
      data: {
        any: '',
      },
    });
  }

  initDataSource() {
    this.storeService.getStoreRegister().subscribe(res => {
      if(res) {
        this.apiService
        .getRegisterRevenues(this.mouthSelected)
        .subscribe((res: any) => {
          this.loading = true;
          let arr: any[] = [];
          if (res.list.length === 0) {
            this.emptyResult = true;
          } else {
            this.emptyResult = false;
            this.arrRevenues = arr;
            // this.dataSource.paginator = this.paginator;
            res.result.forEach((element: any) => {
              arr.push(element.month.name.listMouth);
            });
            this.totalExpense();
          }

          setTimeout(() => {
            this.dataSource.data = res.list;
            this.loading = false;
          }, 2000);
        });
      }
    })

  }

  generateTotalExpenseArray() {
    let total = this.arrRevenues.map((total: any) => Number(total.valor));
    return total;
  }
  totalExpense() {
    let totalArr = this.generateTotalExpenseArray();
    this.totalRevenues = totalArr.reduce((total, num) => total + num, 0);
  }

  defineInitMouth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', { month: 'long' });
    let letterDateString = dateString[0].toUpperCase() + dateString.substr(1);
    this.mouthSelected == undefined
      ? (this.mouthSelected = letterDateString)
      : this.mouthSelected;
  }

  getRegisterRevenues(yearSelected: any) {
    this.apiService.getRegisterRevenues(yearSelected).subscribe((res: any) => {
      this.loading = true;
      let arr: any[] = [];

      if (res.result.length === 0) {
        this.emptyResult = true;
      } else {
        this.emptyResult = false;
        this.arrRevenues = arr;
        // this.dataSource.paginator = this.paginator;
        res.result.forEach((element: any) => {
          arr.push(element.month.name.listMouth);
        });
        this.totalExpense();
      }

      setTimeout(() => {
        this.dataSource.data = arr;
        this.loading = false;
      }, 2000);
    });
  }
}
