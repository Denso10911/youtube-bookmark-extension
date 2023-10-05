import React, { useEffect, useState } from "react"
import { getActiveTabURL } from "../../../utils/tabs"
import "./Popup.css"
import BookmarkItem from "./components/BookmarkItem/BookmarkItem"

const Popup = () => {
  const [bookmarkList, setBookmarkList] = useState([])
  const [isOnVideoPage, setIsOnVideoPage] = useState(false)

  const onIconClick = async (e, bookmarkTime, type) => {
    const activeTab = await getActiveTabURL()
    if (type === "DELETE") {
      setBookmarkList(prev => prev.filter(el => el.time !== bookmarkTime))
    }
    chrome.tabs.sendMessage(activeTab.id, {
      type,
      value: bookmarkTime,
    })
  }

  useEffect(() => {
    async function getBookmarksHistory() {
      const activeTab = await getActiveTabURL()
      const queryParameters = activeTab.url.split("?")[1]
      const urlParameters = new URLSearchParams(queryParameters)
      const currentVideo = urlParameters.get("v")

      const isWatchPage = activeTab.url.includes("youtube.com/watch")
      setIsOnVideoPage(isWatchPage)

      if (isWatchPage && currentVideo) {
        chrome.storage.sync.get([currentVideo], data => {
          const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : []
          setBookmarkList(currentVideoBookmarks)
        })
      } else {
        setBookmarkList([])
      }
    }
    getBookmarksHistory()
  }, [])

  if (!isOnVideoPage) {
    return (
      <div className="container">
        <div className="title">This is not a youtube video page.</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="title">Your bookmarks for this video</div>
      {!!bookmarkList.length ? (
        <ul className="list">
          {bookmarkList.map((bookmark, index) => (
            <BookmarkItem key={index} bookmark={bookmark} onIconClick={onIconClick} />
          ))}
        </ul>
      ) : (
        <div>You have no bookmarks for this video</div>
      )}
    </div>
  )
}

export default Popup
