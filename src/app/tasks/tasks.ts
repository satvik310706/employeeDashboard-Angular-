import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  m: any;
  a: any[] = [];
  cdr = inject(ChangeDetectorRef)
  userData: any = {
    username: '',
    password: ''
  }
  i = false;
  http = inject(HttpClient)
  ngOnInit(): void {
    this.fetch();
  }
  fetch() {
    this.http.get("http://127.0.0.1:5000").subscribe({
      next: (res: any) => {
        console.log(res)
        this.a = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  editUser(id: any) {
    this.userData = id;
    this.m = id._id;
    this.i = true;
  }
  deleteUser(id: string) {
    this.http.delete(`http://127.0.0.1:5000/delete/${id}`).subscribe({
      next: (res: any) => {
        console.log(res)
        this.fetch();

      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  submitEdit() {
    this.http.put(`http://127.0.0.1:5000/user/${this.m}`, this.userData).subscribe({
      next: (res: any) => {
        this.i = false
        console.log(res)
        this.fetch();

      }, error: (err: any) => {
        console.log(err)
      }
    })
  }
}