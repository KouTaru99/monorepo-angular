import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vcs-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Đăng nhập</h2>
        
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
          <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
            Email là bắt buộc
          </mat-error>
          <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">
            Email không hợp lệ
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Mật khẩu</mat-label>
          <input matInput formControlName="password" type="password">
          <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">
            Mật khẩu là bắt buộc
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" 
                [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>

        <div class="error" *ngIf="error">
          {{ error }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }

    form {
      width: 100%;
      max-width: 400px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    button {
      width: 100%;
      margin-top: 16px;
    }

    .error {
      color: red;
      margin-top: 16px;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = error.error?.message || 'Đăng nhập thất bại';
          this.isLoading = false;
        }
      });
  }
} 