import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core'
import { BasketAPIService } from '../../../../services/basketAPI/basket-api.service'
import { OrganizationsStore } from '../../../../stores/organizations/organizations.store'
import { EMPTY, catchError } from 'rxjs'
import { IDate } from '../../../../services/basketAPI/basket-api.types'
import { OrganizationComponent } from '../../organization.component'
import { TOrganizationStore } from '../../../../stores/organizations/organizations.store.types'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-season',
    standalone: true,
    imports: [],
    providers: [BasketAPIService, OrganizationComponent],
    templateUrl: './season.component.html',
    styleUrl: './season.component.css',
})
export class SeasonComponent implements OnInit {
    constructor(private basketAPI: BasketAPIService, private activatedRoute: ActivatedRoute) { }

    @Input() organizationId = ''
    @Input() seasonId = ''

    private organizationStore = inject(OrganizationsStore)

    organizations: Signal<TOrganizationStore> = computed(() => this.organizationStore.organizations())

    dates = signal<Array<IDate> | null>(null)

    ngOnInit(): void {
        const organizationId = this.activatedRoute.parent?.snapshot.paramMap.get('organizationId') as string
        const seasonId = this.seasonId

        const seasons =
            // this.organization.seasons()
            this.organizations()[organizationId]?.seasons


        console.log(this.organizations()[Number(organizationId)])
        const regularPhaseId =
            seasons && seasons.length
                ? seasons.find((season) => season.id === seasonId)
                    ?.regularPhaseId
                : null

        if (!regularPhaseId) {
            console.log('Couldnt find regularPhaseId')
            return
        }

        this.basketAPI
            .getDatesPerRegularPhase(regularPhaseId, organizationId)
            .pipe(
                catchError((err) => {
                    console.log(err)
                    alert(err?.message)
                    return EMPTY
                })
            )
            .subscribe((dates) => {
                this.dates.set(dates)
            })
    }
}
