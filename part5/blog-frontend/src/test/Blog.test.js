import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import Button from '../components/Button';

describe('<Blog /> test', () => {
    const setup = () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'sophieie',
            url: 'www.love.com',
            likes: 43
        };
        render(<Blog blog={blog} />)
    };

    test('only renders title and author', () => {
        setup();

        const author = screen.getByText("sophieie", { exact: false });
        const title = screen.getByText("Component testing is done with react-testing-library", { exact: false });

        expect(author).toBeDefined();
        expect(title).toBeDefined();
    });

    test('render url and likes after clicking showAll button', async () => {
        setup();

        const button = screen.getByRole('button', { name: 'view' });
        const user = userEvent.setup();
        await user.click(button);

        const url = screen.getByText("www.love.com", { exact: false });
        const likes = screen.getByText("43", { exact: false });

        expect(url).toBeDefined();
        expect(likes).toBeDefined();
    });

    // test.only('click likes twice', async () => {
    //     setup();
    //     const addLikes = jest.fn();
    //     render(<Button handleClick={addLikes} />)


    //     const user = userEvent.setup();
    //     const viewButton = screen.getByRole('button', { name: 'view' });
    //     await user.click(viewButton);

    //     const likesButton = screen.getByRole('button', { name: 'like' });
    //     // await user.click(likesButton);
    //     // const updatedLike = screen.getByText('Likes', { exact: false })
    //     screen.debug(likesButton);

    // });
});
