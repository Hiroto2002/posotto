import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const post = async () => {
  const posts = [
    {
      content: 'sample1-user1',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxop0',
    },
    {
      content: 'sample2-user1',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxop0',
    },
    {
      content: 'sample1-user2',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq1',
    },
    {
      content: 'sample2-user2',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq1',
    },
    {
      content: 'sample1-user3',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq2',
    },
    {
      content: 'sample2-user3',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq2',
    },
  ];
  await prisma.post.createMany({
    data: posts.map((post) => post),
  });
};
