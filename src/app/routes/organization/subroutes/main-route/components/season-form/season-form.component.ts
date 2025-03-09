import { Component, computed, inject, input, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CustomModalComponent } from "../../../../../../components/custom-modal/custom-modal.component";
import { OrganizationsStore } from '../../../../../../stores/organizations/organizations.store';
import { BasketAPIService } from '../../../../../../services/basketAPI/basket-api.service';
import { ICategory, ITeam } from '../../../../../../services/basketAPI/basket-api.types';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'season-form',
  standalone: true,
  imports: [CustomModalComponent],
  providers: [BasketAPIService],
  templateUrl: './season-form.component.html',
  styleUrl: './season-form.component.css'
})
export class SeasonFormComponent implements OnInit {
  constructor(private basketAPI: BasketAPIService) { }

  @Input({ required: true }) organizationId = ''
  @Input({ required: true }) setAddSeasonModal: any = () => { }

  organizationStore = inject(OrganizationsStore)

  categories: WritableSignal<Array<ICategory>> = signal([])

  teams: Signal<Array<ITeam>> = computed(() => this.organizationStore.organizations()[this.organizationId].teams ?? [])

  ngOnInit(): void {
    this.basketAPI.getCategoriesPerOrganization(this.organizationId).pipe(
      catchError((err) => {
        console.log(err)
        alert(err?.message)
        return EMPTY
      })
    ).subscribe((categories) => {
      this.categories.set(categories)
    })
  }
}
