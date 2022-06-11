import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';

export enum Mounths {
  'Janeiro' = 'Janeiro',
  'Fevereiro' = 'Fevereiro',
  'Março' =  'Março'
}

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {
  mounth!: any;
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
    this.storeService.setSearchDebtsByMouth(true);
  }

  next() {
    this.findIndexElement();
    this.i = this.i + 1;
    this.i = this.i % this.mounths.length;
    this.mounth =  this.mounths[this.i]
    this.storeService.setStoreMouth(this.mounths[this.i])
    this.storeService.setSearchDebtsByMouth(true);
  }
}
