import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  categorias: any;
  form!: FormGroup;
  categoriaModel: any;
  mounth: any;
  constructor(private fb: FormBuilder, private store: StoreService,
    private dialogRef: MatDialogRef<AddExpenseComponent>,
    private apiService: ApiService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      despesa: [null, Validators.required],
      categoria: [null, Validators.required],
      valor: [null, Validators.required],
      dataVencimento: [null, Validators.required]
    })

    this.categorias = [
      {
        name: 'Casa'
      },
      {
        name: 'Eletromesticos'
      },
      {
        name: 'Saúde'
      },
      {
        name: 'Entretenimento'
      },
      {
        name: 'Outros'
      }
    ]

    this.storeService.getStoreMouth().subscribe(res => {
      console.log('chegou o o mouth -->>', res)
      this.mounth = res;
    })
  }
  submit() {
    this.form.patchValue({
      categoria: this.categoriaModel
    })

    if(this.form.valid) {
      let despesa = this.form.controls['despesa'].value;
      let categoria = this.form.controls['categoria'].value;
      let valor = this.form.controls['valor'].value;
      let dataVencimento = this.form.controls['dataVencimento'].value;

      const payload = {
        name: {
          title: this.mounth,
          listMouth: {
            despesa,
            categoria,
            valor,
            dataVencimento
          }
        }
      }
      this.store.setStore(payload);
      this.apiService.registerRegistrationDebts(payload).subscribe(res => {
        console.log('res --> ', res)
      })

    }

    console.log(this.form)
    this.dialogRef.close();
  }

}
