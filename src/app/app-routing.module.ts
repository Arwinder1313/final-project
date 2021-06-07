import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { BootstrapTableComponent } from './components/bootstrap-table/bootstrap-table.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';

const routes: Routes = [
  { path: "", component: JumbotronComponent },
  { path: "jumbotron", component: JumbotronComponent },
  { path: "bootstrap-table", component: BootstrapTableComponent },
  { path: "add", component: AddComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
