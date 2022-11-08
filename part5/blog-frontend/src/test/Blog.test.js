import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import Button from '../components/Button';

describe('is Blog find', () => {
    test('renders content', () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'sophieie',
            url: 'www.love.com',
            likes: 43
        };

        render(<Blog blog={blog} />);

        const element = screen.getByText("sophieie", { exact: false });
        // screen.debug(element);
        expect(element).toBeDefined();
    });

    test.only('clicking showAll button', async () => {
        const mockHandler = jest.fn();

        render(<Button handleClick={mockHandler} name={'view'} />);

        const user = userEvent.setup();
        const button = screen.getByText('view');
        await user.click(button);

        expect(mockHandler.mock.calls).toHaveLength(1);
    });
});
