import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConservativeComponent } from './pages/conservative/conservative.component';
import { ModerateComponent } from './pages/moderate/moderate.component';
import { AggressiveComponent } from './pages/aggressive/aggressive.component';
import { UserProfilesRoutingModule } from './ui-user-profiles.routing.module';
import { CalculationsComponent } from './pages/calculations/calculations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {CheckboxModule} from 'primeng/checkbox';


import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { GetStocksComponent } from './pages/get-stocks/get-stocks.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    NzNotificationModule,
    NzRateModule,
    NzInputNumberModule,
    NzCheckboxModule,
    CheckboxModule,
    NgChartsModule,
    CommonModule,
    UserProfilesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzModalModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzSelectModule,
    HighchartsChartModule,
  ],
  declarations: [
    ConservativeComponent,
    ModerateComponent,
    AggressiveComponent,
    CalculationsComponent,
    GetStocksComponent,
    // HighchartsChartComponent
  ],
  exports: [
    ConservativeComponent,
    ModerateComponent,
    AggressiveComponent,
    CalculationsComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiUserProfilesModule {}
