-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userCreatedId_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "userCreatedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userCreatedId_fkey" FOREIGN KEY ("userCreatedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
