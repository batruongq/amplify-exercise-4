import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerificationComponent implements OnInit {

  formVerification = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  username!: string;
  errorMessage!: string;

  constructor(private activateRouted: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.username = this.activateRouted.snapshot.paramMap.get('username') as string;

    if (!this.username) {
      console.error('username is required');
    }
  }

  verify(): void {
    const { code } = this.formVerification.value;

    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(this.username, code)
      .then(() => {
        this.router.navigateByUrl('/sign-in');
      })
      .catch(err => {
        console.error(err);
        this.errorMessage = err.message;
      });
  }

}
