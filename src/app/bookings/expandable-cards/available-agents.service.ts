import { Injectable } from '@angular/core';
import { AgentsService } from 'src/app/agents/agents.service';
import moment from 'moment';
import { Slot, extendedAgent, extendedSlot } from './available-agents.structure';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableAgentsService {
    availableAgents: any[] = [];
    constructor(
        private agentService: AgentsService
    ) {

    }

   

    async getAllAgents(date: string) {
    
        try {
            const agents = await firstValueFrom(this.agentService.getAllAgentsSubscription());
            this.availableAgents = await Promise.all(agents.map(async (agent: any) => {
                let agentsData = { ...agent, slots: <any>[], present: 'NA' } as extendedAgent;
                agentsData.subscription?.unsubscribe();
    
                const slots = await firstValueFrom(this.agentService.getAgentsSlotsSubscription(agent['id']));
                agentsData.slots = slots as Slot[];
    
                slots.forEach((slot: any) => {
                    if (date === slot.id) {
                        agentsData.present = slot.working ? 'P' : 'A';
                    }
                });
    
                return agentsData;
            }));
        } catch (error) {
            console.error('Error fetching agents or slots', error);
        }
    }
    
    async getAvailableAgents(date: string) {
        await this.getAllAgents(date);
        return this.availableAgents;
    }
    
}