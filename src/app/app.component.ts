import {Component, OnInit} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MyValidators } from './my.validators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  form!: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, MyValidators.restrictedEmails]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      adress: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log(`Submit: `, this.form)
      const formData = {...this.form.value}

      console.log(`form data: `, formData)

      this.form.reset()
    }
    
  }

  setCapital() {
    const cityMap = {
      de: "Berlin",
      ua: "Kyiv",
      pl: "Warsaw"
    }

    const adress = this.form.get('adress') as FormGroup
    const country = adress.get('country') as FormControl
    const countryCode: keyof typeof cityMap = country.value
    const city = cityMap[countryCode]

    this.form.patchValue({adress: {city}})
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    //<FormArray>this.form.get('skills').push()
    (this.form.get('skills') as FormArray).push(control)
  }

  getControls() {
    return (this.form.get('skills') as FormArray).controls;
  }
}