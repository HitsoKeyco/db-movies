const request = require("supertest");
const app = require("../app");
require("../models")

const URL_DIRECTOR = "/api/v1/directors";
let directorId;

const director = {
    firstName: "Klever",
    lastName: "Rodriguez",
    nationality: "Chileno",
    image: "https://www.lacuarta.com/resizer/f-s_ABJ1SwrnB83PmIneb-7nxL8=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/VDVFNQGOAJEXBOUWFPQCXCYKAY.jpg",
    birthday: "2015-05-22",
};

test("POST -> 'URL_DIRECTOR', should return status code 201 and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
        .post(URL_DIRECTOR)
        .send(director);

    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test("Get -> 'URL_DIRECTOR', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
    .get(URL_DIRECTOR);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_DIRECTOR/:id', should return status code 200 res.body.firstName === director.firstName", async () => {
    const director = {
        firstName: "Patricio",
        lastName: "Alvarado",
        nationality: "Peru",
        image: "https://yt3.ggpht.com/A_ZDh6-yvLulp3fFnyDOyW3uJrHin8Nu6LJ0bepy1mc_042BAj4Tog6N4ehxLlH96NSg5ujPiVX8xQ=s800-nd-v1",
        birthday: "2014-08-15",
    };

    const res = await request(app)
        .put(`${URL_DIRECTOR}/${directorId}`)
        .send(director);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test("Delete -> 'URL_DIRECTOR/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_DIRECTOR}/${directorId}`);

    expect(res.status).toBe(204);
});
