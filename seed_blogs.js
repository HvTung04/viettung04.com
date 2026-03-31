const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blogs = [
    {
      id: "NC-8821-X",
      slug: "neural-convergence-distributed-architectures",
      category: "Intelligence",
      status: "PUBLISHED",
      views: 142800,
      createdAt: new Date("2023-10-24T12:00:00Z"),
      title: "Neural Convergence in Distributed Architectures"
    },
    {
      id: "NC-8822-Y",
      slug: "industrial-logic-framing-future-systems",
      category: "Engineering",
      status: "DRAFT",
      views: 0,
      createdAt: new Date(),
      title: "Industrial Logic: Framing the Future Systems"
    },
    {
      id: "NC-8823-A",
      slug: "tokenization-legacy-asset-classes",
      category: "Finance",
      status: "PUBLISHED",
      views: 22400,
      createdAt: new Date("2023-10-12T12:00:00Z"),
      title: "Tokenization of Legacy Asset Classes"
    },
    {
      id: "NC-8824-Q",
      slug: "synthetic-sentience-policy-precedent",
      category: "Ethics",
      status: "PUBLISHED",
      views: 89100,
      createdAt: new Date("2023-09-28T12:00:00Z"),
      title: "Synthetic Sentience: Policy and Precedent"
    }
  ];

  for (const b of blogs) {
    const existing = await prisma.blog.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      const createdBlog = await prisma.blog.create({
        data: {
          id: b.id,
          slug: b.slug,
          category: b.category,
          status: b.status,
          views: b.views,
          createdAt: b.createdAt
        }
      });
      await prisma.blogTranslation.create({
        data: {
          locale: "en",
          title: b.title,
          description: "Engineered post summary. " + b.title,
          blogId: createdBlog.id
        }
      });
      console.log(`Created ${b.title}`);
    } else {
      console.log(`Already exists ${b.title}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
