-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "link" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."ProjectCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);
