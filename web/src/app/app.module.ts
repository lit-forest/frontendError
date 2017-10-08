import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule,MatTooltipModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guard/auth.guard';

import { LoginService } from './services/login/login.service';
import { JoinService } from './services/join/join.service';
import { PreviewService } from './services/preview/preview.service';
import { ProjectService } from './services/project/project.service'

import { AppComponent } from './app.component';
import { Home } from './home/home.component';
import { Login } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';
import { JoinComponent } from './join/join.component';
import { ProjectComponent } from './project/project.component';
import { FileValueAccessor } from './utils/file-control-value-accessor';
import { FileValidator } from './utils/file-input.validator';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Login,
    PreviewComponent,
    JoinComponent,
    ProjectComponent,
    FileValueAccessor,
    FileValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [
    LoginService,
    JoinService,
    PreviewService,
    ProjectService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
