import { Component } from '@angular/core';
import {HeaderFrontComponent} from "@/app/FrontOffice/header-front/header-front.component";
import {FooterFrontComponent} from "@/app/FrontOffice/footer-front/footer-front.component";
import {RouterOutlet} from "@angular/router";
import {BodyComponent} from "@/app/FrontOffice/body/body.component";

@Component({
  selector: 'app-all-template-front',
  imports: [
    HeaderFrontComponent,
    FooterFrontComponent,
    RouterOutlet,
    BodyComponent
  ],
  templateUrl: './all-template-front.component.html',
  standalone: true,
  styleUrl: './all-template-front.component.scss'
})
export class AllTemplateFrontComponent {

}
