import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _snackBar: MatSnackBar,) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
    })
  }
}
