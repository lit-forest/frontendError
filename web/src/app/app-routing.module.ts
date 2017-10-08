import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { AppComponent } from './app.component';
import { Home } from './home/home.component';
import { Login } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { PreviewComponent } from './preview/preview.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'join', component: JoinComponent },
    { path: 'preview', component: PreviewComponent, canActivate: [AuthGuard] },
    { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }