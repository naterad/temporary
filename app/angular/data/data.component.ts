import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'data-comp',
	templateUrl: 'data.component.html',
	providers: [],
	styleUrls: ['data.component.css']
})

export class DataComponent implements OnInit {

	constructor(
    private router: Router
  ) {
    console.log("this gets called first. Both get called on page load");
  }

	ngOnInit() {
    console.log("this gets called second. Both get called on page load");
  }

}
