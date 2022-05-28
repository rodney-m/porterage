import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AggressiveComponent } from "./pages/aggressive/aggressive.component";
import { CalculationsComponent } from "./pages/calculations/calculations.component";
import { ConservativeComponent } from "./pages/conservative/conservative.component";
import { GetStocksComponent } from "./pages/get-stocks/get-stocks.component";
import { ModerateComponent } from "./pages/moderate/moderate.component";

const routes = [
    {
        path: 'conservative', component : ConservativeComponent
    },
    {
        path: 'aggressive', component : AggressiveComponent
    },
    {
        path: 'moderate', component : ModerateComponent
    },
    {
        path: 'calculations', component : CalculationsComponent
    },
    {
        path: '', component : GetStocksComponent
    },
    { path: '**',  redirectTo: 'calculations' },
    
]

@NgModule({
    imports : [RouterModule.forChild(routes)]
})
export class UserProfilesRoutingModule{
    
}