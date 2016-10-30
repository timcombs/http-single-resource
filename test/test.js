const server = require('../lib/server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

// //unit tests on the dataStore
// describe('unit testing the dataStore module', () => {
//   it('finds a directory', (done) => {
//     chai.request(server);
//   });

//   it('finds a file', (done) => {
//     //expect

//   });

//   it('writes a file', (done) => {

//   });

//   it('overwrites a file', (done) => {

//   });

//   it('it deletes a file', (done) => {

//   });
// });

describe('E2E testing the server', () => {
  it('returns status code = 200 on successful requests', () => {
    chai.request(server)
    .get('/')
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((err) => {
      throw err;
    });
  });

  it('sends response to request for specific path', () => {
    chai.request(server)
      .get('/notes')
      .then((res) => {
        //is this correct? if so, why does getting the text back tell me the server found the correct path?
        expect(res.text).to.be.equal('test1.json\ntest2.json\n');
      })
      .catch((err) => {
        throw err;
      });
  });

  it('sends response to request for specific file', () => {
    chai.request(server)
    .get('/notes/test1.json')
    .then((res) => {
      expect(res.text).to.equal('{\n  "title": "test1.json",\n  "text": "To a person, everyone wishes they had never went to the party"\n}');
    })
    .catch((err) => {
      throw err;
    });
  });

  it('fails when navigating to an unknown path', () => {
    chai.request(server)
      .get('/nowhere/fast.json')
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal('that was not a valid path please check your map');
      })
      .catch((err) => {
        throw err;
      });
  });

  it('sends response to POST request for specific file', () => {
    chai.request(server)
      .post('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('sends response to PUT request for specific file', ()=> {
    chai.request(server)
      .put('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('sends response to DELETE request for specific file', () => {
    chai.request(server)
      .delete('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        throw err;
      });
  });


});