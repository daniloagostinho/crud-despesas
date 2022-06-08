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
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements OnInit {
  displayedColumns: string[] = ['tipoReceita', 'valor', 'dataEntrada'];
  public dataSource = new MatTableDataSource<any>();
  pageSize: any[] = [5, 10, 25, 100]
  loading = false;
  constructor(public dialog: MatDialog, private apiService: ApiService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  applyFilter(event: Event) {
    console.log(event)
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
        this.apiService.getRegister().subscribe((res: any) => {
          console.log('res getRegister -->> ', res)
          this.dataSource.data = res.list;
        })
      }
    })

  }
}
