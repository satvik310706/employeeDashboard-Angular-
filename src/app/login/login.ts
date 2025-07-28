import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userData: any = {
    username: '',
    password: ''
  }
  http = inject(HttpClient)
  router = inject(Router)
  post() {
    this.http.post('http://127.0.0.1:5000/login', this.userData).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl("users")
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
}
