import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  user: string = '';
  roles: string = "";
  userData: any[] = [];

  router = inject(Router);

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

  constructor() {
    this.readloggeddata();
    // ✅ Prevent route reuse so same route re-triggers component init
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  readloggeddata() {
    const data = localStorage.getItem("user");
    if (data != null) {
      this.user = data;
    }
  }

  ngOnInit(): void {
    const role = localStorage.getItem("role");
    if (role) {
      this.roles = role;
      this.userData = this.loggedData[role];
    }
  }

  logout() {
    localStorage.removeItem("leaveUser");
    this.router.navigateByUrl("/login");
  }
}
