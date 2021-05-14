import {Routes} from '@angular/router';

import {ShellComponent} from './shell.component';

export const ShellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'pricing',
        loadChildren: () => import('../modules/pricing/pricing.module').then(m => m.PricingModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../modules/contact-us/contact-us.module').then(m => m.ContactUsModule)
      }
    ]
  }
];
