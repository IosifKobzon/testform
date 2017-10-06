import { Component } from '@angular/core';
import { Profile } from './models/profile';
import { jobs } from './consts/jobs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  profile = new Profile;
  jobs: string[] = jobs;
}
