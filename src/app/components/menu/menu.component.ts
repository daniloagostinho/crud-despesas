import { Menu } from './../../models/menu.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuList!: Menu[];
  @Input() nameClient!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
