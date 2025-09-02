import { Routes } from '@angular/router';
import { ButtonExamplesComponent } from './components/button-examples/button-examples.component';
import { InputExamplesComponent } from './components/input-examples/input-examples.component';
import { DataTableExamplesComponent } from './components/data-table-examples/data-table-examples.component';
import { DialogExamplesComponent } from './components/dialog-examples/dialog-examples.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ToastExamplesComponent } from './components/toast-examples/toast-examples.component';
import { ScrollExamplesComponent } from './components/scroll-examples/scroll-examples.component';
import { FormExamplesComponent } from './components/form-examples/form-examples.component';

export const routes: Routes = [
    { path: '', redirectTo: '/buttons', pathMatch: 'full' },
    { path: 'buttons', component: ButtonExamplesComponent },
    { path: 'inputs', component: InputExamplesComponent },
    { path: 'data-table', component: DataTableExamplesComponent },
    { path: 'dialogs', component: DialogExamplesComponent },
    { path: 'chat-input', component: ChatInputComponent },
    { path: 'toast', component: ToastExamplesComponent },
    { path: 'scroll', component: ScrollExamplesComponent },
    { path: 'form', component: FormExamplesComponent }
];
