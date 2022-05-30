import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { HomeComponent } from './components/home/home.component';
import { RevenuesComponent } from './components/revenues/revenues.component';

const routes: Routes = [
  {
    path: 'despesas', component: ExpenseComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'contas', component: AccountsComponent
  },
  {
    path: 'despesas/saldo-atual', component: CurrentBalanceComponent
  },
  {
    path: 'despesas/receitas', component: RevenuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
