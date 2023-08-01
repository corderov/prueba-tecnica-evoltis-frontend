import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

//Redux
import { StoreModule } from '@ngrx/store';

//Components
import { MoviesComponent } from './components/movies/movies.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

//PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { moviesReducer } from './state/reducers/movies.reducers';
import { ROOT_REDUCERS } from './state/app.state';





@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    //Redux
    StoreModule.forRoot(ROOT_REDUCERS),
    
    TableModule,
    ButtonModule,
    InputTextareaModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    MessagesModule,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
