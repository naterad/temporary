import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'login-comp',
	templateUrl: 'login.component.html',
	providers: [],
	styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  user: Object = {};

	constructor(
    private router: Router
  ) {}

	ngOnInit() {}

  login(){
    console.log(this.user);

    let link = ['/data'];
		this.router.navigate(link);
  }
}
