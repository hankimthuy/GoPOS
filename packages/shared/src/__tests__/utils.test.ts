import {
  formatCurrency,
  formatPrice,
  formatDate,
  formatTime,
  generateOrderNumber,
  debounce
} from '../utils'

describe('Shared Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats currency in Vietnamese format', () => {
      expect(formatCurrency(100000)).toBe('100.000 ₫')
      expect(formatCurrency(50000)).toBe('50.000 ₫')
      expect(formatCurrency(0)).toBe('0 ₫')
    })

    it('handles large numbers', () => {
      expect(formatCurrency(1000000)).toBe('1.000.000 ₫')
      expect(formatCurrency(1234567)).toBe('1.234.567 ₫')
    })

    it('handles decimal numbers correctly', () => {
      expect(formatCurrency(100000.5)).toBe('100.000 ₫')
      expect(formatCurrency(100000.9)).toBe('100.000 ₫')
    })
  })

  describe('formatPrice', () => {
    it('formats price with Vietnamese locale', () => {
      expect(formatPrice(100000)).toBe('100.000₫')
      expect(formatPrice(50000)).toBe('50.000₫')
      expect(formatPrice(0)).toBe('0₫')
    })

    it('handles large numbers', () => {
      expect(formatPrice(1000000)).toBe('1.000.000₫')
      expect(formatPrice(1234567)).toBe('1.234.567₫')
    })

    it('handles decimal numbers', () => {
      expect(formatPrice(100000.5)).toBe('100.000,5₫')
      expect(formatPrice(100000.99)).toBe('100.000,99₫')
    })
  })

  describe('formatDate', () => {
    it('formats date string in Vietnamese format', () => {
      const dateString = '2023-01-01T00:00:00Z'
      const result = formatDate(dateString)
      expect(result).toMatch(/Chủ nhật, 1 tháng 1, 2023|Sunday, January 1, 2023/)
    })

    it('formats Date object in Vietnamese format', () => {
      const date = new Date('2023-12-25T00:00:00Z')
      const result = formatDate(date)
      expect(result).toMatch(/Thứ hai, 25 tháng 12, 2023|Monday, December 25, 2023/)
    })

    it('handles different dates correctly', () => {
      const date = new Date('2023-06-15T00:00:00Z')
      const result = formatDate(date)
      expect(result).toMatch(/Thứ năm, 15 tháng 6, 2023|Thursday, June 15, 2023/)
    })
  })

  describe('formatTime', () => {
    it('formats time in Vietnamese format', () => {
      const dateString = '2023-01-01T14:30:00Z'
      const result = formatTime(dateString)
      expect(result).toMatch(/\d{2}:\d{2}/) // Should match HH:MM format
    })

    it('formats Date object time', () => {
      const date = new Date('2023-01-01T09:15:00Z')
      const result = formatTime(date)
      expect(result).toMatch(/\d{2}:\d{2}/)
    })

    it('handles different times correctly', () => {
      const morning = new Date('2023-01-01T08:00:00Z')
      const evening = new Date('2023-01-01T20:30:00Z')
      
      expect(formatTime(morning)).toMatch(/\d{2}:\d{2}/)
      expect(formatTime(evening)).toMatch(/\d{2}:\d{2}/)
    })
  })

  describe('generateOrderNumber', () => {
    it('generates order number with correct format', () => {
      const orderNumber = generateOrderNumber()
      expect(orderNumber).toMatch(/^GP\d{9}$/) // GP + 6 digits timestamp + 3 digits random
    })

    it('generates unique order numbers', () => {
      const orderNumbers = Array.from({ length: 10 }, () => generateOrderNumber())
      const uniqueNumbers = new Set(orderNumbers)
      expect(uniqueNumbers.size).toBe(10) // All should be unique
    })

    it('generates order number with GP prefix', () => {
      const orderNumber = generateOrderNumber()
      expect(orderNumber).toMatch(/^GP/)
    })

    it('generates order number with correct length', () => {
      const orderNumber = generateOrderNumber()
      expect(orderNumber).toHaveLength(11) // GP + 9 digits
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('delays function execution', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('cancels previous calls when called multiple times', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })

    it('handles multiple arguments', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('arg1', 'arg2', 'arg3')
      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
    })

    it('works with different wait times', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 500)

      debouncedFn('test')
      jest.advanceTimersByTime(499)
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(1)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('handles rapid successive calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      // Call multiple times rapidly
      for (let i = 0; i < 10; i++) {
        debouncedFn(`call-${i}`)
      }

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('call-9')
    })
  })
})
