import { type DefaultResponse, createApiRouter } from '@/lib/api';
import { authenticated } from '@/lib/middlewares/authenticated';
import { prisma } from '@/lib/prisma';
import type { Collection } from '@prisma/client';
import { z } from 'zod';

const { router, handle } =
  createApiRouter<DefaultResponse<Partial<Collection>[] | Collection>>();

export const collectionBodySchema = z.object({
  name: z.string().min(1).max(255),
  document: z.record(z.any()).optional(),
});

router
  .use(authenticated)
  .get(async (req, res) => {
    if (!req.session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const collections = await prisma.collection.findMany({
      where: { userId: req.session.user.id },
      select: {
        id: true,
        name: true,
        public: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ data: collections });
  })
  .post(async (req, res) => {
    if (!req.session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const parsed = collectionBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(422).json({ error: parsed.error.errors });
    }

    const collection = await prisma.collection.create({
      data: {
        name: parsed.data.name,
        document: parsed.data.document,
        userId: req.session.user.id,
      },
    });

    res.json({ data: collection });
  });

export default handle();
