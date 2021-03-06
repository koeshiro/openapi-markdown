const { expect } = require('chai');
const transformDefinitions = require('../../app/transformers/definitions');
const fixture = require('./definitionsFixture');

describe('Definitions', () => {
  const res1 = transformDefinitions(fixture.data1).split('\n');
  const res2 = transformDefinitions(fixture.data2).split('\n');
  const res3 = transformDefinitions(fixture.data3).split('\n');
  const res4 = transformDefinitions(fixture.data4).split('\n');
  // Slice off header
  const res11 = res1.slice(6);
  const res12 = res2.slice(6);
  const res13 = res3.slice(6);
  const res41 = res4.slice(-1);

  it('should create model header', () => {
    expect(fixture.definitionsHeader[0]).to.be.equal(res1[0]);
    expect(fixture.definitionsHeader[0]).to.be.equal(res2[0]);
    expect(fixture.definitionsHeader[0]).to.be.equal(res3[0]);
  });

  it('should create proper header', () => {
    expect(fixture.defHeader1).to.be.equal(res1[3]);
    expect(fixture.defHeader2).to.be.equal(res2[3]);
    expect(fixture.defHeader3).to.be.equal(res3[3]);
  });

  it('should create table headers', () => {
    expect(fixture.tableHeader[0]).to.be.equal(res1[5]);
    expect(fixture.tableHeader[1]).to.be.equal(res1[6]);
    expect(fixture.tableHeader[0]).to.be.equal(res2[5]);
    expect(fixture.tableHeader[1]).to.be.equal(res2[6]);
    expect(fixture.tableHeader[0]).to.be.equal(res3[7]);
    expect(fixture.tableHeader[1]).to.be.equal(res3[8]);
  });

  it('should also create description', () => {
    expect(fixture.data3.deviceid.description).to.be.equal(res3[5]);
  });

  it('should create a single description line', () => {
    expect(res41[0]).to.be.equal(fixture.result4[0]);
  });

  describe('Simple data', () => {
    it('should create simple valid table', () => {
      expect(res11[1]).to.be.equal(fixture.result1[0]);
      expect(res11[2]).to.be.equal(fixture.result1[1]);
    });
  });

  describe('Complex data', () => {
    it('should add reference to other definition', () => {
      expect(res12[1]).to.be.equal(fixture.result2[0]);
    });
    it('should add description', () => {
      expect(res12[2]).to.be.equal(fixture.result2[1]);
    });
    it('should render types as an array', () => {
      expect(res12[3]).to.be.equal(fixture.result2[2]);
    });
    it('should render array of references', () => {
      expect(res12[4]).to.be.equal(fixture.result2[3]);
    });
  });

  describe('Primitive data', () => {
    it('should create simple valid primitive table', () => {
      expect(res13[3]).to.be.equal(fixture.result3[0]);
    });
  });
});
