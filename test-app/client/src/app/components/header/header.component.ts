import { Component, OnInit } from '@angular/core';
import { faCar, faCircleInfo, faPerson } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCircleInfo = faCircleInfo;
  faPerson = faPerson;
  faCar = faCar;

  constructor() { }

  ngOnInit(): void {
  }

}
