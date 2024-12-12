import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskListService } from '../task-list/task-list.service';
import { TaskList } from '../task-list/interfaces/task-list-interface';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup
  task: TaskList = {
    id: 150,
    status: 'PENDNTE',
    description: '',
    dueDate: ''
  }

  constructor(
    private readonly service: TaskListService,
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

  onSubmit() {
    if (this.form.valid) {
      this.task = this.form.value
      this.service.add(this.task).subscribe((newTask) => {
        this.closeDialog(newTask)
      })
    }
  }

  closeDialog(dialogResult?: any) {
    this.dialogRef.close(dialogResult)
  }

}
