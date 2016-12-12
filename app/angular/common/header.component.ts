import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'header-comp',
	templateUrl: 'header.component.html',
	providers: [],
	styleUrls: []
})

export class HeaderComponent implements OnInit {


	constructor() { }

	ngOnInit() {}
}
