import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

type SanityImageWithRef =
  | string
  | {
      asset?: {
        _ref?: string
      }
    }

export function getSanityImageDimensions(source: SanityImageWithRef | undefined | null) {
  const ref =
    typeof source === "string"
      ? source
      : source?.asset?._ref

  if (!ref) {
    return null
  }

  const match = ref.match(/-(\d+)x(\d+)-/)

  if (!match) {
    return null
  }

  const width = Number(match[1])
  const height = Number(match[2])

  if (!width || !height) {
    return null
  }

  return {
    width,
    height,
    aspectRatio: width / height,
    isPortrait: height > width,
  }
}
