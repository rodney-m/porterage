import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@porterage/core";
import { ContainerComponent } from "@porterage/ui/layout";

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('@porterage/ui/authentication').then(c => c.UiAuthenticationModule) },
    {
        path : '', 
        component : ContainerComponent, 
        canActivate: [AuthGuard],
        children : 
            [
                {path : 'user-profiles', loadChildren: () => import('@porterage/ui/user-profiles').then(c => c.UiUserProfilesModule)},
                {path: '', redirectTo: 'user-profiles', pathMatch: 'full'}
            ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}