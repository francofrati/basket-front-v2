import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'organization',
    },
    {
        path: 'organization',
        pathMatch: 'full',
        loadComponent: () => {
            return import(
                './routes/organizations/organizations.component'
            ).then((m) => m.OrganizationsComponent)
        },

    },
    {
        path: 'organization/:organizationId',
        loadComponent: () => {
            return import('./routes/organization/organization.component').then(
                (m) => m.OrganizationComponent
            )
        },
        children: [
            {
                path: 'season/:seasonId',
                pathMatch: 'full',
                loadComponent: () => {
                    return import(
                        './routes/organization/subroutes/season/season.component'
                    ).then((m) => m.SeasonComponent)
                },
            },
            {
                path: '', pathMatch: 'full', loadComponent: () => {
                    return import('./routes/organization/subroutes/main-route/main-route.component').then(
                        (m) => m.MainRouteComponent
                    )
                }
            },
        ]
    },

]
