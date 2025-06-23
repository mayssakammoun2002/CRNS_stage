import { Route } from '@angular/router'
import { AnalyticsComponent } from './analytics/analytics.component'
import { EcommerceComponent } from './ecommerce/ecommerce.component'
import {
  WorkflowDesignerComponent
} from "@views/dashboards/analytics/components/workflow-designer/workflow-designer.component";

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Analytics' },
  },
  {
    path: 'ecommerce',
    component: EcommerceComponent,
    data: { title: 'Ecommerce' },
  },
  {
    path: 'workflow',
    component: WorkflowDesignerComponent,
    data: { title: 'workflow' },
  },
]
