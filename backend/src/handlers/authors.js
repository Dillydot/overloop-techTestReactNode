import Author from '../models/Author';

export default {
  // get a list of all authors
  list: async (req, res, next) => {
    try {
      const authors = await Author.findAll();
      return res.json(authors);
    } catch (err) {
      // pass the error to the error handling middleware
      next(err);
    }
  },
  // get a single author by ID
  get: async (req, res, next) => {
    try {
      const author = await Author.findByPk(req.params.authorId);

      if (!author) {
        // return a 404 if the author is not found
        return res.status(404).send('Author not found');
      }

      return res.json(author);
    } catch (err) {
      // pass the error to the error handling middleware
      next(err);
    }
  },
  // create a new author
  create: async (req, res, next) => {
    try {
      // check if first name is provided
      if (!req.body.firstName) {
        return res.status(400).send({
          message: 'First name is required',
        });
      }
      const author = await Author.create(req.body);
      // return the newly created author
      return res.json(author);
    } catch (err) {
      // pass the error to the error handling middleware
      next(err);
    }
  },
  // update an existing author
  update: async (req, res, next) => {
    try {
      // check if first name is provided
      if (!req.body.firstName) {
        return res.status(400).send({
          message: 'First name is required',
        });
      }
      // update the author with the given ID
      await Author.update(req.body, { where: { id: req.params.authorId } });
      // find the updated author
      const author = await Author.findByPk(req.params.authorId);
      // return the updated author
      return res.json(author);
    } catch (err) {
      // pass the error to the error handling middleware
      next(err);
    }
  },
};
