import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidations } from 'src/app/shared/validations/form-validation';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  adress: string = 'endereco';
  changeDocument!: boolean;
  documentsList: any[] = [
    {
      name: 'CPF',
    },
    {
      name: 'CNH',
    }
  ]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {
    this.form = this.fb.group({
      name: [data.data.name, Validators.required],
      email: [data.data.email, [Validators.required, Validators.email]],
      password: [data.data.password, Validators.required],
      confirmPassword: [null, [Validators.required, FormValidations.equalsTo('password')]],
      cnh: this.fb.array([]),
      cpf: this.fb.array([])
    })
  }

  ngOnInit(): void {
    console.log(this.form)
  }

  get cnh() {
    return this.form.controls["cnh"] as FormArray;
  }

  get cpf() {
    return this.form.controls['cpf'] as FormArray;
  }

  cnhForm = this.fb.group({
    numero: [null, Validators.required],
    dataEmissao: [null, Validators.required],
  })

  formCpf = this.fb.group({
    numero: [null, Validators.required]
  })

  selected(f: any) {
    if(f === 'CNH') {
      this.changeDocument = true;
      if(this.changeDocument) {
        this.cnh.push(this.cnhForm)
      }
    } else if(f === 'CPF') {
      this.changeDocument = false;
      if(!this.changeDocument) {
        this.cpf.push(this.formCpf)
      }
    }
  }

  submit() {
    console.log(this.form)
    if(this.form.valid) {

      const name = this.form.get('name')!.value;
      const email = this.form.get('email')!.value;
      const password = this.form.get('password')!.value;
      const confirmPassword = this.form.get('confirmPassword')!.value;

      const payload = {
        name,
        email,
        password,
        confirmPassword
      }
      this.apiService.registerUser(payload).subscribe((res: any) => {
        this.utilsService.openSnackBar(res.message)
        this.refreshPage();
      }, error => {
        console.log('error recebido do catherror', error)
        this.utilsService.openSnackBar(error.error.message)
      })
    }
  }
  refreshPage() {
    setTimeout(() => {
      location.reload();
    }, 3000)
  }
}

