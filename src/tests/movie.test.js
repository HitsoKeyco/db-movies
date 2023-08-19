const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models")

const URL_MOVIE = "/api/v1/movies";
let movieId;

const movie = {
    name : "La mascara",
    image: "https://www.lacuarta.com/resizer/f-s_ABJ1SwrnB83PmIneb-7nxL8=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/VDVFNQGOAJEXBOUWFPQCXCYKAY.jpg",
    synopsis: "Una mascara que da poderes a su dueño",
    releaseYear: "2015-04-05"
    
};

test("POST -> 'URL_MOVIE', should return status code 201 and res.body.name === movie.name", async () => {

    const res = await request(app)
        .post(URL_MOVIE)
        .send(movie);

    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test("Get -> 'URL_MOVIE', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIE);
    
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_MOVIE/:id', should return status code 200 res.body.name === movies.name", async () => {

    const movieUpdate = {
        name: "El transbordador",
        image: "https://www.lacuarta.com/resizer/f-s_ABJ1SwrnB83PmIneb-7nxL8=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/VDVFNQGOAJEXBOUWFPQCXCYKAY.jpg",
        synopsis: "Una mascara que da poderes a su dueño",
        releaseYear: "2014-01-09"

    };

    const res = await request(app)
        .put(`${URL_MOVIE}/${movieId}`)
        .send(movieUpdate);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movieUpdate.name);
});

test("POST -> '/URL_MOVIE/:id/actors', shuld return status 200 and res.body.length === 1", async () => {

    const actor = {
        firstName: "Sergio",
        lastName: "Alvarado",
        nationality: "Colombia",
        image: "https://yt3.ggpht.com/A_ZDh6-yvLulp3fFnyDOyW3uJrHin8Nu6LJ0bepy1mc_042BAj4Tog6N4ehxLlH96NSg5ujPiVX8xQ=s800-nd-v1",
        birthday: "2014-08-15",
    };

    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/actors`)
        .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createActor.id)

    await createActor.destroy()
})

test("POST -> '/URL_MOVIE/:id/directors', shuld return status 200 and res.body.length === 1", async () => {

    const director = {
        firstName: "Cristhian",
        lastName: "Zurita",
        nationality: "Argentina",
        image: "https://yt3.ggpht.com/A_ZDh6-yvLulp3fFnyDOyW3uJrHin8Nu6LJ0bepy1mc_042BAj4Tog6N4ehxLlH96NSg5ujPiVX8xQ=s800-nd-v1",
        birthday: "2018-08-17",
    };

    const createDirector = await Director.create(director)

    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/directors`)
        .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createDirector.id)

    await createDirector.destroy()
})

test("POST -> '/URL_MOVIE/:id/genres', shuld return status 200 and res.body.length === 1", async () => {

    const genre = {
        name: "Comedy"
    };

    const createGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/genres`)
        .send([createGenre.id])

        
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createGenre.id)

    await createGenre.destroy()
})

test("Delete -> 'URL_MOVIE/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_MOVIE}/${movieId}`);

    expect(res.status).toBe(204);
});

