import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DesignService } from "../design.service";

@Component({
  selector: "app-design",
  templateUrl: "./design.component.html",
  styleUrls: ["./design.component.scss"],
})
export class DesignComponent implements OnInit {

  customerForm: FormGroup;
  countriesArray = [];
  selectedOption: string;
  citiesArray = [];

  constructor(private fb: FormBuilder, private designService: DesignService) {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      flatNo: ['', Validators.required],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      country: ['', Validators.required],
      primaryPhone: ['', [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/)]],
      secondaryPhone: ['', [Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/)]],
      aadhaaar: ['', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.minLength(12), Validators.maxLength(12)]],
      pancard: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
    });
  }

  ngOnInit() {
    // this.designService.countries().subscribe(countries => {
    //   countries.data.forEach(element => {
    //     this.countriesArray.push(element.country);
    //   })
    // })
  }


  // onOptionChange(event: any) {
  //   this.selectedOption = event.target.value;
  //   this.designService.countries().subscribe(countries => {
  //     console.log('countries:', countries);
  //     countries.data.forEach(element => {
  //       let country = this.customerForm.get('country').value;
  //       element.cities.forEach(city => {
  //         if (country == element.country) {
  //           this.citiesArray.push(city);
  //         }
  //       });
  //     })
  //   })
  //   console.log('citiesArray:', this.citiesArray);
  // }

  onSubmit() {
    this.designService.postCustomers(this.customerForm.value).subscribe(res => {
      console.log('response:', res);
    })
  }
}
