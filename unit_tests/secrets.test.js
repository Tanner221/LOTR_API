/***************************************
 * Unit tests for secret routes
 **************************************/

async function getInfo(url) {
  let res = await fetch(url);
  return res;
}

describe('The Secrets route', () => {
  it('shows that can get an individual object', async () => {
    const response = await getInfo('http://localhost:3000/secrets/6422590eb9dd44ef0d166682');
    expect(response.status).toBe(200);
  })

  it('gets all information from the characters', async () => {
    const response = await getInfo('http://localhost:3000/secrets/');
    expect(response.status).toBe(200);
  })

  it('returns an error when an invalid character id is passed', async () => {
    const response = await getInfo('http://localhost:3000/secrets/640a02d4e815ae1c8ada35b9')
    expect(response.status).toBeGreaterThanOrEqual(400);
  })

  it('validates information on POST', async () => {
    const body = {
      title: "Test",
      race: "Elf",
    }

    //POST to locations and throw error because of validation
    fetch('http://localhost:3000/secrets/', {
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

  it('validates information on PUT', async () => {
    const body = {
      title: "Test",
      race: "Orc"
    }

    //POST to locations and throw error because of validation
    fetch('http://localhost:3000/secrets/', {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        expect(response.status).toBeGreaterThanOrEqual(400);
      })
  })

  it('checks id before delete', async () => {
    fetch('http://localhost:3000/users/640a02d4e815ae1c8ada35b9',{
      method: "DELETE"
    })
    .then((response) => {
      expect(response.status).toBeGreaterThanOrEqual(500);
    })
  })

})