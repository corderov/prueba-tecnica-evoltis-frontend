import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
//PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MoviesComponent } from './components/movies/movies.component';
import { DialogModule } from 'primeng/dialog';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'add-movie', component: MovieFormComponent },
  { path: 'edit-movie/:id', component: MovieFormComponent },
  // Otros componentes o rutas que puedas tener
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    MessagesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
