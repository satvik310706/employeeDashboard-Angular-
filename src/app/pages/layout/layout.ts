import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  user: string = '';
  router = inject(Router)
  loggedData: any = {
    "Employee": [
      { path: "dashboard", title: "Dashboard" },
      { path: "empleavemanager", title: "Employees" },
      { path: "leave", title: "Leave Requests" }
    ],
    "Admin": [
      { path: "dashboard", title: "Dashboard" },
      { path: "employee", title: "EmployeeList" },
      { path: "leavemanagement", title: "Leave Management" }
    ],
    "Admin Department Employee": [
      { path: "dashboard", title: "Dashboard" },
      { path: "employee", title: "EmployeeList" },
      { path: "leavemanagement", title: "Leave Management" }
    ],
    "Department Head": [
      { path: "dashboard", title: "Dashboard" },
      { path: "employee", title: "EmployeeList" },
      { path: "leavemanagement", title: "Leave Management" }
    ]
  }
  constructor() { this.readloggeddata() }
  readloggeddata() {
    const data = localStorage.getItem("user")
    if (data != null) {
      this.user = data
    }
  }
  roles: string = "";
  userData: any[] = [];
  ngOnInit(): void {
    const a = localStorage.getItem("role")
    if (a) {
      this.userData = this.loggedData[a]
      this.roles = a
    }
  }
  logout() {
    localStorage.removeItem("leaveUser");
    this.router.navigateByUrl("/login")
  }
}
