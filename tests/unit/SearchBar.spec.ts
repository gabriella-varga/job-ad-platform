import {mount, shallowMount, VueWrapper} from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';
import { getJobs } from "@/utils/storage";

jest.mock('@/utils/storage', () => ({
  getJobs: jest.fn()
}));

describe('SearchBar.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(SearchBar, {
      props: {
        searchQuery: '',
        selectedTags: [],
        salaryRange: { min: 0, max: 0 }
      }
    });
  });

  it('should render checkboxes based on tags from getJobs', async () => {
    (getJobs as jest.Mock).mockReturnValueOnce([
      { tags: ['Angular'] },
      { tags: ['NodeJS'] },
      { tags: ['MongoDB'] }
    ]);

    const wrapper = mount(SearchBar);
    await wrapper.vm.$nextTick();
    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    expect(checkboxes.length).toBe(3);

    const labels = wrapper.findAll('label');
    expect(labels[0].text()).toBe('Angular');
    expect(labels[1].text()).toBe('NodeJS');
    expect(labels[2].text()).toBe('MongoDB');
  });

  it('should emit search query on input change', async () => {
    const wrapper = mount(SearchBar);
    await wrapper.find('input.search-input').setValue('test query');

    expect(wrapper.emitted()['update:searchQuery']).toBeTruthy();
    expect(wrapper.emitted()['update:searchQuery'][0]).toEqual(['test query']);
  });

  it('should update local state when props change', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        searchQuery: 'initial query',
        selectedTags: ['JavaScript'],
        salaryRange: { min: 30000, max: 70000 }
      }
    });

    expect(wrapper.vm.localSearchQuery).toBe('initial query');
    expect(wrapper.vm.localSelectedTags).toEqual(['JavaScript']);
    expect(wrapper.vm.localSalaryMin).toBe(30000);
    expect(wrapper.vm.localSalaryMax).toBe(70000);

    await wrapper.setProps({
      searchQuery: 'updated query',
      selectedTags: ['React'],
      salaryRange: { min: 40000, max: 80000 }
    });

    expect(wrapper.vm.localSearchQuery).toBe('updated query');
    expect(wrapper.vm.localSelectedTags).toEqual(['React']);
    expect(wrapper.vm.localSalaryMin).toBe(40000);
    expect(wrapper.vm.localSalaryMax).toBe(80000);
  });
});
