import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/service/store.service';

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
    private storeService: StoreService) {
    this.form = this.fb.group({
      valor: [null, Validators.required],
      tipoReceita: [null, Validators.required],
      dataEntrada: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.receitas = [
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

      const payload = {
        month: {
          name: {
            title: this.mouth,
            listMouth: {
              tipoReceita,
              valor,
              dataEntrada
            }
          }
        }
      }

      this.apiService.registerRevenues(payload).subscribe((res: any) => {
        if(res) {
          this.storeService.setStorageRegisterRevenues(true)
        }
      })
    }


    this.dialogRef.close();
  }

}
