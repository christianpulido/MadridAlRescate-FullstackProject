import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editUser: FormGroup;
  id!: number;
  userToEdit!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.editUser = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      isAdmin: new FormControl('', [
        Validators.required
      ]),
      isActive: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
      ])
    })

  }
  checkControl(pControlName: string, pError: string): boolean {
    if (this.editUser.get(pControlName)?.hasError(pError) && this.editUser.get(pControlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  async ngOnInit(): Promise<any> {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })

    this.userToEdit = await this.userService.getById(this.id);
    this.editUser = new FormGroup({
      nombre: new FormControl(this.userToEdit.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      apellido: new FormControl(this.userToEdit.apellido, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      isAdmin: new FormControl(this.userToEdit.isAdmin, [
        Validators.required
      ]),
      isActive: new FormControl(this.userToEdit.isActive, [
        Validators.required
      ]),
      email: new FormControl(this.userToEdit.email, [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
      ])
    })
  }

  async onSubmit(): Promise<any> {
    try {
      let response = await this.userService.edit(this.editUser.value, this.id);

      if (response.affectedRows)
        this.router.navigate(['/cuadro-mandos/usuarios'])

    } catch (err: any) {
      console.log(err.error[0].msg)
    }

  }

}
