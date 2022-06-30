import { LocalstorageService } from '../../services/localstorage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-update-revenues',
  templateUrl: './update-revenues.component.html',
  styleUrls: ['./update-revenues.component.scss'],
})
export class UpdateRevenuesComponent implements OnInit {
  form!: FormGroup;
  categorias: any;
  categoriaModel: any;
  categoriaSelect: any;
  mouth: any;
  tipoReceitaModel: any;
  receitas: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: StoreService,
    private dialogRef: MatDialogRef<UpdateRevenuesComponent>,
    private localStorage: LocalstorageService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      valor: [null, Validators.required],
      tipoReceita: [null, Validators.required],
      dataEntrada: [null, Validators.required]
    })

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

    this.fillData();

    this.store.getStoreMouth().subscribe(res => {
      this.mouth = res;
    })
  }

  fillData() {
    if(this.data) {
      console.log('data -->>', this.data)
      this.categoriaSelect = this.data.data.tipoReceita;
      this.form.patchValue({
        valor: this.data.data.valor,
        tipoReceita: this.data.data.tipoReceita,
        dataEntrada: this.data.data.dataEntrada
      })
    }
}

submit() {
  const categoriaInput  = this.form.get('tipoReceita')!.value;
  if(!categoriaInput) {
    this.form.patchValue({
      tipoReceita: this.tipoReceitaModel,
    });
  }
  if(this.form.valid) {
    let tipoReceita = this.form.controls['tipoReceita'].value;
    let valor = this.form.controls['valor'].value;
    let dataEntrada = this.form.controls['dataEntrada'].value;
    let user = this.localStorage.getLocalStorage('user')

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


    this.apiService
    .updateReveues(this.data.data._id, payload)
    .subscribe((res) => {
      if (res) {
        if(res) {
          this.store.setStore(true);
        }
      }
    });
  }


  this.dialogRef.close();
}
}
