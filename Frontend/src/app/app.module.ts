//Librerías
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalViewComponent } from './components/animal-view/animal-view.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { HowToHelpComponent } from './components/how-to-help/how-to-help.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnimalsCRUDComponent } from './components/animals-crud/animals-crud.component';
import { DonationsComponent } from './components/donations/donations.component';
import { EntityComponent } from './components/entity/entity.component';
import { UsersComponent } from './components/users/users.component';
import { AnimalCreateComponent } from './components/animal-create/animal-create.component';
import { DonationCreateComponent } from './components/donation-create/donation-create.component';
import { DonationEditComponent } from './components/donation-edit/donation-edit.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { EntityEditComponent } from './components/entity-edit/entity-edit.component';
import { EntityCreateComponent } from './components/entity-create/entity-create.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AnimalsListComponent,
    AnimalViewComponent,
    AnimalCardComponent,
    AboutUsComponent,
    ContactComponent,
    HowToHelpComponent,
    DashboardComponent,
    AnimalsCRUDComponent,
    DonationsComponent,
    EntityComponent,
    UsersComponent,
    AnimalCreateComponent,
    DonationCreateComponent,
    DonationEditComponent,
    AnimalEditComponent,
    UserEditComponent,
    EntityEditComponent,
    EntityCreateComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    FooterComponent,
    ImageViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
