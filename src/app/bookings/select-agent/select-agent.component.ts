import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { AgentsService } from 'src/app/agents/agents.service';
import { AgentInfo } from 'src/app/agents/agents.structure';
import { CustomerInfo } from 'src/app/customers/customer.structure';

@Component({
  selector: 'app-select-agent',
  templateUrl: './select-agent.component.html',
  styleUrls: ['./select-agent.component.scss']
})
export class SelectAgentComponent {
  agents:AgentInfo[] = [];
  constructor(private agentService:AgentsService,public dialogRef:DialogRef){
    this.agentService.getAgents(new Date()).then((agents)=>{
      this.agents = agents;
    });
  }
}
