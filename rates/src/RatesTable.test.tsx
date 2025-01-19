import { render, screen, fireEvent } from '@testing-library/react';
import RatesTable from './RatesTable';


describe('RatesTable', () => {
  test('renders table headers', () => {
    render(<RatesTable />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent('Code');
    expect(headers[1]).toHaveTextContent('Name');
    expect(headers[2]).toHaveTextContent('Unit');
    expect(headers[3]).toHaveTextContent('Value');
    expect(headers[4]).toHaveTextContent('Type');
  });

  test('renders rate data', () => {
    render(<RatesTable />);
    const btcRow = screen.getByRole('row', { name: /BTC Bitcoin BTC 1 crypto/i });
    expect(btcRow).toBeInTheDocument();
  });

  test('opens popup on row click', () => {
    render(<RatesTable />);
    const btcRow = screen.getByRole('row', { name: /BTC Bitcoin BTC 1 crypto/i });
    fireEvent.click(btcRow!);
    
    // Check if popup appears
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('updates rate value', () => {
    render(<RatesTable />);
    
    // Open popup
    const btcRow = screen.getByRole('row', { name: /BTC Bitcoin BTC 1 crypto/i });
    fireEvent.click(btcRow!);
    
    // Change value and save
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    // Verify popup closed
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  test('closes popup on cancel', () => {
    render(<RatesTable />);
    
    // Open popup
    const btcRow = screen.getByRole('row', { name: /BTC Bitcoin BTC 1 crypto/i });
    fireEvent.click(btcRow!);
    
    // Click cancel
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    // Verify popup closed
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });
});
