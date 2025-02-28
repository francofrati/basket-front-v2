import {
    Component,
    inject,
    Input,
    input,
    OnChanges,
    OnInit,
    signal,
} from '@angular/core'
import { OrganizationComponent } from '../../organization.component'
import { OrganizationsStore } from '../../../../stores/organizations/organizations.store'
import { ITeam } from '../../../../services/basketAPI/basket-api.types'
import { BasketAPIService } from '../../../../services/basketAPI/basket-api.service'
import { catchError, EMPTY } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'teams-section',
    standalone: true,
    templateUrl: './teams-section.component.html',
    providers: [BasketAPIService],
    styleUrl: './teams-section.component.css',
})
export class TeamsSectionComponent {
    organizationStore = inject(OrganizationsStore)
    teams = input.required<Array<ITeam> | null | undefined>()

    log() {
        console.log('child', this.organizationStore.organizations())
    }
}
