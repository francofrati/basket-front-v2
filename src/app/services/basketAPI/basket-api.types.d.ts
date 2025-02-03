/* 
    DTOs
*/

export type DTOGetOrganizations = Array<IOrganization>;

export type DTOGetOrganization = IOrganization;

export type DTOGetTeamsPerOrganization = Array<ITeam>;

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
  tournamentId: string;
}
