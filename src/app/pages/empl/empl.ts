// empl.ts (Full Fixed Version)
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APIResponse, EmployeeDetails } from '../model/employee.model';

@Component({
  selector: 'app-empl',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empl.html',
  styleUrl: './empl.css'
})
export class Empl implements OnInit {
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  emp: EmployeeDetails[] = [];   
  emps: EmployeeDetails[] = [];  
  search: string = '';
  selectedDept: string = '';
  selectedRole: string = '';

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.http.get<APIResponse>('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees')
      .subscribe({
        next: (res) => {
          if (res.result) {
            this.emps = [...res.data];
            this.emp = [...res.data];
            this.cdr.detectChanges();
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          alert('Error fetching employee data.');
          console.error(err);
        }
      });
  }

  get uniqueDepartments(): string[] {
    return Array.from(new Set(this.emp.map(e => e.deptName))).filter(Boolean);
  }

  get uniqueRoles(): string[] {
    return Array.from(new Set(this.emp.map(e => e.role))).filter(Boolean);
  }

  filtr(): void {
    this.applyFilters();
  }

  sortBy(field: keyof EmployeeDetails): void {
    const sorted = [...this.emp].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }
      return 0;
    });

    this.emp = [...sorted];
    this.cdr.detectChanges();
  }

  applyFilters(): void {
    const keyword = this.search.trim().toLowerCase();
    this.emp = this.emps.filter(e =>
      (!keyword || e.employeeName.toLowerCase().includes(keyword)) &&
      (!this.selectedDept || e.deptName === this.selectedDept) &&
      (!this.selectedRole || e.role === this.selectedRole)
    );
    this.cdr.detectChanges();
  }
}
