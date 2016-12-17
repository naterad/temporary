import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {
  errorMessage: any;
  mode = 'Observable';

  constructor() { }

  ngOnInit() {}

}
