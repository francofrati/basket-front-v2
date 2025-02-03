import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsStore } from '../../stores/organizations/organizations.store';
import { IOrganization } from '../../services/basketAPI/basket-api.types';
import { IOrganizations } from '../../stores/organizations/organizations.store.types';
import { BasketAPIService } from '../../services/basketAPI/basket-api.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [],
  providers: [BasketAPIService],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css',
})
export class OrganizationComponent implements OnInit {
  constructor(private basketAPI: BasketAPIService) {}

  @Input() organizationId = '';

  organizationsStore = inject(OrganizationsStore);

  organization = signal<IOrganizations | null>(
    this.organizationsStore.organizations()[this.organizationId]
      ? this.organizationsStore.organizations()[this.organizationId]
      : null
  );

  logOrgs() {
    console.log(this.organizationsStore.organizations());
  }

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
              [organizationId]: organization,
            };
          });
        });
    }
  }
}
