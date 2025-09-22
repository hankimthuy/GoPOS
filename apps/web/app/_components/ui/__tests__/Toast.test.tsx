import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toast, { ToastContainer, useToast } from '../Toast';

// Mock component để test useToast hook
function TestComponent() {
  const { toasts, showSuccess, showError, removeToast } = useToast();

  return (
    <div>
      <button onClick={() => showSuccess('Success!', 'Test message')}>
        Show Success
      </button>
      <button onClick={() => showError('Error!', 'Test error')}>
        Show Error
      </button>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

describe('Toast Component', () => {
  it('renders success toast correctly', () => {
    const mockOnClose = jest.fn();
    render(
      <Toast
        id="1"
        type="success"
        title="Success!"
        message="Test message"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders error toast correctly', () => {
    const mockOnClose = jest.fn();
    render(
      <Toast
        id="1"
        type="error"
        title="Error!"
        message="Test error"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Toast
        id="1"
        type="success"
        title="Success!"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledWith('1');
  });

  it('useToast hook works correctly', () => {
    render(<TestComponent />);

    const showSuccessButton = screen.getByText('Show Success');
    const showErrorButton = screen.getByText('Show Error');

    // Initially no toasts
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();

    // Show success toast
    fireEvent.click(showSuccessButton);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Show error toast
    fireEvent.click(showErrorButton);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
