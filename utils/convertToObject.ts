// @ts-ignore
export function convertToSerializableObject(doc) {
  for (const key of Object.keys(doc)) {
    // @ts-ignore
    if (doc[key].toJSON && doc[key].toString) {
      // @ts-ignore
      doc[key] = doc[key].toString()
    }
  }

  return doc
}
