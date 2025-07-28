import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { New } from '../model/employee.model';
import { Employees } from '../services/employee';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  // ✅ Snackbar

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin implements OnInit {
  router = inject(Router);
  master = inject(Employees);
  snackbar = inject(MatSnackBar); // ✅ Inject snackbar

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
          this.showToast('🎉 Employee created successfully!', 'success');
          this.router.navigateByUrl('/dashboard');
        } else {
          this.showToast(res.message, 'error');
        }
      },
      error: (err: any) => {
        this.newEmp.employeeName = '';
        this.showToast(err.message || 'Something went wrong', 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error',
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
