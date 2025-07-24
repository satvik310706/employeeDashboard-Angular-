import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { New } from '../model/employee.model';
import { Employees } from '../services/employee';  // ✅ Make sure this import is correct

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin implements OnInit {
  router = inject(Router);
  master = inject(Employees); // ✅ Properly inject the service

  newEmp: New = new New();
  roleList$: Observable<any[]> = new Observable<any[]>();
  depsList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit(): void {
    this.roleList$ = this.master.getroles();
    this.depsList$ = this.master.getdeps();
  }

  submitForm() {
    this.master.post(this.newEmp).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Employee created");
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        this.newEmp.employeeName = '';
        alert(err.message);
      }
    });
  }
}
