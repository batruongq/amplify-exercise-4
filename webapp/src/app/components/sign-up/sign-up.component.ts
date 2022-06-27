import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  formSignUp = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
  });

  errorMessage!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signUp(): void {
    const { email, password, phoneNumber } = this.formSignUp.value;

    const user = {
      username: email,
      password,
      attributes: {
        email,
        phone_number: phoneNumber
      }
    };

    Auth.signUp(user)
      .then(data => {
        console.log('Log signUp', data);
        this.router.navigateByUrl(`/verification/${email}`);
      })
      .catch(err => {
        console.error('Sign up error', err);
        this.errorMessage = err.message;
      });
  }
}
