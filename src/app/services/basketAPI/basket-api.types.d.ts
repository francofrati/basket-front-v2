/* 
    DTOs
*/

export type DTOGetOrganizations = Array<IOrganization>;

export type DTOGetOrganization = IOrganization;

export type DTOGetTeamsPerOrganization = Array<ITeam>;

export type DTOGetSeasonsPerOrganization = Array<ISeason>

/*
    Models
*/

export interface IOrganization {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
}

export interface ITeam {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  categoryId: string;
  categoryName: string
}

export interface ISeason {
  id: string;
  created_at: string;
  seasonName: string;
  categoryId: string;
  categoryName: string
  tournamentId: string
  regularPhaseId: string
  playoffId: string
  seasonId: string
}
