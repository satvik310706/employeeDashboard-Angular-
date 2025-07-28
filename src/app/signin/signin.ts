import { CommonModule } from '@angular/common';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {
  router = inject(Router)
  userData: any = {
    username: '',
    password: ''
  }
  logi() {
    this.router.navigateByUrl("login")
  }
  http = inject(HttpClient)
  post() {
    this.http.post('http://127.0.0.1:5000/signin', this.userData).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
}
