import { RedirectCommand, Router, UrlTree } from '@angular/router'
import { LayoutComponent } from './layouts/layout/layout.component'
import { Error404Component } from './views/auth/error404/error404.component'
import { Error500Component } from './views/auth/error500/error500.component'
import { MaintenanceComponent } from './views/auth/maintenance/maintenance.component'
import { inject } from '@angular/core'
import { AuthenticationService } from './core/service/auth.service'
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './frontoffice/all-template-front/all-template-front.component';
import { BodyComponent } from './FrontOffice/body/body.component';
import { ContactFrontComponent } from './frontoffice/contact-front/contact-front.component';
import { TopicsListingFrontComponent } from './frontoffice/topics-listing-front/topics-listing-front.component';
import { TopicsDetailFrontComponent } from './frontoffice/topics-detail-front/topics-detail-front.component'
export const routes: Routes = [

  {
    path: '',
    component: AllTemplateFrontComponent,
    children: [
      { path: '', component: BodyComponent },
      { path: 'contact', component: ContactFrontComponent },
      { path: 'topics-listing', component: TopicsListingFrontComponent },
      { path: 'topics-detail', component: TopicsDetailFrontComponent }
    ]
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/analytics',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      () => {
        const currentUser = inject(AuthenticationService).session
        const router: Router = inject(Router)
        if (currentUser) return true
        const urlTree: UrlTree = router.parseUrl('/auth/log-in')
        return new RedirectCommand(urlTree, { skipLocationChange: true })
      },
    ],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'not-found',
    component: Error404Component,
    data: { title: '404 - Error' },
  },
  {
    path: 'error-500',
    component: Error500Component,
    data: { title: '500 - Error' },
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },
]
