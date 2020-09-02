import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-dots',
  templateUrl: './loader-dots.component.html',
  styleUrls: ['./loader-dots.component.scss']
})
export class LoaderDotsComponent implements OnInit {
  @Input() altStyles;

  constructor() { }

  ngOnInit(): void {
  }

}
