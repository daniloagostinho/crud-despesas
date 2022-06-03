import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'despesas', component: ExpenseComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'contas', component: AccountsComponent,
    canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
