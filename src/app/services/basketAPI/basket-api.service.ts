import {
  HttpClient,
  HttpHandler,
  HttpParamsOptions,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import {
  DTOGetOrganization,
  DTOGetOrganizations,
  DTOGetSeasonsPerOrganization,
  DTOGetTeamsPerOrganization,
} from './basket-api.types';

@Injectable()
export class BasketAPIService {
  private baseUrl = isDevMode()
    ? 'http://localhost:3000'
    : 'http://localhost:3000';
  private http = inject(HttpClient);

  getOrganizations() {
    return this.http.get<DTOGetOrganizations>(this.baseUrl + '/organizations');
  }

  getOrganization(organizationId: string) {
    return this.http.get<DTOGetOrganization>(
      this.baseUrl + '/organizations/' + organizationId,
      { responseType: 'json' }
    );
  }

  getTeamsPerOrganization(organizationId: string) {
    return this.http.get<DTOGetTeamsPerOrganization>(
      this.baseUrl + '/organizations/' + organizationId + '/teams'
    );
  }

  getSeasonsPerOrganization(organizationId: string) {
    return this.http.get<DTOGetSeasonsPerOrganization>(this.baseUrl + '/organizations/' + organizationId + '/seasons')
  }

  constructor() { }
}
