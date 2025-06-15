export interface CyclePrediction {
  nextCycleStart: Date
  expectedDuration: number
  averageCycleLength: number
  isIrregular: boolean
  confidence: number
  fertileWindow: {
    start: Date
    end: Date
  }
  ovulationDate: Date
}
