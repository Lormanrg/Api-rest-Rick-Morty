-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "air_date" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "episodeNumber" INTEGER,
    "canceled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterParticipation" (
    "id" SERIAL NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "participationTime" TEXT NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CharacterParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterEpisodes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_species_status_type_key" ON "Character"("name", "species", "status", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_name_season_episodeNumber_key" ON "Episode"("name", "season", "episodeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterParticipation_episodeId_characterId_participationT_key" ON "CharacterParticipation"("episodeId", "characterId", "participationTime");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterEpisodes_AB_unique" ON "_CharacterEpisodes"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterEpisodes_B_index" ON "_CharacterEpisodes"("B");

-- AddForeignKey
ALTER TABLE "CharacterParticipation" ADD CONSTRAINT "CharacterParticipation_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterParticipation" ADD CONSTRAINT "CharacterParticipation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterEpisodes" ADD CONSTRAINT "_CharacterEpisodes_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterEpisodes" ADD CONSTRAINT "_CharacterEpisodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
