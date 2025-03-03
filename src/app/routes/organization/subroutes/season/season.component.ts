import { Component, Input, OnInit, inject, signal } from '@angular/core'
import { BasketAPIService } from '../../../../services/basketAPI/basket-api.service'
import { OrganizationsStore } from '../../../../stores/organizations/organizations.store'
import { EMPTY, catchError } from 'rxjs'
import { IDate } from '../../../../services/basketAPI/basket-api.types'

@Component({
    selector: 'app-season',
    standalone: true,
    imports: [],
    providers: [BasketAPIService],
    templateUrl: './season.component.html',
    styleUrl: './season.component.css',
})
export class SeasonComponent implements OnInit {
    constructor(private basketAPI: BasketAPIService) {}

    @Input() organizationId = ''
    @Input() seasonId = ''

    organizationStore = inject(OrganizationsStore)

    dates = signal<Array<IDate> | null>(null)

    ngOnInit(): void {
        const organizationId = this.organizationId
        const seasonId = this.seasonId

        console.log(this.organizationStore.organizations()[organizationId])

        const seasons =
            this.organizationStore.organizations()[organizationId]?.seasons
        const regularPhaseId =
            seasons && seasons.length
                ? seasons.find((season) => season.id === seasonId)
                      ?.regularPhaseId
                : null

        if (!regularPhaseId) {
            alert('Couldnt find regularPhaseId')
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
