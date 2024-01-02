import React, { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { currentTrackIdState } from '../atoms/songAtom'
import { useRecoilState, useRecoilValue } from 'recoil'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  const songApiUrl = `https://api.spotify.com/v1/tracks/${currentTrackId}`

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(songApiUrl, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        })

        const res = await trackInfo.json()
        setSongInfo(res)
      }
    }
    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  console.log(songInfo)
  return songInfo
}

export default useSongInfo
