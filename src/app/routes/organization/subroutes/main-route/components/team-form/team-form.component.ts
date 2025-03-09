import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BasketAPIService } from '../../../../../../services/basketAPI/basket-api.service';
import { OrganizationsStore } from '../../../../../../stores/organizations/organizations.store';
import { ICategory } from '../../../../../../services/basketAPI/basket-api.types';
import { catchError, EMPTY } from 'rxjs';
import { CustomModalComponent } from '../../../../../../components/custom-modal/custom-modal.component';

@Component({
  selector: 'team-form',
  standalone: true,
  imports: [CustomModalComponent],
  providers: [BasketAPIService, CustomModalComponent],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css'
})
export class TeamFormComponent {
  constructor(private basketAPI: BasketAPIService) { }

  @Input({ required: true }) organizationId = ''
  @Input({ required: true }) setAddTeamModal: any = () => { }

  organizationStore = inject(OrganizationsStore)

  categories: WritableSignal<Array<ICategory>> = signal([])

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
