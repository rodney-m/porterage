import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@porterage/core";
import { ContainerComponent } from "@porterage/ui/layout";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('@porterage/ui/authentication').then(c => c.UiAuthenticationModule) },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {
        path : '', 
        component : ContainerComponent, 
        canActivate: [AuthGuard],
        children : 
            [
                {path : 'calculations', loadChildren: () => import('@porterage/ui/user-profiles').then(c => c.UiUserProfilesModule)},
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