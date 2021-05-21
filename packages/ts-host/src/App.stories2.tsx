import React from 'react';
import {Meta} from "@storybook/react";
import App  from './App';

console.log("Hererererer erer r re");
const Story = {
    "title": 'Swsl/host',
    component:  App
} as Meta;

const Template = (args) => <App  />
export const Primary = Template.bind({});
export default Story;


