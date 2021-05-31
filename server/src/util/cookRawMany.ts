export default function cookRawMany(rawMany: any[]) {
  return rawMany.map((rawRow: any) => {
      
    const row = {}

    for (const rawKey in rawRow) {
      row[rawKey.split("_")[1]] = rawRow[rawKey]
    }

    return row
  })
}