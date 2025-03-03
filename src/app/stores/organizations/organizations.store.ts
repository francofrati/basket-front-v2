import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core'
import { IOrganizations, OrganizationId, TOrganizationStore } from './organizations.store.types'

@Injectable({
    providedIn: 'root',
})
export class OrganizationsStore {
    public organizations: WritableSignal<TOrganizationStore> = signal<TOrganizationStore>({})
    public organizationsArr: Signal<Array<IOrganizations>> = computed(() => Object.values(this.organizations()).map((organization) => ({
        ...organization
    })))

    cleanStore() {
        this.organizations.set({})
    }

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
