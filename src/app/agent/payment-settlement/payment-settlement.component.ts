import { Component } from '@angular/core'
import { AgentDetails } from './agent.model'

@Component({
  selector: 'app-payment-settlement',
  templateUrl: './payment-settlement.component.html',
  styleUrls: ['./payment-settlement.component.scss']
})
export class PaymentSettlementComponent {
  agentDetails: AgentDetails[] = [
    {
      agentName: 'Raviraj',
      agentPhoto: './assets/icon/searchBar/agentList/ManojRavat.svg',
      lastPayment: 'January',
      paid: '20,220',
      unpaid: '20,220',
      transaction: [
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        }
      ]
    },
    {
      agentName: 'Raviraj',
      agentPhoto: './assets/icon/searchBar/agentList/ManojRavat.svg',
      lastPayment: 'January',
      paid: '20,220',
      unpaid: '20,220',
      transaction: [
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        }
      ]
    },
    {
      agentName: 'Raviraj',
      agentPhoto: './assets/icon/searchBar/agentList/ManojRavat.svg',
      lastPayment: 'January',
      paid: '20,220',
      unpaid: '20,220',
      transaction: [
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        },
        {
          transactionID: 'TX78896',
          transactionTime: '7:31 AM',
          recipient: 'Arun Arora',
          reason: 'Salary of jan...',
          amount: 225
        }
      ]
    }
  ]

  
}
