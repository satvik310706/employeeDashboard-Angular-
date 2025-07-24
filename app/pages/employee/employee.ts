import { Component, inject, OnInit } from '@angular/core';
import { Employees } from '../services/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { APIResponse, EmployeeDetails, New } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class Employee implements OnInit {
  search: string = '';
  showAddForm: boolean = false;
  master = inject(Employees)
  emps: EmployeeDetails[] = []
  emp: any[] = [];
  roleList$: Observable<any[]> = new Observable<any[]>
  depsList$: Observable<any[]> = new Observable<any[]>

  newEmp: New = new New();
  ngOnInit(): void {
    this.get();
    this.roleList$ = this.master.getroles();
    this.depsList$ = this.master.getdeps();
  }
  get() {
    this.master.get().subscribe({
      next: (res: APIResponse) => {
        if (res.result) {
          this.emps = res.data
          this.emp = res.data;
        } else {
          alert(res.message)
        }
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
  show() {
    console.log("show")
    this.showAddForm = true;
  }
  closeForm() {
    this.showAddForm = false;
  }
  submitForm() {
    this.master.post(this.newEmp).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.get();
          alert("Employee created");
          this.showAddForm = false;
        }
        else {
          alert(res.message);
        }
      }, error: (err: any) => {
        this.newEmp.employeeName = '';
        alert(err.message);
      }
    })
  }
  edit(i: any) {
    this.newEmp = i;
    this.showAddForm = true;
  }
  put() {
    this.master.put(this.newEmp).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.get();
          alert("Employee Updated");
          this.showAddForm = false;
        }
        else {
          alert(res.message);
        }
      }, error: (err: any) => {
        this.newEmp.employeeName = '';
        alert(err.message);
      }
    })
  }
  delete(obj: number) {
    this.master.delete(obj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert(res.message)
          this.get();
        } else {
          alert(res.message);
        }
      }, error: (err: any) => {
        alert(err.message);
      }
    })
  }
  filtr() {
    this.emps = this.emp.filter(c => c.employeeName.toLowerCase().includes(this.search))
  }
}
