
export interface AgentDetails {
    agentName: string
    agentPhoto: string
    pickupDone: number
    completionTimeDone:number
    settled: string
    unsettled: string
    transaction: {
      orderID: string
      customerName:string
      service:string
      serviceTime:string
      status:string   
      address: string
      jobEndTime:string
    }[]
  }
  