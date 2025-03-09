import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BasketAPIService } from '../../../../services/basketAPI/basket-api.service';
import { OrganizationsStore } from '../../../../stores/organizations/organizations.store';
import { IOrganizations } from '../../../../stores/organizations/organizations.store.types';
import { ISeason, ITeam } from '../../../../services/basketAPI/basket-api.types';
import { catchError, EMPTY } from 'rxjs';
import { TeamsSectionComponent } from './components/teams-section/teams-section.component';
import { SeasonsSectionComponent } from './components/seasons-section/seasons-section.component';
import { SeasonFormComponent } from "./components/season-form/season-form.component";
import { TeamFormComponent } from './components/team-form/team-form.component';

@Component({
  selector: 'app-main-route',
  standalone: true,
  imports: [TeamsSectionComponent, SeasonsSectionComponent, SeasonFormComponent, TeamFormComponent],
  providers: [BasketAPIService],
  templateUrl: './main-route.component.html',
  styleUrl: './main-route.component.css'
})
export class MainRouteComponent {

  constructor(private basketAPI: BasketAPIService) { }

  @Input() organizationId = ''

  organizationsStore = inject(OrganizationsStore)

  organization = signal<IOrganizations | null>(
    this.organizationsStore.organizations()[this.organizationId]
      ? this.organizationsStore.organizations()[this.organizationId]
      : null
  )

  teams = signal<Array<ITeam> | null | undefined>(null)
  seasons = signal<Array<ISeason> | null | undefined>(null)

  addSeasonModal = signal<boolean>(false)
  addTeamModal = signal<boolean>(false)

  openAddSeasonModal() {
    return this.addSeasonModal.set
  }
  closeAddSeasonModal() {
    this.addSeasonModal.set(false)
  }

  ngOnInit(): void {
    const organizationId = this.organizationId

    const organization = this.organizationsStore.organizations()[
      this.organizationId
    ]
      ? this.organizationsStore.organizations()[this.organizationId]
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
