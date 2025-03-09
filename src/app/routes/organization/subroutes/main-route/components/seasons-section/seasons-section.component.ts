import { Component, Input, input } from '@angular/core'
import { ISeason } from '../../../../../../services/basketAPI/basket-api.types'
import { RouterLink } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'seasons-section',
    standalone: true,
    imports: [RouterLink, MatIconModule],
    templateUrl: './seasons-section.component.html',
    styleUrl: './seasons-section.component.css',
})
export class SeasonsSectionComponent {
    seasons = input.required<Array<ISeason> | null | undefined>()
    @Input({ required: true }) setAddSeasonModal: any = () => { }
}
