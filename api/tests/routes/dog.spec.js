/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight: "1-15",
  height: "11-15",
  life_span:"1-15",
  image: "",
  temperament: ["Extrovertido", "Stubborn", "Gay", "Docile", "Sensitive"],
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: false })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });

  it('GET responds with a status 200 if it finds a dog', function() {
    return agent 
      .get('/dogs?name=Pug') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  });
});
