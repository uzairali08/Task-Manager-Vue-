// __tests__/MyComponent.spec.js
import { mount } from '@vue/test-utils';
// import MyComponent from '../MyComponent.vue';
import HeaderComp from '@/components/HeaderComp.vue'

describe('HeaderComp', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Add more test cases for different scenarios.
});