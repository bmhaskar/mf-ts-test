import React from 'react';
import { Story, Meta } from '@storybook/react';
import ToDoListView  from "@swsl/ts-remote-mf/ToDoListView";


export default {
    title: 'Swsl/Ts-Remote',
    component: ToDoListView,
    argTypes: {
        list: []
    }
} as Meta;

const Template: Story = (args) => <ToDoListView {...args} /> ;
export const EmptyList = Template.bind({list: []});
