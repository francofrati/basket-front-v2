import {
    Component,
    inject,
    Input,
    input,
    OnChanges,
    OnInit,
    signal,
} from '@angular/core'
import { catchError, EMPTY } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { BasketAPIService } from '../../../../../../services/basketAPI/basket-api.service'
import { OrganizationsStore } from '../../../../../../stores/organizations/organizations.store'
import { ITeam } from '../../../../../../services/basketAPI/basket-api.types'

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

    @Input({ required: true }) setAddTeamModal: any = () => { }

    log() {
        console.log('child', this.organizationStore.organizations())
    }
}
