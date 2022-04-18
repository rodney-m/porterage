import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from "@porterage/ui/layout";

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('@porterage/ui/authentication').then(c => c.UiAuthenticationModule) },
    {
        path : '', component : ContainerComponent, children : 
            [

            ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}