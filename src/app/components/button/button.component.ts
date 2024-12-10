import { Component } from '@angular/core';
import { TaskList } from '../task-list/interfaces/task-list-interface';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  task: TaskList = {
    id: 0,
    description: '',
    dueDate: '',
    status: 'Pendente'
  }
}
