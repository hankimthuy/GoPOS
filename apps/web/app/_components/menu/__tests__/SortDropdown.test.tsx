import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown, { SortOption } from '../SortDropdown';

describe('SortDropdown', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default option selected', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    expect(screen.getByText('Mặc định')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Tên A-Z')).toBeInTheDocument();
    expect(screen.getByText('Giá thấp → cao')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const priceAscOption = screen.getByText('Giá thấp → cao');
    fireEvent.click(priceAscOption);
    
    expect(mockOnChange).toHaveBeenCalledWith('price-asc');
  });

  it('closes dropdown when option is selected', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const priceAscOption = screen.getByText('Giá thấp → cao');
    fireEvent.click(priceAscOption);
    
    // Dropdown should be closed
    expect(screen.queryByText('Tên A-Z')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Click on backdrop
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    
    // Dropdown should be closed
    expect(screen.queryByText('Tên A-Z')).not.toBeInTheDocument();
  });

  it('shows correct selected option', () => {
    render(<SortDropdown value="price-desc" onChange={mockOnChange} />);
    
    expect(screen.getByText('Giá cao → thấp')).toBeInTheDocument();
  });

  it('highlights selected option in dropdown', () => {
    render(<SortDropdown value="price-desc" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const selectedOption = screen.getByText('Giá cao → thấp');
    expect(selectedOption).toHaveClass('text-[#ea7b69]');
  });

  it('rotates chevron when dropdown is open', () => {
    render(<SortDropdown value="default" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    const chevron = button.querySelector('svg');
    
    expect(chevron).not.toHaveClass('rotate-180');
    
    fireEvent.click(button);
    
    expect(chevron).toHaveClass('rotate-180');
  });
});
