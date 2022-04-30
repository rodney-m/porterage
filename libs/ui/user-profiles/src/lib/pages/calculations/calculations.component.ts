import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '@porterage/core';
import * as Highcharts from 'highcharts';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'porterage-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss'],
})
export class CalculationsComponent implements OnInit {
  calculateForm!: FormGroup
  chartsData!: any;
  years :string[] = []
  cumulatedReturn :any[] = []
  accountType: any = null;
  title  = ''
  
  profileTypes = [
    {
      id: 1,
      name : 'Conservative '
    },
    {
      id: 2,
      name : 'Moderate '
    },
    {
      id: 3,
      name : 'Aggressive '
    },
  ]
  constructor(private formBuilder : FormBuilder, private userProfilesService: UserProfileService, private jwtHelperService : JwtHelperService, private tokenService: TokenService) {    
  }

  ngOnInit(): void {
    this.calculateForm = this.formBuilder.group({
      profileType: ['', Validators.required],
      startingAmount: ['', Validators.required],
      period: ['', Validators.required]
    })

    const token =  this.tokenService.getToken()

    this.accountType = this.jwtHelperService.decodeToken(token).AccountType
    if(this.accountType === 'Individual') {
      this.accountType = 1
    } else {
      this.accountType = 2
    } 
  }

  calculate(){
    if (!this.calculateForm.valid) {return ;}
    const requestObj = {
      accountType: this.accountType,
      profileType: this.calculateForm.value['profileType'],
      startingAmount: this.calculateForm.value['startingAmount'],
      period: this.calculateForm.value['period']
    }
    this.userProfilesService.caculateReturns(requestObj).subscribe((res :any ) => {
      this.setTitle()
      let data = res.data.returns
      data.map((object:any) => {
        Object.keys(object).map((key, index) => {
          (key === 'year')?  this.years.push((object['year']).toString()) :    this.cumulatedReturn.push(object['cumulatedReturn'])
        })
      })
      console.log(this.title)
    })
  }

  setTitle(){
    const selectedProfile = this.profileTypes.find((profile)=> {
      return profile.id === this.calculateForm.value['profileType']

    })
    console.log('selectedProfile', selectedProfile)
    this.title = `${selectedProfile?.name}Risk Profile Expected Range of Return`
  }

  get Title(){
    return this.title
  }



  highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Risk Profile Expected Range of Return'
    },
    xAxis: {
      title: {
        text: 'Year'
      },
      categories: this.years
    },
    yAxis: {
      title: {
        text: "Portfolio valuation"
      }
    },
    series: [{
      data: this.cumulatedReturn,
      type: 'spline'
    }]
  }

  



}
