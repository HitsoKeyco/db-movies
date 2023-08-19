const request = require("supertest");
const app = require("../app");
require("../models")

const URL_GENRES = '/api/v1/genres'
let genreId;

const genre = {
    name: "action"
}


test("POST -> '/api/v1/genres', should return status code 201 and res.body.name === genre.name", async () => {
    const res = await request(app)
        .post(URL_GENRES)
        .send(genre)

    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("Get -> '/api/v1/genre', should return status code 200 and res.body.toHab¿veLength === 1", async () => {
    const res = await request(app)
        .get(URL_GENRES)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test("PUT -> 'URL_GENRES/:id', should return status code 200 res.body.name === genreUpdate.name", async () => {

    const genreUpdate = {
        name: "Suspense"
    }
    

    const res = await request(app)
        .put(`${URL_GENRES}/${genreId}`)
        .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
})

test("Delete -> 'URL_GENRES/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_GENRES}/${genreId}`)

    expect(res.status).toBe(204)

});

