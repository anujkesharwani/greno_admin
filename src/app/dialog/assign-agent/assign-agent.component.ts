import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss']
})
export class AssignAgentComponent {

  clicked: boolean = false;
  agentName: string = 'Natraj Jash';

  constructor(
    public dailogRef: MatDialogRef<AssignAgentComponent>
  ) { }

  closeDialog() {
    this.dailogRef.close();
  }
}
