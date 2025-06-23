import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-logo-box',
    imports: [RouterLink],
    template: `
    <div class="brand">
      <a routerLink="/" class="logo">
        <span class="me-6">
          <img
            src="assets/images/logo-sm.png"
            alt="logo-small"
            class="logo-sm"
          />
        </span>

        
      </a>
    </div>
  `,
    styles: ``
})
export class LogoBoxComponent {}
