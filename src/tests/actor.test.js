const request = require("supertest");
const app = require("../app");
require("../models")

const URL_ACTOR = "/api/v1/actors";
let actorId;

const actor = {
    firstName: "Antonio",
    lastName: "Escalante",
    nationality: "Brazil",
    image: "https://www.lacuarta.com/resizer/f-s_ABJ1SwrnB83PmIneb-7nxL8=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/VDVFNQGOAJEXBOUWFPQCXCYKAY.jpg",
    birthday: "2010-08-02",
};

test("POST -> 'URL_ACTOR', should return status code 201 and res.body.firstName === actor.firstName", async () => {

    const res = await request(app)
        .post(URL_ACTOR)
        .send(actor);

    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test("Get -> 'URL_ACTOR', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_ACTOR);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_ACTOR/:id', should return status code 200 res.body.firstName === actor.firstName", async () => {
    const actor = {
        firstName: "Patricio",
        lastName: "Alvarado",
        nationality: "Peru",
        image: "https://yt3.ggpht.com/A_ZDh6-yvLulp3fFnyDOyW3uJrHin8Nu6LJ0bepy1mc_042BAj4Tog6N4ehxLlH96NSg5ujPiVX8xQ=s800-nd-v1",
        birthday: "2014-08-15",
    };

    const res = await request(app)
        .put(`${URL_ACTOR}/${actorId}`)
        .send(actor);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test("Delete -> 'URL_ACTOR/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);

    expect(res.status).toBe(204);
});
