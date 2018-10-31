import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/app.states';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUp } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  getState:Observable<any>;
  userFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  identityFormGroup: FormGroup;

  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      nombre: new FormControl('',{ validators: [Validators.required] }),
      apellido_paterno: new FormControl('',{ validators: [Validators.required] }),
      apellido_materno: new FormControl('',{ }),
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.addressFormGroup = new FormGroup({
      calle: new FormControl('',{ }),
      numero_exterior: new FormControl('',{ }),
      numero_interior: new FormControl('',{ }),
      colonia: new FormControl('',{ }),
      codigo_postal: new FormControl('',{ }),

      pais: new FormControl('México',{ }),
      estado: new FormControl('Chiapas',{ }),
      municipio: new FormControl('Tuxtla Gutiérrez',{ })
    });

    this.identityFormGroup = new FormGroup({
      nacionalidad: new FormControl('M',{ }),
      curp: new FormControl('',{ }),
      rfc: new FormControl('',{ }),
      ine: new FormControl('',{ }),
      informacion_veridica: new FormControl(false, { validators: [Validators.pattern('true')] }),
      acepto: new FormControl(false, { validators: [Validators.pattern('true')] })
    });

    this.getState.subscribe((state) => {
      if(state.errorMessage){
        this.sharedService.showSnackBar(state.errorMessage, null, 3000);
      }
    })
  }

  onSubmit(): void {
    const payload = {
      email: this.userFormGroup.value.email,
      password: this.userFormGroup.value.password,
      nombre: this.userFormGroup.value.nombre,
      apellido_paterno: this.userFormGroup.value.apellido_paterno,
      apellido_materno: this.userFormGroup.value.apellido_materno,
      calle: this.userFormGroup.value.calle,
      numero_exterior: this.userFormGroup.value.numero_exterior,
      numero_interior: this.userFormGroup.value.numero_interior,
      colonia: this.userFormGroup.value.colonia,
      codigo_postal: this.userFormGroup.value.codigo_postal,
      pais: this.userFormGroup.value.pais,
      estado: this.userFormGroup.value.estado,
      municipio: this.userFormGroup.value.municipio,
      nacionalidad: this.identityFormGroup.value.nacionalidad,
      curp: this.identityFormGroup.value.curp,
      rfc: this.identityFormGroup.value.rfc,
      ine: this.identityFormGroup.value.ine

    }
    this.store.dispatch(new SignUp(payload));
  }

}
