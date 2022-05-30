import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValidations } from 'src/app/shared/validations/form-validation';

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
    private fb: FormBuilder
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

  addField(campo: string) {
    console.log('campo -->> ', campo)
    const adress = this.fb.group({
      street: [null, Validators.required],
      district: [null, Validators.required],
      number: [null, Validators.required]
    })

    const personalData = this.fb.group({
      cpf: [null, Validators.required],
      cnh: [null, Validators.required],
      profession: [null, Validators.required]
    })

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
    console.log('form -->> ', this.form);
  }
}

