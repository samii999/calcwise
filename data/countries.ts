export interface Country {
  value: string
  label: string
  flag: string
  taxRate: number
  note: string
  officialLink: string
}

export const COUNTRIES: Country[] = [
  {
    value: 'US',
    label: 'United States',
    flag: '🇺🇸',
    taxRate: 1.01,
    note: 'State average 0.28-2.42%. Verify local county rate.',
    officialLink: 'https://taxfoundation.org/topics/property-tax/',
  },
  {
    value: 'UK',
    label: 'United Kingdom',
    flag: '🇬🇧',
    taxRate: 0.8,
    note: 'Council tax varies by band. Verify your local council rate.',
    officialLink: 'https://www.gov.uk/council-tax',
  },
  {
    value: 'CA',
    label: 'Canada',
    flag: '🇨🇦',
    taxRate: 1.2,
    note: 'Province-wise varies. Managed strictly by local municipalities.',
    officialLink: 'https://www.canada.ca/en/services/taxes.html',
  },
  {
    value: 'AU',
    label: 'Australia',
    flag: '🇦🇺',
    taxRate: 1.0,
    note: 'State-wise varies. Verify local council rate.',
    officialLink: 'https://www.ato.gov.au/individuals-and-families/investing-in-property/',
  },
  {
    value: 'NZ',
    label: 'New Zealand',
    flag: '🇳🇿',
    taxRate: 0.6,
    note: 'No flat central land tax. Set and collected directly by local councils.',
    officialLink: 'https://www.ird.govt.nz/property',
  },
  {
    value: 'JP',
    label: 'Japan',
    flag: '🇯🇵',
    taxRate: 1.4,
    note: 'Standard Fixed Asset Tax on assessed value. Reassessed every 3 years.',
    officialLink: 'https://www.nta.go.jp/english/index.htm',
  },
  {
    value: 'NL',
    label: 'Netherlands',
    flag: '🇳🇱',
    taxRate: 0.15,
    note: 'Onroerendezaakbelasting (OZB) based on annual municipal WOZ value.',
    officialLink: 'https://www.belastingdienst.nl/wps/wcm/connect/en/home/home',
  },
  {
    value: 'IE',
    label: 'Ireland',
    flag: '🇮🇪',
    taxRate: 0.18,
    note: 'Local Property Tax (LPT) calculated on self-assessed market value bands.',
    officialLink: 'https://www.revenue.ie/en/property/local-property-tax/index.aspx',
  },
  {
    value: 'FR',
    label: 'France',
    flag: '🇫🇷',
    taxRate: 0.8,
    note: 'Taxe foncière varies heavily by commune.',
    officialLink: 'https://www.impots.gouv.fr/particulier/taxes-foncieres',
  },
  {
    value: 'DE',
    label: 'Germany',
    flag: '🇩🇪',
    taxRate: 1.6,
    note: 'Grundsteuer varies by municipality multipliers.',
    officialLink: 'https://www.bundesfinanzministerium.de/',
  },
  {
    value: 'AE',
    label: 'UAE (Dubai)',
    flag: '🇦🇪',
    taxRate: 0,
    note: 'No annual property tax. 4% upfront transfer fee applies.',
    officialLink: 'https://dubailand.gov.ae/',
  },
  {
    value: 'IN',
    label: 'India',
    flag: '🇮🇳',
    taxRate: 0.5,
    note: 'Varies by city. Managed by local municipal corporations.',
    officialLink: 'https://www.india.gov.in/',
  },
  {
    value: 'PK',
    label: 'Pakistan',
    flag: '🇵🇰',
    taxRate: 1.5,
    note: 'FBR rates apply. Active Filer: 1.5%, Non-filer: 10.5%.',
    officialLink: 'https://fbr.gov.pk/withholding-taxes-rate-card/174298/174301',
  },
  {
    value: 'BD',
    label: 'Bangladesh',
    flag: '🇧🇩',
    taxRate: 1.0,
    note: 'Holding Tax managed by local City Corporations/Pourashavas.',
    officialLink: 'https://nbr.gov.bd/',
  },
  {
    value: 'SG',
    label: 'Singapore',
    flag: '🇸🇬',
    taxRate: 1.1,
    note: 'Progressive annual value-based tax for owner/non-owner occupiers.',
    officialLink: 'https://www.iras.gov.sg/taxes/property-tax',
  },
]

export function getCountryByValue(value: string): Country | undefined {
  return COUNTRIES.find((c) => c.value === value)
}

export function getCountryTaxRate(value: string): number {
  const country = getCountryByValue(value)
  return country?.taxRate || 1.0
}