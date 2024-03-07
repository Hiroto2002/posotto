import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const post = async () => {
  const posts = [
    {
      content: '謎解きめっちゃ楽しかった！',
      created_at: new Date(),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq0',
    },
    {
      content: 'え　4/2から授業だ...無理すぎる...',
      created_at: new Date().setHours(new Date().getHours() - 5),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq1',
    },
    {
      content: 'お疲れ様でした！',
      created_at: new Date().setHours(new Date().getHours() - 10),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq2',
    },
    {
      content: '両かかと骨折しました...',
      created_at: new Date().setHours(new Date().getHours() - 15),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq3',
    },
    {
      content: 'おやすみ',
      created_at: new Date().setHours(new Date().getHours() - 20),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq0',
    },
    {
      content: 'あああああああああ！',
      created_at: new Date().setHours(new Date().getHours() - 23),
      user_id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq1',
    },
  ];
  await prisma.post.createMany({
    data: posts.map((post) => ({
      ...post,
      created_at: new Date(post.created_at),
    })),
  });
};
