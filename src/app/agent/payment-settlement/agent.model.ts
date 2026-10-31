
export interface AgentDetails {
  agentName: string
  agentPhoto: string
  lastPayment: string
  paid: string
  unpaid: string
  transaction: {
    transactionID: string
    transactionTime: string
    recipient: string
    reason: string
    amount: number
  }[]
}
