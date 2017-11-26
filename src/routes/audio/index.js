import express from 'express';
import upload from 'services/upload';
import { Audio } from 'models';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const file = await upload(req);
    const audio = await Audio.create(file);
    res.status(201).send(audio);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const audio = await Audio.findOne({ where : { id : req.params.id } });
    res.status(200).send(audio);
  } catch (e) {
    next(e);
  }
});

export default router;
