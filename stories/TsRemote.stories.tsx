import React from 'react';
import { Story, Meta } from '@storybook/react';
import ToDoListView  from "@swsl/ts-remote-mf/ToDoListView";
export default {
    title: 'Swsl/Ts-Remote',
} as Meta;
console.log("Module ",ToDoListView);
export const EmptyList: Story = () => <ToDoListView list={[]} />