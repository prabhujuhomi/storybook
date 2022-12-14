import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { RestaurantDetailPage } from './RestaurantDetailPage'

export default {
  title: 'Pages/RestaurantDetailPage',
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    deeplink: {
      path: '/restaurants/:id',
      route: '/restaurants/1',
    },
  },
} as ComponentMeta<typeof RestaurantDetailPage>

const Template: ComponentStory<typeof RestaurantDetailPage> = () => (
  <>
    <RestaurantDetailPage />
    <div id="modal" />
  </>
)

export const Success = Template.bind({})
Success.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/proto/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=169%3A510&scaling=scale-down-width&page-id=135%3A257&starting-point-node-id=135%3A258',
  },
}

export const WithModalOpen = Template.bind({})
WithModalOpen.parameters = {
  ...Success.parameters,
}
WithModalOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // find the "Cheeseburger" food item
  const item = await canvas.findByText(/Cheeseburger/i)
  // click on it and expect that the modal is present on screen
  await userEvent.click(item)
  await expect(canvas.getByTestId('modal')).toBeInTheDocument()
}
