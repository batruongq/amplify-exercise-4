import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  formVerification = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private activateRouted: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  verify() {
    const { code } = this.formVerification.value;

    const username = this.activateRouted.snapshot.params.username;

    if (!username) {
      console.error('username is required');
      return;
    }

    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
      }).then(data => {
        console.log('In Verify', data);
        this.router.navigateByUrl('/sign-in');
      })
        .catch(err => console.log(err));
  }

}
