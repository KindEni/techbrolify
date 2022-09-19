import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import NavBar from './NavBar';

it('should render with a title', () => {
    render(<NavBar title = 'Test Text'/>)

    const header = screen.getByRole('heading', {name:/test text/i})

    expect(header).toBeInTheDocument
})

it('should go back when the back button is clicked', () => {
    const mockGoBack = jest.fn();
    render(<NavBar goBack={mockGoBack}/>)

    const Backbutton = screen.getByRole('button', {name:/< go back/i})
    
    user.click(Backbutton);

    expect(mockGoBack).toHaveBeenCalled()

})