import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.component.html',
  standalone: true,
  styleUrl: './body.component.scss'
})
export class BodyComponent
  implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
