import {SearchByObjKeysPipe} from './search-by-obj-keys.pipe';

describe('SearchByObjKeysPipe', () => {

  const pipe = new SearchByObjKeysPipe();
  const arr: Array<any> = [
    {email: 'alfa@epam.com', name: 'Metallica', desc: 'Now I lay me down to sleep'},
    {email: 'bravo@epam.com', name: 'Metalhead', desc: 'Pray the Lord my soul to keep'},
    {email: 'charlie@epam.com', name: 'Pain of Salvation', desc: 'If I die before I wake'},
    {email: 'delta@epam.com', name: 'Echoes', desc: 'Pray the Lord my soul to take'},
    {email: 'echo@epam.com', name: 'Bravo Pain', desc: ''}
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('case independent search should work', () => {
    expect(pipe.transform(arr, 'METAL', ['name']).length).toEqual(2);
  });

  it('multikey search should work', () => {
    expect(pipe.transform(arr, 'bravo', ['email', 'name', 'desc']).length).toEqual(2);
  });

  it('negative result search should work', () => {
    expect(pipe.transform(arr, '@epam.com', ['name', 'desc']).length).toEqual(0);
  });

});
