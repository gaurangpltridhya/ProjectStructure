import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
interface Food {
  value: string;
  viewValue: string;
}


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit {

myForm: FormGroup;

  foods: Food[] = [
    {value: 'admin-0', viewValue: 'admin'},
    {value: 'user-1', viewValue: 'user'},
    {value: 'manager-2', viewValue: 'manager'},
  ];
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed:boolean) {
    this.allComplete = completed;
    if(this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t=> (t.completed = completed));
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.myForm = this.fb.group({
    //   role: [''],
    //   create: [''],
    //   edit: [''],
    //   delete: ['']

    // })
    // this.myForm.valueChanges.subscribe(console.log)
  }

}
