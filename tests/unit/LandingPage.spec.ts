import { mount } from '@vue/test-utils';
import { getJobs } from '@/utils/storage';
import { RouterLinkStub } from '@vue/test-utils';
import LandingPage from "@/views/LandingPage.vue";

jest.mock('@/utils/storage', () => ({
  getJobs: jest.fn(),
}));

jest.mock('vuex', () => ({
  useStore: jest.fn(() => ({
    getters: {
      isLoggedIn: false,
    },
  })),
}));

describe('LandingPage.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    (getJobs as jest.Mock).mockReturnValue([]);
    wrapper = mount(LandingPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  it('renders hero section when not logged in', () => {
    expect(wrapper.find('.hero').exists()).toBe(true);
    expect(wrapper.text()).toContain('Welcome to JobBoard!');
    expect(wrapper.text()).toContain('Your gateway to finding your dream job or posting job offers with ease.');
  });

  it('shows "No job available currently" when there are no jobs', () => {
    expect(wrapper.text()).toContain('No job available currently :(');
  });
});
