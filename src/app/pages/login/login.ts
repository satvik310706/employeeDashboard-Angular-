import { Component, inject } from '@angular/core';
import { LoginModel } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { Employees } from '../services/employee';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginObj: LoginModel = new LoginModel();
  master = inject(Employees);
  router = inject(Router);
  login() {
    this.master.onLogin(this.loginObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.router.navigateByUrl('/dashboard');
          localStorage.setItem("leaveUser", JSON.stringify(res.data));
          localStorage.setItem("user", res.data.employeeName)
          localStorage.setItem("role", res.data.role)
        }
        else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        alert(err.message);
      }
    })
  }
}
