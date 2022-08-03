import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

const UX_PRIME = [ 
  ButtonModule,
  CardModule, 
  ColorPickerModule,
  ConfirmDialogModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  InputMaskModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextModule,
  TableModule,
  TagModule,
  ToastModule,
  ToolbarModule
];

@NgModule({
  imports: [UX_PRIME],
  exports: [UX_PRIME],
})
export class NgprimeModule {}
