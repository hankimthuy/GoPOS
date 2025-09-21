import { cn } from '../utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden')
    expect(result).toBe('base conditional')
  })

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid')
    expect(result).toBe('base valid')
  })

  it('handles empty strings', () => {
    const result = cn('base', '', 'valid')
    expect(result).toBe('base valid')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true
    })
    expect(result).toBe('class1 class3')
  })

  it('handles mixed input types', () => {
    const result = cn(
      'base',
      ['array1', 'array2'],
      { 'conditional': true, 'hidden': false },
      'string',
      undefined,
      null
    )
    expect(result).toBe('base array1 array2 conditional string')
  })

  it('handles Tailwind CSS class conflicts', () => {
    // This tests the twMerge functionality
    const result = cn('p-2 p-4', 'text-sm text-lg')
    expect(result).toBe('p-4 text-lg') // Should keep the last conflicting class
  })

  it('handles complex Tailwind combinations', () => {
    const result = cn(
      'bg-red-500 bg-blue-500',
      'text-white text-black',
      'p-2 px-4 py-2'
    )
    expect(result).toBe('bg-blue-500 text-black p-2 px-4 py-2')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles single class', () => {
    const result = cn('single-class')
    expect(result).toBe('single-class')
  })
})
