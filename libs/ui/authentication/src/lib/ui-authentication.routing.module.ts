import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router'
import { ContainerComponent } from "./pages/container/container.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { LoginComponent } from "./pages/login/login.component";
import { OtpComponent } from "./pages/otp/otp.component";
import { RegistrationComponent } from "./pages/registration/registration.component";

const routes: Routes = [
    {
        path: '',
        component: ContainerComponent,
        children : [
            {path : 'login', component : LoginComponent},
            {path : 'otp/:email', component : OtpComponent},
            {path : 'sign-up', component : RegistrationComponent},
            {path : 'forgot-password', component : ForgotPasswordComponent},
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: '**',  redirectTo: 'login' },
        ],
    },
    { path: '**',  redirectTo: '' },

]

@NgModule({
    exports : [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class AuthenticationRoutingModule{

}