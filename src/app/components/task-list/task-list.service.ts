import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from './interfaces/task-list-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private api = 'http://localhost:9000/tasks'

  constructor(private http: HttpClient) { }

  getList(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.api)
  }

  // add(): Observable<TaskList> {}

  // update(): Observable<TaskList> {}

  delete(id: number): Observable<TaskList> {
    const url = `${this.api}/${id}`
    return this.http.delete<TaskList>(url)
  }

}
