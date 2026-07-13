import { COMPANY, SERVICES } from '../src/lib/constants'

describe('Constants Smoke Test', () => {
  it('exports COMPANY information correctly', () => {
    expect(COMPANY.name).toBe('MV Groups')
    expect(COMPANY.phone).toBeDefined()
    expect(COMPANY.email).toBeDefined()
  })

  it('exports SERVICES correctly', () => {
    expect(Array.isArray(SERVICES)).toBe(true)
    expect(SERVICES.length).toBeGreaterThan(0)
    expect(SERVICES[0]).toHaveProperty('id')
    expect(SERVICES[0]).toHaveProperty('title')
  })
})
