import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Employees } from '../services/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { APIResponse, EmployeeDetails, New } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class Employee implements OnInit {
  search: string = '';
  showAddForm: boolean = false;
  master = inject(Employees);
  cdr = inject(ChangeDetectorRef);

  emps: EmployeeDetails[] = [];
  emp: EmployeeDetails[] = [];

  roleList$: Observable<any[]> = new Observable<any[]>;
  depsList$: Observable<any[]> = new Observable<any[]>;

  newEmp: New = new New();

  // Filter states
  selectedDept: string = '';
  selectedRole: string = '';
  selectedGender: string = '';

  ngOnInit(): void {
    this.get();
    this.roleList$ = this.master.getroles();
    this.depsList$ = this.master.getdeps();
  }

  get() {
    this.master.get().subscribe({
      next: (res: APIResponse) => {
        if (res.result) {
          this.emps = [...res.data];
          this.emp = [...res.data];
          this.cdr.detectChanges();
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        alert(err);
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
    this.master.post(this.newEmp).pipe(
      finalize(() => this.get())
    ).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Employee created");
          this.showAddForm = false;
          this.newEmp = new New();
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        alert(err.message);
      }
    });
  }

  edit(emp: EmployeeDetails) {
    this.newEmp = JSON.parse(JSON.stringify(emp));
    this.showAddForm = true;
  }

  put() {
    this.master.put(this.newEmp).pipe(
      finalize(() => this.get())
    ).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Employee Updated");
          this.showAddForm = false;
          this.newEmp = new New();
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        alert(err.message);
      }
    });
  }
  delete(id: number) {
    if (!confirm("Are you sure you want to delete?")) return;

    this.master.delete(id).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.emps = this.emps.filter(e => e.employeeId !== id);
          this.emp = this.emp.filter(e => e.employeeId !== id);
          this.cdr.detectChanges();
        } else {
          this.emps = this.emps.filter(e => e.employeeId !== id);
          this.emp = this.emp.filter(e => e.employeeId !== id);
          this.cdr.detectChanges();
          console.log(res.message)
        }
      },
      error: (err: any) => {
        this.emps = this.emps.filter(e => e.employeeId !== id);
        this.emp = this.emp.filter(e => e.employeeId !== id);
        this.cdr.detectChanges();
        console.log(err.message)
      }
    });
  }


  // Get unique values for filter dropdowns
  get uniqueDepartments(): string[] {
    return Array.from(new Set(this.emp.map(e => e.deptName))).filter(Boolean);
  }
  get uniqueRoles(): string[] {
    return Array.from(new Set(this.emp.map(e => e.role))).filter(Boolean);
  }

  // Apply all filters
  applyFilters() {
    const keyword = this.search.trim().toLowerCase();
    this.emps = this.emp.filter(e =>
      (!keyword || e.employeeName.toLowerCase().includes(keyword)) &&
      (!this.selectedDept || e.deptName === this.selectedDept) &&
      (!this.selectedRole || e.role === this.selectedRole)
    );
  }

  // Update filter on search
  filtr() {
    this.applyFilters();
  }
}
