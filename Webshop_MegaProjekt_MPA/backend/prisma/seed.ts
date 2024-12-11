import {faker} from "@faker-js/faker"
import { PrismaClient } from "@prisma/client";
import { create } from 'domain';
const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 100; i++) {
        await prisma.product.create({
          data: {
            name        : faker.commerce.productName(),
            imageUrl    : faker.image.urlPicsumPhotos(),
            material    : faker.commerce.productMaterial(),
            description : faker.commerce.productDescription(),
            price       : parseFloat(faker.commerce.price()),
          },
        });
      };
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    //process.exit(1)
  })