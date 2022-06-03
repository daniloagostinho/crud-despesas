import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RegisterComponent } from '../register/register.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formRegister!: FormGroup;
  formLogin!: FormGroup;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: ApiService,
    private localstorage: LocalstorageService,
    private router: Router,
    private utilsService: UtilsService) {
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })

    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
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


  login() {
    if(this.formLogin.valid) {
      const email = this.formLogin.get('email')!.value;
      const password = this.formLogin.get('password')!.value;
      const payload = {
        email,
        password
      }

      this.apiService.loginUser(payload).subscribe((res: any) => {
        let {token} = res;
        this.addTokenLocalstorage('token', JSON.stringify(token))
        this.router.navigate(['/dashboard'])
      }, error => {
        this.utilsService.openSnackBar(error.error.message)
      })
    }
  }

  addTokenLocalstorage(name: string, token:any) {
    this.localstorage.setLocalStorage(name, token);
  }
}
