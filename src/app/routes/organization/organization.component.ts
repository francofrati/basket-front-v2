import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrganizationsStore } from '../../stores/organizations/organizations.store';
import { IOrganization, ISeason, ITeam } from '../../services/basketAPI/basket-api.types';
import { IOrganizations } from '../../stores/organizations/organizations.store.types';
import { BasketAPIService } from '../../services/basketAPI/basket-api.service';
import { EMPTY, catchError } from 'rxjs';
import { TeamsSectionComponent } from "./components/teams-section/teams-section.component";
import { SeasonsSectionComponent } from "./components/seasons-section/seasons-section.component";

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [TeamsSectionComponent, SeasonsSectionComponent, RouterLink],
  providers: [BasketAPIService],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css',
})
export class OrganizationComponent implements OnInit {
  constructor(private basketAPI: BasketAPIService) { }

  @Input() organizationId = '';

  organizationsStore = inject(OrganizationsStore);

  organization = signal<IOrganizations | null>(
    this.organizationsStore.organizations()[this.organizationId]
      ? this.organizationsStore.organizations()[this.organizationId]
      : null
  );

  teams = signal<Array<ITeam> | null | undefined>(null)
  seasons = signal<Array<ISeason> | null | undefined>(null)

  ngOnInit(): void {
    const organizationId = this.organizationId;

    const organization = this.organizationsStore.organizations()[
      this.organizationId
    ]
      ? this.organizationsStore.organizations()[this.organizationId]
      : null;

    if (organization) {
      this.organization.set(organization);
    } else {
      this.basketAPI
        .getOrganization(organizationId)
        .pipe(
          catchError((err) => {
            console.log(err);
            alert(err?.message);
            return EMPTY;
          })
        )
        .subscribe((organization) => {
          this.organization.set(organization);
          this.organizationsStore.organizations.update((organizations) => {
            return {
              ...organizations,
              [organizationId]: {
                ...organizations[organizationId],
                ...organization
              },
            };
          });
        });
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
              console.log(err);
              alert(err?.message);
              return EMPTY;
            })
          )
          .subscribe((teams) => {
            this.teams.set(teams);
            this.organizationsStore.updateOrganization(organizationId, { teams: teams });
          });
      }
    } else {
      this.basketAPI
        .getTeamsPerOrganization(organizationId)
        .pipe(
          catchError((err) => {
            console.log(err);
            alert(err?.message);
            return EMPTY;
          })
        )
        .subscribe((teams) => {
          this.teams.set(teams);
          this.organizationsStore.updateOrganization(organizationId, { teams: teams });
        });
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
              console.log(err);
              alert(err?.message);
              return EMPTY;
            })
          )
          .subscribe((seasons) => {
            this.seasons.set(seasons);
            this.organizationsStore.updateOrganization(organizationId, { seasons: seasons });
          });
      }
    } else {
      this.basketAPI
        .getSeasonsPerOrganization(organizationId)
        .pipe(
          catchError((err) => {
            console.log(err);
            alert(err?.message);
            return EMPTY;
          })
        )
        .subscribe((seasons) => {
          this.seasons.set(seasons);
          this.organizationsStore.updateOrganization(organizationId, { seasons: seasons });
        });
    }




  }
}
