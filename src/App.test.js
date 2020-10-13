import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// componentDidMount(){
//   this.fetchGraduates()
// }

// fetchGraduates = () => {
//   fetch('localhost:3000/graduates')
//   .then(resp => resp.json())
//   .then(graduates => this.setState({graduates: graduates}))
// }