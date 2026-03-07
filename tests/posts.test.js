const request = require('supertest');
const app = require('../app');

// In-memory mock for the Post model
jest.mock('../models/Post', () => {
  const posts = [];

  class Post {
    constructor(data) {
      this._id = (posts.length + 1).toString();
      this.title = data.title;
      this.description = data.description;
      this.date = new Date();
    }

    async save() {
      posts.push(this);
      return this;
    }

    static async find() {
      return posts;
    }

    static async findById(id) {
      return posts.find((p) => p._id === id) || null;
    }

    static async deleteOne(query) {
      const index = posts.findIndex((p) => p._id === query._id);
      if (index !== -1) {
        posts.splice(index, 1);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    }

    static async updateOne(query, update) {
      const post = posts.find((p) => p._id === query._id);
      if (post && update.$set && update.$set.title) {
        post.title = update.$set.title;
        return { modifiedCount: 1 };
      }
      return { modifiedCount: 0 };
    }
  }

  return Post;
});

describe('/posts CRUD', () => {
  it('GET /posts should return empty array initially', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /posts should validate required fields', async () => {
    const res = await request(app).post('/posts').send({});
    expect(res.status).toBe(400);
  });

  it('should support full CRUD lifecycle on /posts', async () => {
    // Create
    const createRes = await request(app)
      .post('/posts')
      .send({ title: 'First', description: 'Desc' });
    expect(createRes.status).toBe(201);
    expect(createRes.body.title).toBe('First');
    const id = createRes.body._id;

    // Read all
    const listRes = await request(app).get('/posts');
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBe(1);

    // Read one
    const getRes = await request(app).get(`/posts/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body._id).toBe(id);

    // Update
    const patchRes = await request(app)
      .patch(`/posts/${id}`)
      .send({ title: 'Updated' });
    expect(patchRes.status).toBe(200);

    const getUpdatedRes = await request(app).get(`/posts/${id}`);
    expect(getUpdatedRes.body.title).toBe('Updated');

    // Delete
    const deleteRes = await request(app).delete(`/posts/${id}`);
    expect(deleteRes.status).toBe(200);

    const getAfterDeleteRes = await request(app).get(`/posts/${id}`);
    expect(getAfterDeleteRes.status).toBe(404);
  });
});

