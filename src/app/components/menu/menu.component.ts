import { Router } from '@angular/router';
import { Menu } from './../../models/menu.model';
import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuList!: Menu[];
  constructor(private localStorageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {

    this.localStorageService.removeLocalStorage('token');
    this.router.navigate(['/'])

  }

  messageHor(): any {
    let hour = new Date().getHours();
    if (hour <= 5) return 'Boa madrugada';
    if (hour < 12) return 'Bom dia'
    if(hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }
}
