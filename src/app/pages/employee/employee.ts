import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Employees } from '../services/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { APIResponse, EmployeeDetails, New } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, MatSnackBarModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class Employee implements OnInit {
  search: string = '';
  showAddForm: boolean = false;

  master = inject(Employees);
  cdr = inject(ChangeDetectorRef);
  snackBar = inject(MatSnackBar);

  emps: EmployeeDetails[] = [];
  emp: EmployeeDetails[] = [];

  roleList$: Observable<any[]> = new Observable<any[]>();
  depsList$: Observable<any[]> = new Observable<any[]>();

  newEmp: New = new New();

  // Filter states
  selectedDept: string = '';
  selectedRole: string = '';
  selectedGender: string = '';

  ngOnInit(): void {
    this.fetchAll();
    this.roleList$ = this.master.getroles();
    this.depsList$ = this.master.getdeps();
  }

  fetchAll() {
    this.master.get().subscribe({
      next: (res: APIResponse) => {
        if (res.result) {
          const deletedIds = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
          this.emp = res.data.filter((emp: { employeeId: any; }) => !deletedIds.includes(emp.employeeId));
          this.emps = [...this.emp];
          this.cdr.detectChanges();
        } else {
          this.showToast(res.message, 'error');
        }
      },
      error: (err: any) => {
        this.showToast(err.message, 'error');
      }
    });
  }

  show() {
    this.showAddForm = true;
    this.newEmp = new New();
  }

  closeForm() {
    this.showAddForm = false;
    this.newEmp = new New();
  }

  submitForm() {
    this.master.post(this.newEmp).pipe(finalize(() => this.fetchAll())).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.showToast("✅ Employee created", 'success');
          this.showAddForm = false;
          this.newEmp = new New();
        } else {
          this.showToast(res.message, 'error');
        }
      },
      error: (err: any) => {
        this.showToast(err.message, 'error');
      }
    });
  }

  edit(emp: EmployeeDetails) {
    this.newEmp = JSON.parse(JSON.stringify(emp));
    this.showAddForm = true;
  }

  put() {
    this.master.put(this.newEmp).pipe(finalize(() => this.fetchAll())).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.showToast("✅ Employee Updated", 'success');
          this.showAddForm = false;
          this.newEmp = new New();
        } else {
          this.showToast(res.message, 'error');
        }
      },
      error: (err: any) => {
        this.showToast(err.message, 'error');
      }
    });
  }

  delete(id: number) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    let deletedIds = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
    deletedIds.push(id);
    localStorage.setItem('deletedEmployees', JSON.stringify(deletedIds));

    this.master.delete(id).pipe(finalize(() => this.fetchAll())).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.showToast("🗑️ Employee deleted", 'warn');
        } else {
          this.showToast(res.message, 'error');
        }
      },
      error: (err: any) => {
        this.showToast(err.message, 'error');
      }
    });
  }

  // Clear deleted employees from localStorage (call this on logout)
  clearDeletedCache() {
    localStorage.removeItem('deletedEmployees');
  }

  // Toast/snackbar alerts
  showToast(message: string, type: 'success' | 'error' | 'warn' = 'success') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' :
        type === 'error' ? 'snack-error' :
          'snack-warn'
    });
  }

  // Filter dropdown logic
  get uniqueDepartments(): string[] {
    return Array.from(new Set(this.emp.map(e => e.deptName))).filter(Boolean);
  }

  get uniqueRoles(): string[] {
    return Array.from(new Set(this.emp.map(e => e.role))).filter(Boolean);
  }

  applyFilters() {
    const keyword = this.search.trim().toLowerCase();
    this.emps = this.emp.filter(e =>
      (!keyword || e.employeeName.toLowerCase().includes(keyword)) &&
      (!this.selectedDept || e.deptName === this.selectedDept) &&
      (!this.selectedRole || e.role === this.selectedRole)
    );
  }

  filtr() {
    this.applyFilters();
  }
}
