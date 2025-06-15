import axios from "axios"

export interface MarkCycleEventRequest {
  date: string // ISO format date (YYYY-MM-DD)
  actionType: "START" | "PEAK" | "END"
}

export interface CycleEventResponse {
  id: string
  date: string
  actionType: "START" | "PEAK" | "END"
  cycleId: string
}

export interface PredictionDates {
  start_date: string
  end_date: string
  peak_date: string
}

export interface CyclePredictionResponse {
  predicted_cycle_length: number
  predicted_period_length: number
  predicted_peak_day: number
  predicted_dates: PredictionDates
}

export const MenstrualApi = {
  async markEvent(eventData: MarkCycleEventRequest, token: string): Promise<CycleEventResponse> {
    const response = await axios.post(
      "http://localhost:8080/api/v1/menstrual/mark-it",
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  },

  async getCurrentCycle(token: string): Promise<CycleEventResponse[]> {
    const response = await axios.get(
      "http://localhost:8080/api/v1/menstrual/current-cycle",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  },

  async getCurrentPrediction(token: string): Promise<CyclePredictionResponse | null> {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/menstrual/get-current-prediction",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data?.data ?? null
    } catch (error) {
      console.error("Failed to fetch prediction:", error)
      return null
    }
  }
  
}
