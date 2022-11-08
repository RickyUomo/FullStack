import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleLabel from '../components/ToggleLabel';

describe('<ToggleLabel />', () => {
    const setup = () => {
        const { container } = render(
            <ToggleLabel cancelBtn="cancel" newBlogBtn="new blog">
                <div className="testDiv">
                    togglable content
                </div>
            </ToggleLabel>
        )
        return container;
    };

    test('render its children', async () => {
        setup();
        await screen.findAllByText('togglable content');
    });

    test('at start the children are not displayed', () => {
        const container = setup();
        const div = container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });

    test('after clicking the button, children are displayed', async () => {
        const container = setup();
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: 'new blog' });
        await user.click(button);

        const div = container.querySelector('.togglableContent');
        expect(div).not.toHaveStyle('display: none');
    });
});