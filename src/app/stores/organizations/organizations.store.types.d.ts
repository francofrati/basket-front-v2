import { IOrganization, ISeason, ITeam } from '../../services/basketAPI/basket-api.types';

export interface IOrganizations extends Partial<IOrganization> {
    teams?: Array<Iteam> | null
    seasons?: Array<ISeason> | null
}

export type OrganizationId = string
