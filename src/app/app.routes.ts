import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'organization',
  },
  {
    path: 'organization',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./routes/organizations/organizations.component').then(
        (m) => m.OrganizationsComponent
      );
    },
  },
  {
    path: 'organization/:organizationId',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./routes/organization/organization.component').then(
        (m) => m.OrganizationComponent
      );
    },
  },
];
