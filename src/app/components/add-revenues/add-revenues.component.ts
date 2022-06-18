import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit {
  form!: FormGroup;
  receitas: any[] = [];
  tipoReceitaModel: any;
  mouth: any;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddRevenuesComponent>,
    private apiService: ApiService,
    private storeService: StoreService,
    private localstorageService: LocalstorageService) {
    this.form = this.fb.group({
      valor: [null, Validators.required],
      tipoReceita: [null, Validators.required],
      dataEntrada: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.receitas = [
      {
        name: 'Investimento'
      },
      {
        name: 'Outros'
      },
      {
        name: 'Premio'
      },
      {
        name: 'Entretenimento'
      },
      {
        name: 'Presente'
      },
      {
        name: 'Salário'
      }
    ]

    this.storeService.getStoreMouth().subscribe(res => {
      this.mouth = res
    })
  }


  submit() {
    this.form.patchValue({
      tipoReceita: this.tipoReceitaModel
    })

    if(this.form.valid) {
      let tipoReceita = this.form.controls['tipoReceita'].value;
      let valor = this.form.controls['valor'].value;
      let dataEntrada = this.form.controls['dataEntrada'].value;
      let user = this.localstorageService.getLocalStorage('user')

      const payload = {
        user: {
          title: user,
          mouth: {
            title: this.mouth,
            listMouth: {
              tipoReceita,
              valor,
              dataEntrada
            }
          }
        }
      }

      this.apiService.registerRevenues(payload, user).subscribe((res: any) => {
        if(res) {
          this.storeService.setStorageRegisterRevenues(true)
        }
      })
    }


    this.dialogRef.close();
  }

}
