"use client"

import React from "react"
import WalkingDog from "../fancy/WalkingDog"
import { useRouter } from "next/navigation"
import Button from "../buttons/Button"

type Props = {
  content?: string
}

export default function NoData({ content = "Not found 💸" }: Props) {
  const router = useRouter()

  return (
    <div className="center flex-col">
      <WalkingDog />
      <h5 className="font-bold text-2xl">{content}</h5>
      <Button className="mt-3" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  )
}
