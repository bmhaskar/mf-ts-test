import React from 'react';
import { Story, Meta } from '@storybook/react';

import App from "./App";

export default {
    title: 'Swsl/Host-App',
    component: App
} as Meta;


const Template: Story = (args) => <App {...args} /> ;