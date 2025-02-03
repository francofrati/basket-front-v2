import { Injectable, signal } from '@angular/core';
import { IOrganizations } from './organizations.store.types';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsStore {
  organizations = signal<{ [organizationId: string]: IOrganizations }>({});
}
