import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private fb: FormBuilder, private store: StoreService,
    private dialogRef: MatDialogRef<AddExpenseComponent>) { }

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
        despesa,
        categoria,
        valor,
        dataVencimento
      }

      console.log('payload >>> ', payload)
      this.store.setStore(payload);
    }

    console.log(this.form)
    this.dialogRef.close();
  }
}
