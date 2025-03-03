import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core'
import { BasketAPIService } from '../../services/basketAPI/basket-api.service'
import { EMPTY, catchError } from 'rxjs'
import { IOrganization } from '../../services/basketAPI/basket-api.types'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { OrganizationsStore } from '../../stores/organizations/organizations.store'
import { TOrganizationStore } from '../../stores/organizations/organizations.store.types'
@Component({
    selector: 'app-organizations',
    standalone: true,
    imports: [RouterLink],
    providers: [BasketAPIService, DatePipe],
    templateUrl: './organizations.component.html',
    styleUrl: './organizations.component.css',
})
export class OrganizationsComponent implements OnInit {
    constructor(
        private basketAPI: BasketAPIService,
        private datePipe: DatePipe // private organizationsStore: OrganizationsStore
    ) { }

    organizationsStore = inject(OrganizationsStore)

    cleanStore = () => { this.organizationsStore.cleanStore() }

    // @ts-ignore
    organizations: Signal<Array<IOrganization>> = computed(() => this.organizationsStore.organizationsArr())

    logOrgs() {
        console.log(this.organizationsStore.organizations())
    }

    ngOnInit(): void {
        this.basketAPI
            .getOrganizations()
            .pipe(
                catchError((err) => {
                    console.log(err)
                    alert(err?.message)
                    return EMPTY
                })
            )
            .subscribe((organizations) => {
                //Setting locally for the component
                // this.organizations.set(
                //     organizations.map((organization) => ({
                //         ...organization,
                //         created_at: this.datePipe.transform(
                //             organization.created_at,
                //             'short'
                //         ) as string,
                //     }))
                // )

                //Setting in the store
                this.organizationsStore.organizations.set(
                    organizations.reduce((acc, current) => {
                        return {
                            ...acc,
                            [current.id]:
                                this.organizationsStore.organizations()[
                                    current.id
                                ]
                                    ? {
                                        ...this.organizationsStore.organizations()[
                                        current.id
                                        ],
                                        ...current,
                                    }
                                    : current,
                        }
                    }, {})
                )
            })
    }
}
