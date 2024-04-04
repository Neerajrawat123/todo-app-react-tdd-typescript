import { describe, expect, test } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should make Edit button visible when edit button inside list item is clicked', async () => {
    // Render the App component
    render(<App />);

    // Get the input field and Add button
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task by typing in the input and clicking the Add button
    await userEvent.type(input, 'task');
    await userEvent.click(addButton);

    // Wait for the task to be added
    // await waitFor(() => {
    // Find the added task in the list
    const listItem = screen.getByText('task');

    // Verify that the list item exists

    // Get the Edit button inside the list item
    const editTaskButton = within(listItem).getByRole('button', {
      name: 'edit',
    });

    // Click the Edit button if found
    // if (editTaskButton) {
    await userEvent.click(editTaskButton);

    // Assert that the "Edit" button in the main UI is visible
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Edit' })).toBeVisible();
    });
    // }
    // });
  });

  test('Edit the task when edit button inside list item is clicked', async () => {
    // Render the App component
    render(<App />);

    // Get the input field and Add button
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task by typing in the input and clicking the Add button
    await userEvent.type(input, 'task');
    await userEvent.click(addButton);

    // Wait for the task to be added
    const listItem = screen.getByText('task');

    const editTaskButton = within(listItem).getByRole('button', {
      name: 'edit',
    });

    await userEvent.click(editTaskButton);

    const editBtn = screen.getByRole('button', { name: 'Edit' });
    await userEvent.type(input, 'task-2');
    await userEvent.click(editBtn);

    await waitFor(() => {
      expect(screen.getByText('tasktask-2')).toBeInTheDocument();
    });
  });

  test('delete the task when delete button inside list item is clicked', async () => {
    render(<App />);

    // Get the input field and Add button
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task by typing in the input and clicking the Add button
    await userEvent.type(input, 'deleteTask');
    await userEvent.click(addButton);

    // Find the added task in the list using a custom text matcher function
    const listItem = screen.getByText((content) => {
      // Check if the element contains the text 'deleteTask'
      return content.includes('deleteTask');
    });

    // Get the Delete button inside the list item
    const deleteTaskButton = within(listItem).getByRole('button', {
      name: 'delete',
    });

    // Click the Delete button to delete the task
    await userEvent.click(deleteTaskButton);

    // Wait for the task to be removed from the document
    await waitFor(() => {
      // Use queryByText to check if the task is no longer in the document
      expect(screen.queryByText(/deleteTask/)).not.toBeInTheDocument();
    });
  });
});
