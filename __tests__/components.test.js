import { Header } from '../src/components/Header/index';
import { CompaniesContextProvider } from '../src/contexts/CompaniesContext';
import { CompaniesTable } from '../src/components/CompaniesTable/index';
import Home from '../src/pages/index';
import React from 'react';
import "../setup-tests"
import { mount } from 'enzyme';

it('>>>>should render the text inside it', () => {
  const wrapper = mount(
    <Header />
  );
  const h2 = wrapper.find('h2');
  expect(h2.text()).toBe('Stock Exchange Challenge');
});

it(">>>> should show spinner on loading = true", () => {
  const wrapper = mount(<Home />);
  expect(wrapper.find("ForwardRef(CircularProgress)")
    .exists()).toEqual(true);
});

it(">>>> should show component CompaniesTable on loading = false", () => {
  const wrapper = mount(
    <CompaniesContextProvider>
      <CompaniesTable />
    </CompaniesContextProvider>
  );

  const promise = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        resolve(wrapper);
      }, 3000);
    });
  };

  return promise().then((res) => {
    expect(res.find("div")).toHaveLength(3);
    expect(res.find("span")).toHaveLength(5);
  });
});
