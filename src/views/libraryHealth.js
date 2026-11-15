export const avgHealth = tracks => {
  const checked = tracks.filter(t => t.health !== null && t.health !== undefined)
  return checked.length > 0 ? Math.round(checked.reduce((s, t) => s + t.health, 0) / checked.length) : null
}

export const albumsBelowFullHealth = library => library.flatMap(artist => {
  const albums = artist.albums.filter(album => {
    const health = avgHealth(album.tracks)
    return health !== null && health < 100
  })
  return albums.length ? [{ ...artist, albums }] : []
})
