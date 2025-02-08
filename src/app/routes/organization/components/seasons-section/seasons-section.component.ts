import { Component, input } from '@angular/core';
import { ISeason } from '../../../../services/basketAPI/basket-api.types';

@Component({
  selector: 'seasons-section',
  standalone: true,
  imports: [],
  templateUrl: './seasons-section.component.html',
  styleUrl: './seasons-section.component.css'
})
export class SeasonsSectionComponent {
  seasons = input.required<Array<ISeason> | null | undefined>()

}
