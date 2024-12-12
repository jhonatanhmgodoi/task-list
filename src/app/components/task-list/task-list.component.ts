import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListService } from './task-list.service';
import { TaskList } from './interfaces/task-list-interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatIconModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  taskList: TaskList[] = []
  displayedColumns: string[] = ['checked', 'description', 'dueDate', 'status', 'delete']

  @Input() isChecked: boolean = false

  private readonly dialog = inject(MatDialog);

  constructor(
    private service: TaskListService
  ) {}

  ngOnInit(): void {
    this.service.getList().subscribe((taskList) => {
      this.taskList = taskList;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      height: '300px',
      width: '800px'
    })

    dialogRef.afterClosed().subscribe((newTask: TaskList) => {
      if (newTask) {
        this.taskList.push(newTask)
        this.taskList = [...this.taskList]
      }
    })
  }

  deleteTask(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.taskList = this.taskList.filter((task) => task.id !== id);
      },
    });
  }
}
