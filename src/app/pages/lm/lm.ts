import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lm.html',
  styleUrls: ['./lm.css']
})
export class Lm implements OnInit {
  leaveList: any[] = [];
  http = inject(HttpClient);

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
        } else {
          alert("Couldn't fetch data: " + res.message);
        }
      },
      error: err => alert(err.message)
    });
  }

  approve(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/ApproveLeave?id=${id}`).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Approved");
          this.get();
        } else {
          alert(res.message);
        }
      },
      error: err => alert(err.message)
    });
  }

  reject(id: number) {
    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/RejectLeave?id=${id}`).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Rejected");
          this.get();
        } else {
          alert(res.message);
        }
      },
      error: err => alert(err.message)
    });
  }
}
