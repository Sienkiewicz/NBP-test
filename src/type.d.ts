export interface CurrencyFull {
  table: string
  currency: string
  code: string
  rates: Rate[]
}

export interface Rate {
  no: string
  effectiveDate: string
  bid: number
  ask: number
}


export interface CurrencyMid {
  table: string
  no: string
  effectiveDate: string
  rates: RateMid[]
}

export interface RateMid {
  currency: string
  code: string
  mid: number
}

export interface Data {
  currency: string
  code: string
  mid: number
}

export type Order = 'asc' | 'desc'

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}