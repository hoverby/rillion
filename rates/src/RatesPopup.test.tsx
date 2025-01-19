import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { RatesPopup } from './RatesPopup';
import { Rate } from './types';

describe('RatesPopup', () => {
  const mockRate: Rate = {
    name: "Bitcoin",
    unit: "BTC",
    value: 1,
    type: "crypto"
  };

  const mockProps = {
    selectedRate: {
      code: "btc",
      rate: mockRate
    },
    onSave: jest.fn(),
    onClose: jest.fn()
  };

  test('renders popup with correct data', () => {
    render(<RatesPopup {...mockProps} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  test('handles value change and save', async () => {
    render(<RatesPopup {...mockProps} />);
    await act(async () => {
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '2' } });
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });
    expect(mockProps.onSave).toHaveBeenCalledWith('btc', {
      ...mockRate,
      value: 2
    });
  });

  test('handles escape key press', async () => {
    render(<RatesPopup {...mockProps} />);
    await act(async () => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test('handles cancel button click', () => {
    render(<RatesPopup {...mockProps} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
}); 