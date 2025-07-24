import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
          this.leaveList = [...this.leaveList]; // Force refresh
          this.cdr.detectChanges();             // Trigger UI update
        } else {
          alert("Couldn't fetch data: " + res.message);
        }
      },
      error: err => alert(err.message)
    });
  }

  approve(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/ApproveLeave?id=${id}`)
      .pipe(finalize(() => this.get()))
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Approved");
          } else {
            alert(res.message);
          }
        },
        error: err => alert(err.message)
      });
  }

  reject(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/RejectLeave?id=${id}`)
      .pipe(finalize(() => this.get()))
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Rejected");
          } else {
            alert(res.message);
          }
        },
        error: err => alert(err.message)
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
