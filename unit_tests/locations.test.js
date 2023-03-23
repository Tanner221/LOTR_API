/***************************************
 * Unit tests for locations routes
 **************************************/

async function getInfo(url){
  let res = await fetch(url);
  return res;
}

describe('The Locations route', () => {
  it('shows that can get an individual object', async () => {
    const response = await getInfo('http://localhost:3000/locations/640a02d4e815ae1c8ada35b9');
    expect(response.status).toBe(200);
  })

  it('gets all information from the locations', async () => {
    const response = await getInfo('http://localhost:3000/locations/');
    expect(response.status).toBe(200);
  })

  it('returns an error when an invalid location id is passed', async () => {
    const response = await getInfo('http://localhost:3000/locations/6408e72fa75956efd8b044ed')
    expect(response.status).toBeGreaterThanOrEqual(400);
  })

  it('validates information', async () => {
    const body =  {
      name: "Test Location",
      coordinates: "Somewhere over the rainbow",
      description: null,
    }

    //POST to locations and throw error because of validation
    fetch('http://localhost:3000/locations/',{
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      expect(response.status).toBeGreaterThanOrEqual(400);
    })
  })
})