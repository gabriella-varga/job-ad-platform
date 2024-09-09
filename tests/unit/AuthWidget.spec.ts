import { shallowMount } from '@vue/test-utils';
import AuthWidget from '@/components/AuthWidget.vue';
import { useRouter, useRoute } from 'vue-router';
import { createStore } from 'vuex';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AuthWidget.vue', () => {
  let wrapper: any;
  let router: any;
  let store: any;

  beforeEach(() => {
    router = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(router);
    (useRoute as jest.Mock).mockReturnValue({
      path: '/login',
    });

    store = createStore({
      actions: {
        logIn: jest.fn(),
      },
    });

    wrapper = shallowMount(AuthWidget, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders login page title', () => {
    expect(wrapper.find('h2').text()).toBe('Login');
  });

  it('renders register page title', () => {
    (useRoute as jest.Mock).mockReturnValue({ path: '/register' });
    wrapper = shallowMount(AuthWidget);
    expect(wrapper.find('h2').text()).toBe('Register');
  });

  it('calls handleSubmit on form submit', async () => {
    const handleSubmitSpy = jest.spyOn(wrapper.vm, 'handleSubmit');
    await wrapper.find('form').trigger('submit.prevent');
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
