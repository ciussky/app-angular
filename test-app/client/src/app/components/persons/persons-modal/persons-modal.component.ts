import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-persons-modal',
  templateUrl: './persons-modal.component.html',
  styleUrls: ['./persons-modal.component.scss']
})
export class PersonsModalComponent implements OnInit {

  @Input() id_person: number | undefined;

  modal = {} as any;
  persons: any = [];
  validate: FormGroup;



  constructor(private fb: FormBuilder, private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
    this.validate = this.fb.group({
      fname: [null, Validators.compose([Validators.required])],
      cnp: [null, Validators.compose([Validators.required])]
        });
  }

  ngOnInit(): void {
    if (this.id_person) {
      this._spinner.show();
      axios.get(`/api/person/${this.id_person}`).then(({ data }) => {
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea persoanelor!'));
    }

  }
  
  save(): void {
 

if(this.validate.status === "VALID"){
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
else{
  for (let v in this.validate.controls) {
    this.validate.controls[v].markAsTouched();
  }
}
  }
  itemSelected(e:any){
    console.log(e);
  }

  cars = [
    { id: 1, make: 'ford' },
    { id: 2, make: 'toyota' },
    { id: 3, make: 'mertan' }
  ];
}
