import { render, screen } from '@testing-library/react';
import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";


configure({ adapter: new Adapter() });

describe("<Houses />", () => {
  let houses, store, state, getAllHousesSpy, componentDidMountSpy;

  const mockStore = configureStore([thunk]);
  beforeEach(() => {
    state = {
      houses: [],
      house: {},
    };
    store = mockStore(state);
    houses = mount(<HousesConnected store={store} />);
    // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
    expect(isReact.classComponent(Houses)).toBeTruthy();
  });

  it('Debería rederizar un "h1" con el texto "Game of Thrones"', () => {
    expect(houses.find("h1").at(0).text()).toEqual("Game of Thrones");
  });

  it('Debería renderizar en un tag "img" la imagen provista en la carpeta "img-cp2"', () => {
    // Tendrías que importar la img a tu archivo "Houses.jsx" y luego usarla como source de img.
    // Chequeá como lo hacemos en este mismo archivo en la línea 12 ;)
    expect(houses.find("img").at(0).prop("src")).toEqual(mainImage);
  });

  it('La imagen debería tener un atributo "alt" con el texto "main-img"', () => {
    expect(houses.find("img").at(0).prop("alt")).toEqual("main-img");
  });

  it('Debería rederizar un "h3" con el texto "Houses"', () => {
    expect(houses.find("h3").at(0).text()).toEqual("Houses");
  });

})