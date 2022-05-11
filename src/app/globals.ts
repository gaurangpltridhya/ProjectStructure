import { Injectable } from '@angular/core';
import { User } from './shared/user.model';

@Injectable()
export class Globals {
  currentUser!: User;
  global_settings: any;
}
