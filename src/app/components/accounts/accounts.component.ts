import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private api: ApiService,
    private _snackBar: MatSnackBar,) { }
  files!: Set<File>;
  filePreview: any;
  currentPercent = 0;
  loading = false;
  ngOnInit(): void {
  }
  preview(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    document.getElementById('file-upload')!.innerHTML = files![0].name;
    const fileNames = [];
    this.files = new Set();

    for(let i = 0; i < files!.length; i++) {
      fileNames.push(files![i].name)
      this.files.add(files![i])
    }
  }

  callUpload() {
    this.loading = true;
    if(this.files && this.files.size > 0) {
      this.api.uploadFile(this.files).subscribe(res => {
        if (res.type === HttpEventType.Response) {
          this.loading = false;
          this.openSnackBar('Upload realizado com sucesso!')
        }
      })
    }
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
    })
  }
}
