-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToWebtoon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWebtoon_AB_unique" ON "_TagToWebtoon"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWebtoon_B_index" ON "_TagToWebtoon"("B");

-- AddForeignKey
ALTER TABLE "_TagToWebtoon" ADD CONSTRAINT "_TagToWebtoon_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWebtoon" ADD CONSTRAINT "_TagToWebtoon_B_fkey" FOREIGN KEY ("B") REFERENCES "Webtoon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
