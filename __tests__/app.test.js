const app = require("../app");
const request = require("supertest");

describe("app", () => {
  describe("/graphql", () => {
    describe("/experiences", () => {
      test("POST: 200 - responds with JSON for all experiences", () => {
        const query = {
          query: "{experiences {title}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(Array.isArray(data.experiences)).toBe(true);
            expect(data.experiences.length).toBe(5);

          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query: "{experiences { experience_id,title,  body, username, created_at,location_lat,  location_long,likes }}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(data.experiences[0]).toEqual(
              expect.objectContaining({
                title: "experience 1",
                body: "body for experience 1",
                username: "user_a",
                created_at: "1584549747000",
                experience_id: "1",
                location_lat: "53.955609",
                location_long: "-1.078392",
                likes: 5,

              })
            );

          });
      });
    });
    describe("/comments", () => {
      test("POST: 200 - responds with JSON for all associated comments when passed an experience id", () => {
        const query = {
          query: "{comments(experience_id: 1) {body}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(Array.isArray(data.comments)).toBe(true);
            expect(data.comments.length).toBe(2);

          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query: "{comments(experience_id: 1) {  comment_id, created_at,  body,  likes,   username, experience_id}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(data.comments[0]).toEqual(
              expect.objectContaining({
                "body": "body for comment 1 for experience 1",
                "comment_id": "1",
                "created_at": "1586549847000",
                "experience_id": "1",
                "likes": 1,
                "username": "user_b"
              }, {
                "body": "body for comment 2 for experience 1",
                "comment_id": "2",
                "created_at": "1594549847000",
                "experience_id": "1",
                "likes": 5,
                "username": "user_c"

              })
            );

          });
      });
    });
    describe("/images", () => {
      test("POST: 200 - responds with JSON for all associated images when passed an experience id", () => {
        const query = {
          query: "{images(experience_id: 1) {image_desc}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(Array.isArray(data.images)).toBe(true);
            expect(data.images.length).toBe(1);

          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query: "{images(experience_id: 1) { image_id, experience_id, image_desc, image_URL,}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(data.images[0]).toEqual(
              expect.objectContaining({
                image_id: '1',
                experience_id: '1',
                image_desc: 'image 1 for experience 1',
                image_URL: ''
              })
            );
          });
      });
    });
    describe("/tags", () => {
      test("POST: 200 - responds with JSON for all associated tags when passed an experience id", () => {
        const query = {
          query: "{tagsForAnExperience(experience_id: 1) {tag_text}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(Array.isArray(data.tagsForAnExperience)).toBe(true);
            expect(data.tagsForAnExperience.length).toBe(1);

          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query: "{tagsForAnExperience(experience_id: 1) {  tag_id, tag_text, experience_id}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(data.tagsForAnExperience[0]).toEqual(
              expect.objectContaining({
                "experience_id": "1",
                "tag_id": "1",
                "tag_text": "tag_1"
              })
            );
          });
      });
    });
  })
});