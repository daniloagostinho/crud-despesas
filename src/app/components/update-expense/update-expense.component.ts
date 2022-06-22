import { LocalstorageService } from './../../services/localstorage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
})
export class UpdateExpenseComponent implements OnInit {
  form!: FormGroup;
  categorias: any;
  categoriaModel: any;
  categoriaSelect: any;
  mouth: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: StoreService,
    private dialogRef: MatDialogRef<UpdateExpenseComponent>,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      despesa: [null, Validators.required],
      categoria: [null, Validators.required],
      valor: [null, Validators.required],
      dataVencimento: [null, Validators.required],
    });

    this.categorias = [
      {
        name: 'Casa',
      },
      {
        name: 'Eletromesticos',
      },
      {
        name: 'Saúde',
      },
      {
        name: 'Entretenimento',
      },
      {
        name: 'Outros',
      },
    ];

    this.fillData();

    this.store.getStoreMouth().subscribe(res => {
      this.mouth = res;
    })
  }

  fillData() {
    console.log(this.data)
    if(this.data) {

      this.form.patchValue({
        despesa: this.data.data.despesa,
        categoria: this.data.data.categoria,
        valor: this.data.data.valor,
        dataVencimento: this.data.data.dataVencimento
      })
    }
  }

  submit() {
    this.form.patchValue({
      categoria: this.categoriaModel,
    });

    if (this.form.valid) {
      this.categoriaSelect = this.data.data.categoria;
      let user = this.localStorage.getLocalStorage('user')

      const payload = {
        user: {
          title: user,
          mouth: {
            title: this.mouth,
            listMouth: {
              despesa: this.form.controls['despesa'].value,
              categoria: this.form.controls['categoria'].value,
              valor: this.form.controls['valor'].value,
              dataVencimento: this.form.controls['dataVencimento'].value,
            }
          }
        }
      };

      this.apiService
        .updateDebts(this.data.data._id, payload)
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
