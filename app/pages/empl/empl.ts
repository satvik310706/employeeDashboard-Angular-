import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, EmployeeDetails } from '../model/employee.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empl',
  imports: [CommonModule, FormsModule],
  templateUrl: './empl.html',
  styleUrl: './empl.css'
})
export class Empl implements OnInit {
  http = inject(HttpClient)
  emp: any[] = [];
  emps: any[] = [];
  search: string = "";
  get() {
    this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees").subscribe({
      next: (res: any) => {
        if (res.result) {
          this.emp = res.data;
          this.emps = res.data;
        }
        else {
          alert(res.message)
        }
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
  filtr() {
    this.emp = this.emps.filter(c => c.employeeName.toLowerCase().includes(this.search))
    this.search = '';
  }
  ngOnInit(): void {
    this.get();
  }
}
