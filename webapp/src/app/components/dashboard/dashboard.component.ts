import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit(): void {
    const profileStorage = localStorage.getItem('ex4') || '';
    this.user = JSON.parse(profileStorage);
  }
}
