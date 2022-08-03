import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from "./index";

test('render a Hero', () => {
    render(<Hero />);

    expect(screen.getByRole('heading')).toHaveTextContent("Music'all");
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra ut purus et blandit. Proin sit amet justo vulputate, dictum enim non, finibus lacus.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Create my room');
});