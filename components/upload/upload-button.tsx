"use client";

import {
  UploadButton,
} from "@uploadthing/react";

import type {
  OurFileRouter,
} from "@/app/api/uploadthing/core";

type Props = {
  onUploaded: (
    data: {
      url: string;
      name: string;
    }
  ) => void;
};

export function ChallengeUploadButton({
  onUploaded,
}: Props) {

  return (
    <UploadButton<OurFileRouter, "challengeAttachment">

      endpoint="challengeAttachment"

      onClientUploadComplete={(
        res
      ) => {

        if (!res?.[0]) return;

        onUploaded({
          url:
            res[0].ufsUrl,

          name:
            res[0].name,
        });

      }}

      appearance={{
        button:
          "bg-emerald-500 text-black ut-ready:bg-emerald-500 ut-uploading:bg-zinc-700",
      }}

    />
  );
}