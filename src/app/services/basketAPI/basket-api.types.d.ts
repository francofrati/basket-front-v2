/* 
    DTOs
*/

export type DTOGetOrganizations = Array<IOrganization>

export type DTOGetOrganization = IOrganization

export type DTOGetTeamsPerOrganization = Array<ITeam>

export type DTOGetSeasonsPerOrganization = Array<ISeason>

export type DTOGetDatesPerRegularPhase = Array<IDate>

export type DTOGetCategoriesPerOrganization = Array<ICategory>

/*
    Models
*/

export interface IOrganization {
    id: string
    created_at: string
    name: string
    description: string | null
    logoUrl: string | null
}

export interface ITeam {
    id: string
    created_at: string
    name: string
    description: string | null
    logoUrl: string | null
    categoryId: string
    categoryName: string
}

export interface ISeason {
    id: string
    created_at: string
    seasonName: string
    categoryId: string
    categoryName: string
    tournamentId: string
    regularPhaseId: string
    playoffId: string
    seasonId: string
    dates: Array<IDate>
}

export interface IDate {
    dateId: string
    dateName: string
    startDate: string
    endDate: string
    index: string
}

export interface ICategory {
    id: string
    created_at: string
    name: string
    description: string
    tournamentId: string
}
