import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '.';


describe('NavBar Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<HomePage/>);

   // Teste se o texto "Quem somos" está presente
    expect(getByText('sou home')).toBeInTheDocument();
    // Teste se o texto "Agendar Consulta" está presente
    
  });
});
