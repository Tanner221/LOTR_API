/***************************************
 * Unit tests for characters routes
 **************************************/

async function getInfo(url) {
  let res = await fetch(url);
  return res;
}

describe('The Characters route', () => {
  it('shows that can get an individual object', async () => {
    const response = await getInfo('http://localhost:3000/characters/6413273a0e95b169e94e96be');
    expect(response.status).toBe(200);
  })

  it('gets all information from the characters', async () => {
    const response = await getInfo('http://localhost:3000/characters/');
    expect(response.status).toBe(200);
  })

  it('returns an error when an invalid character id is passed', async () => {
    const response = await getInfo('http://localhost:3000/characters/640a02d4e815ae1c8ada35b9')
    expect(response.status).toBeGreaterThanOrEqual(400);
  })

  it('validates information on POST', async () => {
    const body = {
      name: "Gollum",
      description: "A former hobbit who becomes obsessed with the One Ring, Gollum plays a crucial role in Frodo's journey and serves as a tragic figure in the story.",
      history: "none",
      appearances: "Misty Mountains, Gladden Fields, Moria, Lothlórien, Amon Hen, Fangorn, the Dead Marshes, Minas Morgul, Cirith Ungol, Mount Doom",
      bodycount: "6",
      birth: "TA 2430",
      death: "TA 3019 (dies in the Cracks of Doom while fighting with Frodo over the One Ring)"
    }

    //POST to locations and throw error because of validation
    fetch('http://localhost:3000/characters/', {
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
      name: "Gollum",
      description: "A former hobbit who becomes obsessed with the One Ring, Gollum plays a crucial role in Frodo's journey and serves as a tragic figure in the story.",
      history: "none",
      appearances: "Misty Mountains, Gladden Fields, Moria, Lothlórien, Amon Hen, Fangorn, the Dead Marshes, Minas Morgul, Cirith Ungol, Mount Doom",
      bodycount: "6",
      birth: "TA 2430",
      death: "TA 3019 (dies in the Cracks of Doom while fighting with Frodo over the One Ring)"
    }

    //POST to locations and throw error because of validation
    fetch('http://localhost:3000/characters/', {
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
    fetch('http://localhost:3000/characters/640a02d4e815ae1c8ada35b9',{
      method: "DELETE"
    })
    .then((response) => {
      expect(response.status).toBeGreaterThanOrEqual(500);
    })
  })

})