import {Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  form!: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      adress: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', Validators.required)
      })
    })
  }

  submit() {
    if (this.form.valid) {
      console.log(`Submit: `, this.form)
      const formData = {...this.form.value}

      console.log(`form data: `, formData)
    }
    
  }

  setCapital() {
    const cityMap = {
      de: "Berlin",
      ua: "Kyiv",
      pl: "Warsaw"
    }

    const adress: FormControl = this.form.get('adress')
    const cityKey: FormControl = adress.get('country')
    const value = cityKey?.value
    console.log(cityMap?[value]: '')
    //const city = cityMap?[cityKey]

    //console.log(city)
    //this.form.patchValue({adress: {city}})
  }
}

