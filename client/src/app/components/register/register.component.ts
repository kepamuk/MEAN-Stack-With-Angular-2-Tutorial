import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  message;
  messageStatus;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
    this.form = this.fb.group({
        username: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          this.validatorRegex.bind(this, /^[a-zA-Z0-9]+$/)
        ], this.checkField.bind(this, 'username')],
        email: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          this.validatorRegex.bind(this, /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ], this.checkField.bind(this, 'email')],
        password: ['', [
          Validators.required,
          this.validatorRegex.bind(this, /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/)
        ]],
        confirm: ['', [
          Validators.required
        ]]
      },
      {validator: this.confirmPasswords}
    );
  }

  validatorRegex(regex, control: AbstractControl) {
    return regex.test(control.value) ? null : {'NotValid': true};
  }

  checkField(type, control: AbstractControl) {

    return this.auth.checkField(control.value, type)
      .map((data: any) => {
        console.log(data);
        return data.success ? null : {checkField: true};
      });
  }

  confirmPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm.value;

    return pass === confirmPass ? null : {notSame: true}
  }

  onSubmit() {
    console.log(this.form.value);
    this.formDisable();

    this.auth.registration(this.form.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.messageStatus = 'alert alert-success';
          this.message = data.message;

          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.messageStatus = 'alert alert-danger';
          this.message = data.message;

          this.formEnable();
        }
      });
  }

  formDisable() {
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  formEnable() {
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  ngOnInit() {
  }

}
