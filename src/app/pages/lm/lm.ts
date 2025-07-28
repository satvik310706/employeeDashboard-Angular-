import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './lm.html',
  styleUrls: ['./lm.css']
})
export class Lm implements OnInit {
  leaveList: any[] = [];
  filters = {
    employeeId: '',
    status: ''
  };

  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);
  snack = inject(MatSnackBar);

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeaves").subscribe({
      next: (res: any) => {
        if (res.result) {
          this.leaveList = res.data.map((leave: any) => ({
            ...leave,
            status: leave.isApproved === true ? 'Approved' :
              leave.isApproved === false ? 'Rejected' : 'Pending'
          }));
          this.leaveList = [...this.leaveList]; // Trigger refresh
          this.cdr.detectChanges();
        } else {
          this.snack.open("Couldn't fetch data: " + res.message, 'Close', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      },
      error: err => this.snack.open(err.message, 'Close', {
        duration: 3000,
        panelClass: ['snack-error']
      })
    });
  }

  approve(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/ApproveLeave?id=${id}`)
      .pipe(finalize(() => this.get()))
      .subscribe({
        next: (res: any) => {
          const msg = res.result ? "✅ Leave Approved" : res.message;
          this.snack.open(msg, 'Close', {
            duration: 3000,
            panelClass: res.result ? ['snack-success'] : ['snack-error']
          });
        },
        error: err => this.snack.open(err.message, 'Close', {
          duration: 3000,
          panelClass: ['snack-error']
        })
      });
  }

  reject(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/RejectLeave?id=${id}`)
      .pipe(finalize(() => this.get()))
      .subscribe({
        next: (res: any) => {
          const msg = res.result ? "❌ Leave Rejected" : res.message;
          this.snack.open(msg, 'Close', {
            duration: 3000,
            panelClass: res.result ? ['snack-danger'] : ['snack-error']
          });
        },
        error: err => this.snack.open(err.message, 'Close', {
          duration: 3000,
          panelClass: ['snack-error']
        })
      });
  }

  filteredLeaves() {
    return this.leaveList.filter(item => {
      const matchEmployee = this.filters.employeeId === '' || item.employeeId.toString().includes(this.filters.employeeId);
      const matchStatus = this.filters.status === '' || item.status === this.filters.status;
      return matchEmployee && matchStatus;
    });
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
