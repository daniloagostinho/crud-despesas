import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-months-revenues',
  templateUrl: './months-revenues.component.html',
  styleUrls: ['./months-revenues.component.scss']
})
export class MonthsRevenuesComponent implements OnInit {
  mounth!: any;
  @Input() typeItem: any;

  mounths: any[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'];
    i!: number;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getMouthCurrent();
    console.log(this.typeItem)
    this.storeService.getNext().subscribe(res => {
      if(res) {
        this.next();
      }
    })

    this.storeService.getPrev().subscribe(res => {
      if(res) {
        this.prev();
      }
    })
  }

  getMouthCurrent() {
    let date = new Date();
    let dateString = date.toLocaleDateString("pt-br", {month: "long"});
    let letterDateString = dateString[0].toUpperCase() + dateString.substr(1)
    this.mounth = letterDateString;
    this.storeService.setStoreMouth(this.mounth)
  }

  findIndexElement() {
    let returnIndex = this.mounths.findIndex((item) => item === this.mounth);
    this.i = returnIndex;
  }

  prev() {
    this.findIndexElement();
    this.i = this.i - 1;
    this.i = this.i % this.mounths.length;
    this.mounth =  this.mounths[this.i];
    this.storeService.setStoreMouth(this.mounths[this.i])
    if(this.typeItem == 'debts') {
      this.storeService.setSearchDebtsByMouth(true);
    } else {
      this.storeService.setSearchRevenuesByMouth(true)
    }
  }

  next() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.mounths.length;
    this.mounth =  this.mounths[this.i]
    this.storeService.setStoreMouth(this.mounths[this.i])
    if(this.typeItem == 'debts') {
      this.storeService.setSearchDebtsByMouth(true);
    } else {
      this.storeService.setSearchRevenuesByMouth(true)
    }
  }
}
