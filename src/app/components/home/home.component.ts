import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formRegister!: FormGroup;
  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  openDialogRegister() {

    const dataDialog = {
      name: this.formRegister.controls['name'].value,
      email: this.formRegister.controls['email'].value,
      password: this.formRegister.controls['password'].value
    }
    this.dialog.open(RegisterComponent, {
      width: '900px',
      disableClose: true,
      data: {
        data: dataDialog,
      },
    });
  }
}
