import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message;
  messageStatus;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
        username: ['', [
          Validators.required
        ]],
        password: ['', [
          Validators.required
        ]]
      }
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
    this.formDisable();
    this.authService.login(this.form.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.messageStatus = 'alert alert-success';
          this.message = data.message;

          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        } else {
          this.messageStatus = 'alert alert-danger';
          this.message = data.message;

          this.formEnable();
        }
      });
  }
  // Q7e%dSx$
  formDisable() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  formEnable() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

}
