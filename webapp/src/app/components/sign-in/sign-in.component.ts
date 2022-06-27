import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  formSignIn = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn(): void {
    const { email, password } = this.formSignIn.value;

    const authInfo = {
      username: email,
      password
    };

    Auth.signIn(authInfo)
      .then((user) => {
        console.log('In login', user);
        localStorage.setItem('ex4', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
}
