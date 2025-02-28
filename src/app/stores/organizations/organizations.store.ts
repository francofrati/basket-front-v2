import { Injectable, signal } from '@angular/core'
import { IOrganizations, OrganizationId } from './organizations.store.types'

@Injectable({
    providedIn: 'root',
})
export class OrganizationsStore {
    public organizations = signal<Record<OrganizationId, IOrganizations>>({})

    updateOrganization(
        organizationId: string,
        newOrganizationData: IOrganizations
    ) {
        this.organizations.update((organizations) => {
            return {
                ...organizations,
                [organizationId]: organizations[organizationId]
                    ? {
                          ...organizations[organizationId],
                          ...newOrganizationData,
                      }
                    : {
                          ...newOrganizationData,
                      },
            }
        })
    }
}
