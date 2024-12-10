import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<'Caixa fechada'>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/) // não aceita espaço vazio
        ]
      )],
      dueDate: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/) // data no formato DD/MM/AAAA
        ]
      )],
      status: ['', Validators.required]
    })
  }



  closeDialog() {
    this.dialogRef.close()
  }

}
