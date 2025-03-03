import { Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router'
import { OrganizationsStore } from '../../stores/organizations/organizations.store'
import {
    IOrganization,
    ISeason,
    ITeam,
} from '../../services/basketAPI/basket-api.types'
import { IOrganizations, OrganizationId } from '../../stores/organizations/organizations.store.types'
import { BasketAPIService } from '../../services/basketAPI/basket-api.service'
import { EMPTY, catchError } from 'rxjs'

@Component({
    selector: 'app-organization',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    providers: [BasketAPIService],
    templateUrl: './organization.component.html',
    styleUrl: './organization.component.css',
})
export class OrganizationComponent implements OnInit {
    constructor(private basketAPI: BasketAPIService) { }

    @Input() organizationId = ''

    organizationsStore = inject(OrganizationsStore)

    organizations: Signal<Record<OrganizationId, IOrganizations>> = computed(() => this.organizationsStore.organizations())
    //@ts-ignore
    organizationsArr: Signal<Array<IOrganization>> = computed(() => this.organizationsStore.organizationsArr())

    organization: WritableSignal<IOrganizations | null> = signal<IOrganizations | null>(null)

    readOrg: Signal<any> = computed(() => this.organizationsStore.organizations()[this.organizationId])

    teams = signal<Array<ITeam> | null | undefined>(null)
    seasons = signal<Array<ISeason> | null | undefined>(null)

    ngOnInit(): void {
        const organizationId = this.organizationId

        const organization = this.organizations()[
            this.organizationId
        ]
            ? this.organizations()[this.organizationId]
            : null

        if (organization) {
            this.organization.set(organization)
        } else {
            this.basketAPI
                .getOrganization(organizationId)
                .pipe(
                    catchError((err) => {
                        console.log(err)
                        alert(err?.message)
                        return EMPTY
                    })
                )
                .subscribe((organization) => {
                    this.organization.set(organization)
                    this.organizationsStore.organizations.update(
                        (organizations) => {
                            return {
                                ...organizations,
                                [organizationId]: {
                                    ...organizations[organizationId],
                                    ...organization,
                                },
                            }
                        }
                    )
                })
        }

        if (organization) {
            const teams = organization.teams
            if (teams) {
                this.teams.set(teams)
            } else {
                this.basketAPI
                    .getTeamsPerOrganization(organizationId)
                    .pipe(
                        catchError((err) => {
                            console.log(err)
                            alert(err?.message)
                            return EMPTY
                        })
                    )
                    .subscribe((teams) => {
                        this.teams.set(teams)
                        this.organizationsStore.updateOrganization(
                            organizationId,
                            { teams: teams }
                        )
                    })
            }
        } else {
            this.basketAPI
                .getTeamsPerOrganization(organizationId)
                .pipe(
                    catchError((err) => {
                        console.log(err)
                        alert(err?.message)
                        return EMPTY
                    })
                )
                .subscribe((teams) => {
                    this.teams.set(teams)
                    this.organizationsStore.updateOrganization(organizationId, {
                        teams: teams,
                    })
                })
        }

        if (organization) {
            const seasons = organization.seasons
            if (seasons) {
                this.seasons.set(seasons)
            } else {
                this.basketAPI
                    .getSeasonsPerOrganization(organizationId)
                    .pipe(
                        catchError((err) => {
                            console.log(err)
                            alert(err?.message)
                            return EMPTY
                        })
                    )
                    .subscribe((seasons) => {
                        this.seasons.set(seasons)
                        this.organizationsStore.updateOrganization(
                            organizationId,
                            { seasons: seasons }
                        )
                    })
            }
        } else {
            this.basketAPI
                .getSeasonsPerOrganization(organizationId)
                .pipe(
                    catchError((err) => {
                        console.log(err)
                        alert(err?.message)
                        return EMPTY
                    })
                )
                .subscribe((seasons) => {
                    this.seasons.set(seasons)
                    this.organizationsStore.updateOrganization(organizationId, {
                        seasons: seasons,
                    })
                })
        }
    }
}
