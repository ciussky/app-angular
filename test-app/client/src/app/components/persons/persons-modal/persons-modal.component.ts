import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { PersonsComponent } from '../persons.component';

@Component({
  selector: 'app-persons-modal',
  templateUrl: './persons-modal.component.html',
  styleUrls: ['./persons-modal.component.scss']
})

export class PersonsModalComponent implements OnInit {

  @Input() id_person: number | undefined;

  @Input() message: string | undefined;
  
  modal = {} as any;
  validate_person!: FormGroup;
  cars: any = [];
  personCars: any = [];
  submitted = false;

  constructor(private config: NgSelectConfig, private fb: FormBuilder, private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    if (this.id_person) {
      this._spinner.show();
      axios.get(`/api/person/${this.id_person}`).then(({ data }) => {
        this.modal = data;
        this.personCars = this.modal.cars;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea persoanelor!'));
    }
    this.validate_person = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      cnp: ['', Validators.required],
      age: ['', Validators.required]
    });
    axios.get('/api/car').then(({ data }) => {
      this.cars = data;
    });
  }

  calcAgeFromCnp(cnpval: string) {
    let personAge;
    const getBirthdate = this.modal.cnp.split("");
    getBirthdate.splice(0, 1);
    getBirthdate.splice(6, 10);

    const birthYear = getBirthdate.splice(0, 2).join("");
    const birthMonth = getBirthdate.splice(0, 2).join("");
    const birthDay = getBirthdate.join("");
    const fullBirthYear = 19 + '' + birthYear;
    const yymmdd = fullBirthYear + "/" + birthMonth + "/" + birthDay;

    // this.modal.cnp = 1900617555555;
    const date = new Date();
    const birthDate = new Date(yymmdd);
    personAge = date.getFullYear() - birthDate.getFullYear();
    const month = date.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && date.getDate() < birthDate.getDate())) {
      personAge--;
    }
    if (isNaN(personAge)) {
      personAge = null;
    }
    return personAge;
  }

  updateAge(result: any): void {
    if(result){
      this.modal.age = result;
    }
  }
  
  save(): void {
    if (this.modal.cnp && this.modal.cnp.length === 13) {
      let isNumCnp = this.modal.cnp.match(/^[0-9]+$/) != null;
      if (isNumCnp) {
        this.updateAge(this.calcAgeFromCnp(this.modal.cnp));
      }
    }

    if (this.validate_person.valid) {
      this._spinner.show();

      if (!this.id_person) {
        axios.post('/api/person', this.modal).then(() => {
          this._spinner.hide();
          this.toastr.success('Persoana a fost salvată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
      } else {
        axios.put('/api/person', this.modal).then(() => {
          this._spinner.hide();
          this.toastr.success('Persoana a fost modificată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la modificarea persoanei!'));
      }
    }
    else {
      this.submitted = true;
      for (let v in this.validate_person.controls) {
        this.validate_person.controls[v].markAsTouched();
      }
    }
  }
}