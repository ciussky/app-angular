import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cars-modal',
  templateUrl: './cars-modal.component.html',
  styleUrls: ['./cars-modal.component.scss']
})
export class CarsModalComponent implements OnInit {

  @Input() id_car: number | undefined;

  modal = {} as any;
  validate_car = {} as FormGroup;


  constructor(private fb: FormBuilder, private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (this.id_car) {
      this._spinner.show();
      axios.get(`/api/car/${this.id_car}`).then(({ data }) => {
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea persoanelor!'));
    }

    this.validate_car = this.fb.group({
      make: [null, Validators.compose([Validators.required])],
      model: [null, Validators.compose([Validators.required])],
      makeyear: [null, Validators.compose([Validators.required])],
      ccapicity: [null, Validators.compose([Validators.required])],
      tax: [null, Validators.compose([Validators.required])]
      });
  }

  save(): void {
    if(this.validate_car.valid){
      this._spinner.show();

    if (!this.id_car) {
      axios.post('/api/car', this.modal).then(() => {
        this._spinner.hide();
        this.toastr.success('Persoana a fost salvată cu succes!');
        this.activeModal.close();
      }).catch(() => this.toastr.error('Eroare la salvarea masinii!'));
    } else {
      axios.put('/api/car', this.modal).then(() => {
        this._spinner.hide();
        this.toastr.success('Masina a fost modificată cu succes!');
        this.activeModal.close();
      }).catch(() => this.toastr.error('Eroare la modificarea masinii!'));
    }
    }
    else{
      for (let v in this.validate_car.controls) {
        this.validate_car.controls[v].markAsTouched();
      }
  }
  }

}
