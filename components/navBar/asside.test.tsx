import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '.';


describe('NavBar Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<NavBar/>);
   // Teste se o texto "Quem somos" está presente
    expect(getByText('Quem Somos')).toBeInTheDocument();

    // Teste se o texto "Agendar Consulta" está presente

    expect(getByText('Agendar Consulta')).toBeInTheDocument();
  });
});
