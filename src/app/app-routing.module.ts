import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGeneratorWrapperComponent } from './components/form-generator-wrapper/form-generator-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: FormGeneratorWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
