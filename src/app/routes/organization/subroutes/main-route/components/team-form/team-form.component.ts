import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BasketAPIService } from '../../../../../../services/basketAPI/basket-api.service';
import { OrganizationsStore } from '../../../../../../stores/organizations/organizations.store';
import { DTOAddTeam, ICategory } from '../../../../../../services/basketAPI/basket-api.types';
import { catchError, EMPTY, single } from 'rxjs';
import { CustomModalComponent } from '../../../../../../components/custom-modal/custom-modal.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'team-form',
  standalone: true,
  imports: [CustomModalComponent, ReactiveFormsModule],
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
  selectedCategory: WritableSignal<string> = signal('')

  teamName = new FormControl('')
  teamDescription = new FormControl('')
  teamLogoUrl = new FormControl('')

  selectCategory(category: string) {
    if (category === this.selectedCategory()) {
      this.selectedCategory.set('')
      return
    }
    this.selectedCategory.set(category)
  }

  addTeam(e: MouseEvent) {
    e.preventDefault()
    console.log(this.teamName.value, this.teamDescription.value, this.teamLogoUrl.value, this.selectedCategory())

    const isTeamNameValid = this.teamName.valid
    const isCategoryValid = this.selectedCategory() !== ''

    if (!isTeamNameValid || !isCategoryValid) {
      const errorMessage = {
        Category: isCategoryValid ? undefined : 'Select one Category',
        TeamName: isTeamNameValid ? undefined : 'Invalid Team Name'
      }
      alert(JSON.stringify(errorMessage))
      return
    }

    const addTeamBody: DTOAddTeam = {
      categoryId: this.selectedCategory(),
      teamDescription: this.teamDescription.value,
      teamLogoUrl: this.teamLogoUrl.value,
      teamName: this.teamName.value as string,
    }

    this.basketAPI.addTeam(addTeamBody).pipe(
      catchError((err) => {
        alert(JSON.stringify(err))
        return EMPTY
      })
    ).subscribe((res) => {
      alert(JSON.stringify(res))
    })
  }

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
