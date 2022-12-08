import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AnimalCreateComponent } from './components/animal-create/animal-create.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';
import { AnimalViewComponent } from './components/animal-view/animal-view.component';
import { AnimalsCRUDComponent } from './components/animals-crud/animals-crud.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonationCreateComponent } from './components/donation-create/donation-create.component';
import { DonationEditComponent } from './components/donation-edit/donation-edit.component';
import { DonationsComponent } from './components/donations/donations.component';
import { EntityCreateComponent } from './components/entity-create/entity-create.component';
import { EntityEditComponent } from './components/entity-edit/entity-edit.component';
import { EntityComponent } from './components/entity/entity.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { HowToHelpComponent } from './components/how-to-help/how-to-help.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "inicio" },
  { path: "inicio", component: HomeComponent },
  { path: "sobre-nosotros", component: AboutUsComponent },
  { path: "como-ayudar", component: HowToHelpComponent },
  { path: "catalogo", component: AnimalsListComponent },
  { path: "catalogo/:id", component: AnimalViewComponent },
  { path: "contacto", component: ContactComponent },
  { path: "acceso", component: LoginComponent },
  { path: "registro", component: RegisterComponent },
  { path: "recuperar-contraseña", component: ForgotPasswordComponent },
  { path: "recuperar-contraseña/:token", component: ResetPasswordComponent },
  {
    path: "cuadro-mandos", component: DashboardComponent, canActivate: [LoginGuard], children: [
      { path: "", pathMatch: "full", redirectTo: "animales" },

      { path: "animales", component: AnimalsCRUDComponent },
      { path: "agregar-animal", component: AnimalCreateComponent },
      {
        path: "editar-animal/:id", component: AnimalEditComponent, children: [
          { path: "imagen/:imageName", component: ImageViewComponent },
        ]
      },

      { path: "personas", component: EntityComponent },
      { path: "agregar-persona", component: EntityCreateComponent },
      { path: "editar-persona/:id", component: EntityEditComponent },

      { path: "donaciones", component: DonationsComponent },
      { path: "agregar-donacion", component: DonationCreateComponent },
      { path: "editar-donacion/:id", component: DonationEditComponent },

      { path: "usuarios", component: UsersComponent },
      { path: "editar-usuario/:id", component: UserEditComponent },
    ]
  },
  { path: "**", redirectTo: "inicio" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
