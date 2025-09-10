import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.router.navigate(['home'])
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(4)]]
    })
  }

  login() {
    localStorage.setItem('user', JSON.stringify({email:this.loginForm.value.email}))
    if(this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'admin') {
      this.router.navigate(['home']);
    }
  }

}
