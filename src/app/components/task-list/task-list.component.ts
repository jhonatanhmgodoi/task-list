import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListService } from './task-list.service';
import { TaskList } from './interfaces/task-list-interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  taskList: TaskList[] = [];
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
    this.dialog.open(CreateTaskComponent, {
      height: '300px',
      width: '800px'
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
