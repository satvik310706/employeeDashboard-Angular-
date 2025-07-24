import { Component, inject, OnInit } from '@angular/core';
import { Employees } from '../services/employee';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { APIResponse, EmployeeDetails } from '../model/employee.model';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  master = inject(Employees)
  iss: boolean = false;
  roles$: Observable<any[]> = new Observable<any[]>
  departments: Observable<any[]> = new Observable<any[]>
  employees: EmployeeDetails[] = [];
  constructor() {
    this.readloggeddata()
    this.roles$ = this.master.getroles();
    this.departments = this.master.getdeps();
    this.get();
  }
  user = "";
  readloggeddata() {
    const data = localStorage.getItem("user")
    if (data != null) {
      this.user = data
    }
  }
  show() {
    this.iss = true;
  }
  get() {
    this.master.get().subscribe({
      next: (res: APIResponse) => {
        if (res.result) {
          this.employees = res.data
        } else {
          alert(res.message)
        }
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
}
