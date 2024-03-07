import { PrismaClient, User } from "@prisma/client"



const prisma = new PrismaClient()

export const user = async () => {
 
  const users:User[] = [
    {
      // user1
      birthday: new Date(),
      created_at: new Date(),
      id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq0',
      publicId: 'posotto_official',
      nickname: 'みゅーら',
      // アクセスするたびに画像が変わるURL
      img_url: 'https://picsum.photos/200/100',
      isPublic: true,
      link: 'https://www.google.com/',
      comment:"謎解きめっちゃ楽しかった！",
      deleted_at: null
    },
    {
      // user2
      birthday: new Date(),
      created_at: new Date(),
      id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq1',
      publicId: 'posotto_official_1',
      nickname: 'てらもん',
      // アクセスするたびに画像が変わるURL
      img_url: 'https://picsum.photos/200/200',
      isPublic: true,
      link: 'https://www.google.com/',
      comment:"え　4/2から授業だ...無理すぎる...",
      deleted_at: null
    },
    {
      // user3
      birthday: new Date(),
      created_at: new Date(),
      id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq2',
      publicId: 'posotto_official_2',
      nickname: 'わとくん',
      // アクセスするたびに画像が変わるURL
      img_url: 'https://picsum.photos/200/300',
      isPublic: true,
      link: 'https://www.google.com/',
      comment:"お疲れ様でした！",
      deleted_at: null
    },
    {
      // user4
      birthday: new Date(),
      created_at: new Date(),
      // id: 'user_2bnlcwboHNuvxzRIApEUaHO4X96',
      id: 'user_2bZsg5vIrB06IKeLE7eYyecxoq3',
      publicId: 'posotto_official_3',
      nickname: 'ちゃお',
      // アクセスするたびに画像が変わるURL
      img_url: 'https://picsum.photos/200/400',
      isPublic: true,
      link: 'https://www.google.com/',
      comment:"両かかと骨折しました...",
      deleted_at: null
    }

  ]
  await prisma.user.createMany({
    data: users.map((user) => user),
  })
}