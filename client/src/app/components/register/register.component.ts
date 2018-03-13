import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
        this.validatorRegex.bind(this, /^[a-zA-Z0-9]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validatorRegex.bind(this, /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]],
      password: ['', [
        Validators.required,
        this.validatorRegex.bind(this, /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/)
      ]],
      confirm: ['', [
        Validators.required
      ]]
    }, {validator: this.confirmPasswords});
  }

  validatorRegex(regex, control: AbstractControl) {
    return regex.test(control.value) ? null : {'NotValid': true};
  }

  confirmPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm.value;

    return pass === confirmPass ? null : {notSame: true}
  }

  onSubmit() {
    console.log(this.form);
  }

  ngOnInit() {
  }


}
