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

it('should open the form clicked', () => {
    const mockOpenForm = jest.fn();
    render(<NavBar openForm={mockOpenForm}/>)

    const AddItembutton = screen.getByRole('button', {name:'+ Add Item'})
    
    user.click(AddItembutton);

    expect(mockOpenForm).toHaveBeenCalled()
})

