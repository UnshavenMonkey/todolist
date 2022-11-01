import React from 'react';
import {fireEvent, getByRole, render, screen} from '@testing-library/react';
import {App} from './App';
import userEvent from "@testing-library/user-event";


describe('render todos', () => {
    it ('render App', () => {
        render(<App />);
        const linkElement = screen.getByText(/todos/i);
        expect(linkElement).toBeInTheDocument();
    });
    it ('add todo', () => {
        render(<App />);
        const input = screen.getByRole('input');
        expect(input).toBeInTheDocument();
        userEvent.type(input,  'first task');
        input.focus();
        expect(input).toHaveFocus();


    })
});