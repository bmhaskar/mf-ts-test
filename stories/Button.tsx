import React, { useState} from 'react';
import './button.css';



/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
                                                primary = false,
                                                size = 'medium',
                                                backgroundColor,
                                                label,
                                                ...props
                                              }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  const [todos, setToDos] = useState([]);


  return (

        <button
            type="button"
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{ backgroundColor }}
            {...props}
        >
          {label}

        </button>


);
};

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}