import React from "react"
import playIcon from "../../../../assets/img/play.png"
import deleteIcon from "../../../../assets/img/delete.png"

const BookmarkItem = ({ bookmark, onIconClick }) => {
  return (
    <li className="item">
      {bookmark.desc}
      <div className="icons">
        <img
          src={playIcon}
          alt="Play icon"
          className="icon"
          onClick={e => onIconClick(e, bookmark.time, "PLAY")}
        />
        <img
          src={deleteIcon}
          alt="Delete bookmark icon"
          className="icon"
          onClick={e => onIconClick(e, bookmark.time, "DELETE")}
        />
      </div>
    </li>
  )
}

export default BookmarkItem
