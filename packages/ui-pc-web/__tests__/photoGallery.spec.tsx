import { mount } from '@vue/test-utils'
import PhotoGallery from '../packages/components/PhotoGallery/src/PhotoGallery.vue'

test('if jest is normal.', async () => {
  expect('jest').toEqual('jest')
})

test('renders a todo', () => {
  const wrapper = mount(PhotoGallery)

  const paragraph = wrapper.find('.paragraph')

  expect(paragraph.text()).toEqual('Times clicked:')
})
