import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getAllByRole('textbox')[0];
    const authorInput = screen.getAllByRole('textbox')[1];
    const urlInput = screen.getByPlaceholderText('url here...');
    const sendBtn = screen.getByText('save');

    await user.type(titleInput, 'hello world');
    await user.type(authorInput, 'ricky');
    await user.type(urlInput, 'www.text.com');
    await user.click(sendBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('hello world');
});