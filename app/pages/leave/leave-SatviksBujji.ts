import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employees } from '../services/employee';
import { CommonModule, DatePipe } from '@angular/common';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave implements OnInit {
  leaveList: any[] = [];
  showForm: boolean = false;
  cdr = inject(ChangeDetectorRef);
  currentTabname: string = 'myLeave';
  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(null),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null)
  })
  master = inject(Employees)
  constructor() {
    const loggedData = localStorage.getItem("leaveUser")
    if (loggedData) {
      const loggedata = JSON.parse(loggedData)
      this.leaveForm.controls['employeeId'].setValue(loggedata.employeeId)
    }
  }
  ngOnInit(): void {
    this.load();
  }
  load() {
    const empId = this.leaveForm.controls['employeeId'].value;
    if (!empId) {
      console.warn("No employeeId found. Skipping load.");
      return;
    }
    this.master.getl(empId).subscribe({
      next: (res: any) => {
        this.leaveList = [...res.data];
        this.cdr.detectChanges();
      }
    })
  }

  changeTab(tab: string) {
    this.currentTabname = tab;
  }
  submitLeaveRequest() {
    const a = this.leaveForm.value;
    this.master.postl(a).subscribe({
      next: () => {
        this.showForm = false;
        this.load();
      },
      error: (err: any) => {
        alert(err.message);
        this.showForm = false;
      }
    })
  }
  shoForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }
}
