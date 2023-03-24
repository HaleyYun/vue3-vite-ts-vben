import { mount } from '@vue/test-utils'
// import { Button } from '/@/components/Button';
import Counter from '/@/Counter.vue'

test('if jest is normal.', async () => {
  expect('jest').toEqual('jest')
})

// TODO Vue component testing is not supported temporarily
// test('is a Vue instance.', async () => {
//   const wrapper = mount(Button, {
//     slots: {
//       default: 'Button text',
//     },
//   });
//   console.log(wrapper.html())
//   expect(wrapper.html()).toContain('Button text');
// });

test('counter text updates', async () => {
  const wrapper = mount(Counter)
  const paragraph = wrapper.find('.paragraph')

  expect(paragraph.text()).toBe('Times clicked: 0')

  // await wrapper.setData({ count: 2 })

  // expect(paragraph.text()).toBe('Times clicked: 2')
})
