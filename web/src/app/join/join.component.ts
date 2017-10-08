import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { JoinService } from '../services/join/join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  joinForm: FormGroup;
  private email: string = '';
  private username: string = '';
  private password: string = '';

  isRegistered: boolean = false;

  constructor(private fb: FormBuilder, private joinService: JoinService, private router: Router) {
    this.joinForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'username': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z_0-9]+$'), Validators.minLength(4), Validators.maxLength(15)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() {
  }
  handleJoin(joinInfo) {
    this.joinService.join(joinInfo).subscribe(res => {
      if (res.status) {
        this.router.navigate(['/preview'])
      } else {
        this.isRegistered = true;
      }
    })
  }
}
