import { FormControl } from "@angular/forms";

export class MyValidators {

  static restrictedEmails(control: FormControl): {[key: string]: boolean} {
    if (['sdf@mail.ru', 'sdf@bigmir.net'].includes(control.value)) {
      return {restrictedEmail: true}
    }
    return {}
  }

}