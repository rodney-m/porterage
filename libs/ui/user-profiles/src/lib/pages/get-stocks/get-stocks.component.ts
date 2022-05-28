import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'porterage-get-stocks',
  templateUrl: './get-stocks.component.html',
  styleUrls: ['./get-stocks.component.scss'],
})
export class GetStocksComponent implements OnInit {
  form!: FormGroup
  calculateForm!: FormGroup
  chartsData!: any;
  years :string[] = []
  cumulatedReturn :any[] = []
  showGraph = false;

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


  profiles = [
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
    }
  ]
  categories = [
    {
      id: 1,
      name : 'Financial Services '
    },
    {
      id: 2,
      name : 'Consumer goods '
    }
  ]

  stocks : any[] = [
    // {
    //   id: 9,
    //   value: 9,
    //   companyName: "FBC Holdings Ltd",
    //   label: "FBC Holdings Ltd",
    //   companyCode: "FBC",
    //   unitPrice: 0.36,
    //   minPrice: 0.06,
    //   maxPrice: 1.57,
    //   category: 1,
    //   percentageRisk: 19,
    //   checked: false
    // },
    // {
    //   id: 11,
    //   value: 11,
    //   companyName: "First Capital Bank Ltd",
    //   label: "First Capital Bank Ltd",
    //   companyCode: "FCA",
    //   unitPrice: 0.49,
    //   minPrice: 0.09,
    //   maxPrice: 1.29,
    //   category: 1,
    //   percentageRisk: 13,
    //   checked: false

    // }
  ]

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
  accountTypes = [
    {
      name: 'Individual',
      id: 1
    },
    {
      name: 'Instituition',
      id: 2
    },

  ]
  selectedCompanies = []
  stage2 = false;
  constructor(private formBuilder: FormBuilder, private stocksService: UserProfileService) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      profile: ['', Validators.required],
      category: ['', Validators.required]
    })

    this.calculateForm = this.formBuilder.group({      
        accountType: [1, Validators.required],
        profileType: [1, Validators.required],
        startingAmount: [0, Validators.required],
        period: [0, Validators.required],
      
    })
  }

  submitForm(){
    this.stocksService.getStocks(this.form.value['profile'], this.form.value['category']).subscribe({
      next: (res: any)=> {
        console.log(res.data)
        this.stocks = res.data.map((stock: any) => {
          return {
            ...stock,
            checked: false
          }
        })
        console.log(this.stocks)
        this.stage2 = true;
      },
      error: (err: any)=> {
        console.log(err)
      },
      complete: ()=> {
        console.log("done")
      },
    })
  }

  reCalculate(){
    window.location.reload()    
  }

  calculate(){
    const requestObj : any = {
      ...this.calculateForm.value,
        selectedCompanies: this.selectedCompanies
    }
    
    this.stocksService.caculateReturns(requestObj).subscribe({
      next: (res:any)=> {
        this.showGraph = true;
        let data = res.data.returns
        data.map((object:any) => {
          Object.keys(object).map((key, index) => {
            (key === 'year')?  this.years.push((object['year']).toString()) :    this.cumulatedReturn.push(object['cumulatedReturn'])
          })
        })
      },
      error: (err:any)=> {console.log(err)},
      complete: ()=> {console.log("done")}
    })
  }

  selectCompany(){
    const selectedCompanies : any = this.stocks.filter(stock => stock.checked)
    .map((stock) => stock.id);
    // this.donationsService.getDonationsByCategory(selectedCategories).subscribe((res: any) => {
      //   this.donations = res.data
      // })
      this.selectedCompanies = selectedCompanies
      console.log(selectedCompanies)
  }
}
